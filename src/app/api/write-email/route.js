import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { createEmail } from "@/queries/email";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { text1, language, text_type, text_length, tone, use_emoji } = body;

    // Create a DB Conenction
    await dbConnect();

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    if (
      !text1 ||
      !language ||
      !text_type ||
      !text_length ||
      !tone ||
      !use_emoji
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const model = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.5,
    });

    const upstashMessageHistory = new UpstashRedisChatMessageHistory({
      sessionId: "Translat-1",
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

    const inputs = {
      input: text1,
      language,
      text_type,
      text_length,
      tone,
      use_emoji,
    };
    const response = await chain.invoke(inputs);

    await memory.saveContext({ text1 }, { output: response });

    const newEmail = {
      subject: response.subject,
      greeting: response.greeting,
      signature: response.signature,
      user_email: session?.user?.email,
    };

    await createEmail(newEmail);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error generating email:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
