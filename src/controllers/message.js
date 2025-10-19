import {
  createMessage,
  getMessagesByChatId,
  updateMessage,
} from '../services/message.js';

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

    const message = await createMessage(chatId, 'user', text, io);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};
export const updateMessageController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const io = req.app.get('io');

    if (!text) return res.status(400).json({ message: 'Text is required' });

    const updatedMessage = await updateMessage(id, text, io);

    res.status(200).json(updatedMessage);
  } catch (err) {
    next(err);
  }
};
