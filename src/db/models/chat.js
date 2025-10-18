import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema(
  {
    avatar: { type: String, default: null },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Chat', chatSchema);
