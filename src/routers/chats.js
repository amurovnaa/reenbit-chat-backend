import express from 'express';
import {
  createChatController,
  deleteChatController,
  getChatsController,
  updateChatController,
} from '../controllers/chat.js';

const chatsRouter = express.Router();

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chats
 *   post:
 *     summary: Create new chat
 */
chatsRouter.get('/', getChatsController);
chatsRouter.post('/', createChatController);

/**
 * @swagger
 * /chats/{id}:
 *   put:
 *     summary: Update chat
 *   delete:
 *     summary: Delete chat
 */
chatsRouter.put('/:id', updateChatController);
chatsRouter.delete('/:id', deleteChatController);

export default chatsRouter;
