import { createMessage, getMessagesByChatId } from '../services/message.js';

export const getMessagesController = async (req, res, next) => {
  try {
    const messages = await getMessagesByChatId(req.params.chatId);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const sendMessageController = async (req, res, next) => {
  try {
    const { chatId, text } = req.body;
    const io = req.app.get('io');

    if (!chatId || !text) {
      return res.status(400).json({ message: 'chatId and text are required' });
    }

    const userMsg = await createMessage(chatId, 'user', text, io);
    res.status(201).json(userMsg);
  } catch (err) {
    next(err);
  }
};
