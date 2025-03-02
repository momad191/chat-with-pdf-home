import OpenAI from "openai";
// import { OpenAIEmbeddings } from "@langchain/openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.embeddings.create({
      
      // model: "text-embedding-3-large",
      model: "text-embedding-ada-002",
      // model:"text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    });

    return response.data[0].embedding as number[];
  } catch (error) {
    console.log("Error calling OpenAI embeddings API:", error);
    throw error;
  }
}
