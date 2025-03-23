import { Schema, model } from "mongoose";

const bloodRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
  bloodType: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  bloodAmount: {
    type: Number,
    required: true,
    min: 1, // Ensure at least 1ml is requested
  },
  doctorPrescription: {
    type: String, // Will store the file path after uploading
    required: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  hospitalAddress: {
    type: String,
    required: true,
  },
  requestStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending", // Default status when the request is created
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-set the request date
  },
});

const BloodRequest = model("BloodRequest", bloodRequestSchema);

export default BloodRequest;
