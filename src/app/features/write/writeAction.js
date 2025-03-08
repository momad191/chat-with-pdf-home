"use server";
require("dotenv").config();
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { auth } from "@/auth";
import { JsonOutputParser } from "@langchain/core/output_parsers";

export async function WriteEmail(
  text1,
  language,
  text_type,
  text_length,
  tone,
  use_emoji
) {
  const session = await auth();

  const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5,
  });

  /////////////////////////////////////////// Database Redis for saving chats ///////////////////////////////////////
  const upstashMessageHistory = new UpstashRedisChatMessageHistory({
    sessionId: "Translat-1",
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

  const systemTemplate = `Write an email in {language} based on the following content: {input}. 
  Ensure the email is appropriate for {text_type} and matches the desired {tone}.
  Keep the length {text_length} and, if applicable, incorporate emojis based on the {use_emoji} preference.
  
  Return a JSON object with keys: "subject", "greeting", "message_body", "signature".`;

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", "{input}"],
  ]);

  const parser = new JsonOutputParser();

  const chain = promptTemplate.pipe(model).pipe(parser);

  let inputs = {
    input: text1,
    language,
    text_type,
    text_length,
    tone,
    use_emoji,
  };

  console.log(inputs);
  console.log("-------------------------");

  const response = await chain.invoke(inputs);
  console.log(response);

  await memory.saveContext(
    { text1 },
    {
      output: response,
    }
  );

  return response;
}
