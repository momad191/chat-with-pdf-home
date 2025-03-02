 import { NextResponse } from "next/server";
 import { dbConnect } from "@/lib/mongo"; // Ensure you have a DB connection file
 import { User } from "@/model/user-model"; // Ensure you have a User Mongoose model
 import { auth } from "@/auth";
  
 export async function POST(req) {
   try {
       
     await dbConnect(); // Ensure database connection
     const session = await auth();
     if (!session) {
         return NextResponse.json({ error: "unauthorized" }, { status: 401 });
       }
 
       const email = session?.user?.email;
       if (!email) {
         return NextResponse.json({ error: "Email is required" }, { status: 400 });
       }
 
     const body = await req.json();
     const {...updatedData } = body; // Extract email to find user
 
    
 
     const user = await User.findOneAndUpdate({ email }, updatedData, {
       new: true, // Return updated document
       runValidators: true, // Ensure validation
     });
 
     if (!user) {
       return NextResponse.json({ error: "User not found" }, { status: 404 });
     }
 
     return NextResponse.json({ message: "upgared successfully", user });
   } catch (error) {
     console.error("Update Error:", error);
     return NextResponse.json({ error: "Server error" }, { status: 500 });
   }
 }
 