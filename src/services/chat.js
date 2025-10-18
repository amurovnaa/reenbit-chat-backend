import Chat from '../db/models/chat.js';

export const getAllChats = async () => {
  return await Chat.find().sort({ createdAt: -1 });
};

export const createChat = async ({ firstName, lastName, avatarUrl }) => {
  return await Chat.create({ firstName, lastName, avatar: avatarUrl });
};

export const updateChatById = async (id, data) => {
  return await Chat.findByIdAndUpdate(id, data, { new: true });
};

export const deleteChatById = async (id) => {
  return await Chat.findByIdAndDelete(id);
};
