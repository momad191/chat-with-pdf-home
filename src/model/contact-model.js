import mongoose, { Schema } from "mongoose";
 
const ContactSchema = new Schema({
    name: String,
    email: String,
    message: String,
})
export const Contact = mongoose.models.Contact ?? mongoose.model("Contact", ContactSchema);