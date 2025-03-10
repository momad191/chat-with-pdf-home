import { NextResponse } from "next/server";
import { ChatOpenAI } from "@langchain/openai";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ToolNode } from "@langchain/langgraph/prebuilt"
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

  
 import { auth } from "@/auth";
 
  
 export async function POST(req:any) {
   try {
     const session = await auth();
     if (!session) {
       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
     }
 
     const { text1 } = await req.json();

     if (!text1) {
       return NextResponse.json(
         { error: "Missing parameters" },
         { status: 400 }
       );
     }
 
  

// Define the tools for the agent to use
const tools = [new TavilySearchResults({ maxResults: 3 })];
const toolNode = new ToolNode(tools);

// Create a model and give it access to the tools
const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0,
  }).bindTools(tools);

 
 

  // Define the function that determines whether to continue or not
function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
    const lastMessage = messages[messages.length - 1] as AIMessage;
  
    // If the LLM makes a tool call, then we route to the "tools" node
    if (lastMessage.tool_calls?.length) {
      return "tools";
    }
    // Otherwise, we stop (reply to the user) using the special "__end__" node
    return "__end__";
  }

 
  

// Define the function that calls the model
async function callModel(state: typeof MessagesAnnotation.State) {
    const response = await model.invoke(state.messages);
  
    // We return a list, because this will get added to the existing list
    return { messages: [response] };
  }

 

  // Define a new graph
const workflow = new StateGraph(MessagesAnnotation)
.addNode("agent", callModel)
.addEdge("__start__", "agent") // __start__ is a special name for the entrypoint
.addNode("tools", toolNode)
.addEdge("tools", "agent")
.addConditionalEdges("agent", shouldContinue);

// Finally, we compile it into a LangChain Runnable.
const app = workflow.compile();


// Use the agent
const finalState = await app.invoke({
    messages: [new HumanMessage(text1)],
  });
  console.log(finalState.messages[finalState.messages.length - 1].content);
  
  const response = finalState.messages[finalState.messages.length - 1].content
 
 
 
     return NextResponse.json({ answer: response });
   } catch (error) {
     console.error("Error handling chat request:", error);
     return NextResponse.json(
       { error: "Internal Server Error" },
       { status: 500 }
     );
   }
 }
 