import { Schema, model } from 'mongoose';

const certificateSchema = new Schema({
  donorId: {
    type: Schema.Types.ObjectId,
    ref: 'Donor',
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
});

export default model('Certificate', certificateSchema);
