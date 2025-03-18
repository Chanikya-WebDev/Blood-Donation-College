import { Schema, model } from 'mongoose';

const donorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  donationDate: {
    type: Date,
    required: true,
  },
  donorId: {
    type: String,
    required: true,
    unique: true,
  },
});

export default model('Donor', donorSchema);
