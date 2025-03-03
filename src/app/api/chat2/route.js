import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"; 
import { auth } from "@/auth";
import { getContext } from "@/lib/context";    

import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { RunnableSequence } from "@langchain/core/runnables";


export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    const { text1, file1,file_id } = await req.json();
    if (!text1 || !file1 || !file_id) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }
    
    const model = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    });


    const context = await getContext(text1,file1)
    console.log(file1)
    console.log("/////////////////////////////////")
    console.log("the context:",context)


      // const prompt1 = ChatPromptTemplate.fromTemplate(`
      // AI assistant is a brand new, powerful, human-like artificial intelligence.
      // The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      // AI is a well-behaved and well-mannered individual.
      // AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      // AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      // AI assistant is a big fan of Pinecone and Vercel.
      // START CONTEXT BLOCK
      // ${context}
      // END OF CONTEXT BLOCK
      // AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
      // If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      // AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
      // AI assistant will not invent anything that is not drawn directly from the context.
      // Chat History: {history}
      // {input}`);

const prompt = ChatPromptTemplate.fromTemplate(`
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


  // Using LCEL
// const chain = prompt.pipe(model);
const chain = RunnableSequence.from([
  {
    input: (initialInput) => initialInput.input,
    memory: () => memory.loadMemoryVariables({}),
  },
  {
    input: (previousOutput) => previousOutput.input,
    history: (previousOutput) => previousOutput.memory.history,
  },
  prompt,
  model,
  
]);



console.log("Updated Chat Memory", await memory.loadMemoryVariables());

let inputs2 = {
  input: text1,
};

const resp2 = await chain.invoke(inputs2);
console.log(resp2);
await memory.saveContext(inputs2, {
  output: resp2.content,
});
 
return NextResponse.json({ answer: resp2.content });
 
  } catch (error) {
    console.error("Error handling chat request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
