import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { loadS3IntoPineconeURL } from "@/lib/pineconeURL"; 
import { auth } from "@/auth";
import { createFile } from "@/queries/files";
  
 
export async function POST(request: NextRequest) {
  await dbConnect();
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    // Parse JSON body instead of formData
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ success: false, message: "No URL provided" });
    }
 
    const newFile = {
      file_name: url,
      file_url: url,
      user_name: session?.user?.name,
      user_email: session?.user?.email,
    };

    // Load the file into Pinecone
    // await loadS3IntoPineconeURL(url);
    await createFile(newFile);

    console.log(`File uploaded successfully. Path: ${url}`);

    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
