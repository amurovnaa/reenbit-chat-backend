import Message from '../db/models/message.js';
import { getRandomQuote } from './quote.js';

export const getMessagesByChatId = async (chatId) => {
  return await Message.find({ chatId });
};

export const createMessage = async (
  chatId,
  sender,
  text,
  io,
  autoResponse = false,
) => {
  const message = await Message.create({ chatId, sender, text });

  if (!autoResponse && sender === 'user' && io) {
    setTimeout(async () => {
      const quote = await getRandomQuote();
      const botMsg = await createMessage(chatId, 'bot', quote, io, true);
      io.emit('newMessage', { chatId, message: botMsg });
    }, 3000);
  }

  return message;
};
