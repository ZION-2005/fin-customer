import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  memberNumber: {
    type: Number,
    required: true,
  },
  interests: {
    type: [String], // array of strings
    default: [],
  },
});

// Prevent model overwrite upon hot reloads in dev
export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
