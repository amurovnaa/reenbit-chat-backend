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

  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ message: 'Both firstName and lastName are required' });
  }

  let avatarUrl = null;
  if (file) {
    avatarUrl =
      getEnvVar('ENABLE_CLOUDINARY') === 'true'
        ? await saveFileToCloudinary(file)
        : await saveFileToUploadDir(file);
  }

  const chat = await createChat({ firstName, lastName, avatarUrl });
  return res.status(201).json(chat);
};

export const updateChatController = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const file = req.file;

  if (file) {
    const avatarUrl =
      getEnvVar('ENABLE_CLOUDINARY') === 'true'
        ? await saveFileToCloudinary(file)
        : await saveFileToUploadDir(file);
    data.avatar = avatarUrl;
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
