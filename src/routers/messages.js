import express from 'express';
import {
  getMessagesController,
  sendMessageController,
} from '../controllers/message.js';

const messagesRouter = express.Router();

/**
 * @swagger
 * /messages/{chatId}:
 *   get:
 *     summary: Get all messages from chat
 * /messages:
 *   post:
 *     summary: Send new message
 */
messagesRouter.get('/:chatId', getMessagesController);
messagesRouter.post('/', sendMessageController);

export default messagesRouter;
