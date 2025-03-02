import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { CohereEmbeddings } from "@langchain/cohere";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

import { auth } from "@/auth";

import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { RunnableSequence } from "@langchain/core/runnables";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text1, file1, file_id } = await req.json();
    if (!text1 || !file1 || !file_id) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const filePath = `\public/uploads/${session.user.email}/${file1}`;
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    const llm = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    });

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 100,
    });

    const splits = await textSplitter.splitDocuments(docs);
    const vectorstore = await MemoryVectorStore.fromDocuments(
      splits,
      // new CohereEmbeddings({
      //   model: "embed-english-v3.0"
      // })
      new OpenAIEmbeddings({
        model: "text-embedding-3-large",
        // model: "text-embedding-ada-002"
      })
    );

    const retriever = vectorstore.asRetriever();

    const qaPrompt = ChatPromptTemplate.fromTemplate(`
      You are an advanced AI assistant with access to a specific document uploaded by the user. Your task is to answer questions based only on the provided document.  
      AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI using the same Language of the {input} and the {context} to answer the questions
      START CONTEXT BLOCK
      Context: {context} 
      END OF CONTEXT BLOCK
      - ** Strictly base your response on the document's content.** If the answer is not found, say in input language, "I couldn't find relevant information in the provided document."  
      - **Do not generate information outside of the document's context.**  
      - **Cite relevant sections or page numbers when possible.**  
      - **Be concise, but ensure clarity and completeness.**  
      - **Maintain the document's original meaning without adding assumptions.**  
      Now, based on the provided context, answer the user’s questions accurately using the same language in the input and context.
      chatHistory: {history}
      {input}`);

    ///////////////////////////////////////////DadaBase ridis for saving chats ///////////////////////////////////////
    const upstashMessageHistory = new UpstashRedisChatMessageHistory({
      sessionId: file_id,
      // sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
      config: {
        url: "https://suited-finch-58820.upstash.io", // Override with your own instance's URL
        token: "AeXEAAIjcDE5OGI2MDc1YTljMDg0MDFkYTZiMTk2MjkyYmRmNzBmM3AxMA", // Override with your own instance's token
      },
    });
    const memory = new BufferMemory({
      memoryKey: "history",
      chatHistory: upstashMessageHistory,
    });

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm,
      retriever,
      rephrasePrompt: qaPrompt,
    });

    const questionAnswerChain2 = await createStuffDocumentsChain({
      llm,
      prompt: qaPrompt,
    });

    const ragChain2 = await createRetrievalChain({
      retriever: historyAwareRetriever,
      combineDocsChain: questionAnswerChain2,
    });

    const chain = RunnableSequence.from([
      {
        input: (initialInput) => initialInput.input,
        memory: () => memory.loadMemoryVariables({}),
      },
      {
        input: (previousOutput) => previousOutput.input,
        history: (previousOutput) => previousOutput.memory.history,
      },
      ragChain2,
    ]);

    let inputs2 = {
      input: text1,
    };

    const response = await chain.invoke(inputs2);

    await memory.saveContext(inputs2, {
      output: response.answer,
    });

    return NextResponse.json({ answer: response.answer });
  } catch (error) {
    console.error("Error handling chat request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
