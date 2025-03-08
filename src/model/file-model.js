import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
  file_name: {
    required: true,
    type: String,
  },
  file_url: {
    required: true,
    type: String,
  },
  user_name: {
    required: true,
    type: String,
  },
  user_email: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const File = mongoose.models.File ?? mongoose.model("File", fileSchema);
