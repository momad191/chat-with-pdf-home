import axios from "axios";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { dbConnect } from "@/lib/mongo";
import { createContact } from "@/queries/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  // <-- FIXED: Use POST instead of handler(req, res)
  try {
    const body = await req.json(); // <-- FIXED: Parse request body correctly
    const { name, email, message, captcha } = body;

    // Create a DB Conenction
    await dbConnect();

    if (!captcha) {
      return NextResponse.json(
        { message: "Captcha verification failed" },
        { status: 400 }
      );
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
    const { data } = await axios.post(verifyUrl);

    if (!data.success) {
      return NextResponse.json(
        { message: "Captcha verification failed" },
        { status: 400 }
      );
    }

    const newContact = {
      name,
      message,
      email,
    };

    await createContact(newContact);

    const message11 = `<h1> Dear ${newContact.name}, <h1> <p> Thank you for contact and sen the message to llm chat files. we will  replay soon. thank you.</p>`;

    const sentInfo = await resend.emails.send({
      from: "llm-chat with files <update@chatpdf.faizads.com>",
      to: [email, "emad.ruknan@gmail.com"],
      subject: "message from llm-chat with files",
      html: message11,
    });

    console.log(sentInfo.data);
    return NextResponse.json(
      { message: "Form submitted successfully", data: sentInfo.data },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
