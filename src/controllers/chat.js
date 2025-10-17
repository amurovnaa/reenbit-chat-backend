import {
  createChat,
  deleteChatById,
  getAllChats,
  updateChatById,
} from '../services/chat.js';

export const getChatsController = async (req, res) => {
  const chats = await getAllChats();
  res.json(chats);
};

export const createChatController = async (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    res
      .status(400)
      .json({ message: 'Both firstName and lastName are required' });
    return;
  }

  const chat = await createChat(firstName, lastName);
  res.status(201).json(chat);
};

export const updateChatController = async (req, res) => {
  const chat = await updateChatById(req.params.id, req.body);

  if (!chat) {
    res.status(404).json({ message: 'Chat not found' });
    return;
  }

  res.json(chat);
};

export const deleteChatController = async (req, res) => {
  const chat = await deleteChatById(req.params.id);

  if (!chat) {
    res.status(404).json({ message: 'Chat not found' });
    return;
  }

  res.json({ message: 'Chat removed' });
};
