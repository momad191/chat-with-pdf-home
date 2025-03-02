import { NextResponse } from "next/server";
import { File } from "@/model/file-model";
import { dbConnect } from "@/lib/mongo";
import { auth } from "@/auth";  
 
export async function GET(request) {
  try {
    // Connect to MongoDB
    await dbConnect();
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const useremail = session?.user?.email;

    // Get query parameters for pagination (page and limit)
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1; // default to page 1
    const limit = parseInt(searchParams.get("limit")) || 10; // default to 10 files per page
    const skip = (page - 1) * limit;

    // Fetch files with pagination from the database
    const files = await File.find({user_email:useremail}).sort({ _id: -1})
      .skip(skip)
      .limit(limit);
 
    // Get the total count of files
    const totalFiles = await File.countDocuments({});

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalFiles / limit);

    // Return the files and pagination info as JSON
    return new NextResponse(JSON.stringify({
      status: "success",
      message: "files retrieved successfully",
      page,
      totalPages,
      totalFiles,
      files,
    }));
  } catch (error) {
    return new NextResponse("Error in fetching: " + error.message, {
      status: 500,
    });
  }
}


 
