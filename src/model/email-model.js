import mongoose, { Schema } from "mongoose";

const EmailSchema = new Schema({
  subject: String,
  greeting: String,
  message_body:String,
  signature: String,
  date: {
    type: Date,
    default: Date.now,
  },
  user_email: {
    required: true,
    type: String,
  },
});
export const Email =
  mongoose.models.Email ?? mongoose.model("Email", EmailSchema);  
