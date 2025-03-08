import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
// import { CohereEmbeddings } from "@langchain/cohere";
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
    You are an advanced AI assistant with access to a specific document uploaded by the user. Your task is to answer questions **strictly based on the provided document** and nothing else.
  
    **Guidelines:**
    - **Only use information from the document.** If the answer is not found, respond: "I couldn't find relevant information."  
    - **Do not generate or assume details outside the document's context.**  
    - **Provide citations (sections, page numbers) when applicable.**  
    - **Ensure answers are concise, yet complete and clear.**  
    - **Preserve the document’s original meaning without adding assumptions.**  
    - **Summarize or translate content when explicitly requested by the user.**  
    - **If listing multiple points, format them as separate numbered items.**  
  
    **Context Block:**  
    START CONTEXT BLOCK  
    Context: {context}  
    END OF CONTEXT BLOCK  
  
    Now, based on the provided context, answer the user’s question in the same language as the input.  
    chatHistory: {history}  
    {input}
  `);

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
