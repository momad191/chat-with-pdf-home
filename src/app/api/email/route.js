import { NextResponse } from "next/server";
import { Email } from "@/model/email-model";
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

    // Fetch the Email by ID from the database
    const email = await Email.findById(id);
  
    if (!email) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "email not found",
        }),
        { status: 404 }
      );
    }

    // Return the single file as JSON
    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "email retrieved successfully",
        email,
      })
    );
  } catch (error) {
    return new NextResponse("Error in fetching: " + error.message, {
      status: 500,
    });
  }
}
