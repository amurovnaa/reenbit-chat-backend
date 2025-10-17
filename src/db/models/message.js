import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    sender: { type: String, enum: ['user', 'bot'], required: true },
    text: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Message', messageSchema);
