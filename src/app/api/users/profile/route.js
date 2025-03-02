import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongo";
import { User } from "@/model/user-model";
import { auth } from "@/auth";
 
export async function GET() {
  try {
    await dbConnect();
    
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
 
    const email = session?.user?.email;
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email }).select("-password"); // Exclude password for security
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
