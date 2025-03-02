import { NextResponse } from "next/server";
import { File } from "@/model/file-model";
import { dbConnect } from "@/lib/mongo";

export async function GET(request) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); // Retrieve the 'id' parameter

    if (!id) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Missing 'id' parameter",
        }),
        { status: 400 }
      );
    }

    // Fetch the file by ID from the database
    const file = await File.findById(id);
  
    if (!file) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "File not found",
        }),
        { status: 404 }
      );
    }

    // Return the single file as JSON
    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "File retrieved successfully",
        file,
      })
    );
  } catch (error) {
    return new NextResponse("Error in fetching: " + error.message, {
      status: 500,
    });
  }
}
