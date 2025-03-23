import { Schema, model } from "mongoose";

const donorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  donationDate: {
    type: Date,
    default: null, // Can be null if not donated in 6 months
  },
  eligibility: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Auto-set the registration date
  },
});

const Donor = model("Donor", donorSchema);

export default Donor;
