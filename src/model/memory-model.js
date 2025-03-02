import mongoose, { Schema } from "mongoose";

const memorySchema = new Schema({
  messages: {
    type: String,
  },

 
});

export const Memory = mongoose.models.Memory ?? mongoose.model("Memory", memorySchema);