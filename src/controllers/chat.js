import {
  createChat,
  deleteChatById,
  getAllChats,
  updateChatById,
} from '../services/chat.js';
import { getEnvVar } from '../utils/getEnvVars.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';

export const getChatsController = async (req, res) => {
  const chats = await getAllChats();
  res.json(chats);
};

export const createChatController = async (req, res) => {
  const { firstName, lastName } = req.body;
  const file = req.file;

  const data = { firstName, lastName };

  if (file) {
    const avatar =
      getEnvVar('ENABLE_CLOUDINARY') === 'true'
        ? await saveFileToCloudinary(file)
        : await saveFileToUploadDir(file);
    data.avatar = avatar;
  }

  const chat = await createChat(data);
  return res.status(201).json(chat);
};

export const updateChatController = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;
  const file = req.file;

  const data = { firstName, lastName };

  if (file) {
    const avatar =
      getEnvVar('ENABLE_CLOUDINARY') === 'true'
        ? await saveFileToCloudinary(file)
        : await saveFileToUploadDir(file);
    data.avatar = avatar;
  }

  const chat = await updateChatById(id, data);

  if (!chat) {
    return res.status(404).json({ message: 'Chat not found' });
  }

  return res.json(chat);
};

export const deleteChatController = async (req, res) => {
  const chat = await deleteChatById(req.params.id);

  if (!chat) {
    res.status(404).json({ message: 'Chat not found' });
    return;
  }

  res.json({ message: 'Chat removed' });
};
