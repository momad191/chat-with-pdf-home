import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join ,extname } from 'path';
import { createFile } from "@/queries/files";
import { dbConnect } from "@/lib/mongo";
// import { loadS3IntoPineconePDF } from "@/lib/pineconePDF";   
import { auth } from "@/auth";

const server_url = process.env.NEXT_BASE_URL ;

export async function POST(request: NextRequest) { 
  await dbConnect() 
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const foldername = session?.user?.email;
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;
  if (!file) {
    return NextResponse.json({ success: false, message: 'No file uploaded' });
  }
  const fileExtension = extname(file.name);
  console.log("File Extension:", fileExtension); // Logs the extracted extension
  if(fileExtension !== ".pdf" ){
    return NextResponse.json({ error: 'please uplad only pdf files' });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  // Define the folder and file paths
  const folderPath = join(process.cwd(), 'public', `uploads/${foldername}`);
  const filePath = join(folderPath, file.name);
  const fileUrl = `${server_url}/uploads/${foldername}/${file.name}`; // Relative URL to access the file
  try {
    const newFile = {
      file_name:file.name,
      file_url:fileUrl,
      user_name:session?.user?.name,
      user_email:session?.user?.email
    }
    // Create the folder if it doesn't exist
    await mkdir(folderPath, { recursive: true });
    // Write the file to the folder
    await writeFile(filePath, buffer);
    // load the file into Pinecone
    // await loadS3IntoPineconePDF(file.name);
    await createFile(newFile);
    console.log(`File uploaded successfully. Path: ${filePath}`);
    return NextResponse.json({ success: true, url: `${fileUrl}`});
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ success: false });
  }
} 