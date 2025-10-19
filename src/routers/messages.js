import express from 'express';
import {
  getMessagesController,
  sendMessageController,
  updateMessageController,
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
 * /messages/{id}:
 *   patch:
 *     summary: Update a message by ID
 */
messagesRouter.get('/:chatId', getMessagesController);
messagesRouter.post('/', sendMessageController);
messagesRouter.patch('/:id', updateMessageController);

export default messagesRouter;
