import { NextResponse } from "next/server";
import { createUser } from "@/queries/users";
import { dbConnect } from "@/lib/mongo";
import axios from "axios";
import bcrypt from "bcryptjs";
import { User } from "@/model/user-model";
export const POST = async (request) => {
  const { name, email, image, password, captcha } = await request.json();

  console.log(name, email, image, password);
  //see if user exists
  let user = await User.findOne({ email });

  if (user) {
    return new NextResponse(
      "The email you chose already exists...try another",
      {
        status: 401,
      }
    );
  }

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

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);
  // Form a DB payload
  const newUser = {
    name,
    password: hashedPassword,
    email,
    image,
  };
  // Update the DB
  try {
    await createUser(newUser);
  } catch (err) {
    return new NextResponse(error.mesage, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
