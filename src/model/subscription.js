import mongoose, { Schema } from "mongoose";
 
const subscriptionSchema = new Schema({
 
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  stripeCustomerId: {
    type: String,
    required: true,
    unique: true,
  }, 
  stripeSubscriptionId: {
    type: String,
    unique: true,
    default: null, // Optional field
  },
  stripePriceId: {
    type: String,
    default: null, // Optional field
  },
  stripeCurrentPeriodEnd: {
    type: Date, // Equivalent to timestamp
    default: null, // Optional field
  },

  name: {
    type: String,
    default: null, // Optional field
  },
  email: {
    type: String,
    default: null, // Optional field
  },

}, { timestamps: true }); // Adds createdAt & updatedAt fields

export const Subscription  = mongoose.models.Subscription ?? mongoose.model("Subscription", subscriptionSchema);