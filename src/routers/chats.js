import express from 'express';
import {
  createChatController,
  deleteChatController,
  getChatsController,
  updateChatController,
} from '../controllers/chat.js';
import { upload } from '../middlewares/multer.js';

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
chatsRouter.post('/', upload.single('avatar'), createChatController);

/**
 * @swagger
 * /chats/{id}:
 *   put:
 *     summary: Update chat
 *   delete:
 *     summary: Delete chat
 */
chatsRouter.put('/:id', upload.single('avatar'), updateChatController);
chatsRouter.delete('/:id', deleteChatController);

export default chatsRouter;
