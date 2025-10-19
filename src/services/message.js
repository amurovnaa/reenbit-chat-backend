import Message from '../db/models/message.js';
import { getRandomQuote } from '../utils/getRandomQuote.js';

export const getMessagesByChatId = async (chatId) => {
  return await Message.find({ chatId });
};

export const createMessage = async (chatId, sender, text, io) => {
  const message = await Message.create({ chatId, sender, text });

  if (io) {
    setTimeout(async () => {
      try {
        const quote = await getRandomQuote();
        const botMessage = await Message.create({
          chatId,
          sender: 'bot',
          text: quote,
        });
        io.emit('newMessage', { chatId, message: botMessage });
      } catch (err) {
        console.error('Failed to send auto-response:', err.message);
      }
    }, 3000);
  }

  return message;
};
export const updateMessage = async (messageId, newText, io) => {
  const updatedMessage = await Message.findByIdAndUpdate(
    messageId,
    { text: newText, updatedAt: new Date() },
    { new: true },
  );

  if (!updatedMessage) throw new Error('Message not found');

  if (io) {
    io.emit('messageUpdated', updatedMessage);
  }

  return updatedMessage;
};
