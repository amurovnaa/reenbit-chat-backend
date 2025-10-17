import { Router } from 'express';
import chatsRouter from './chats.js';
import messagesRouter from './messages.js';

const router = Router();

router.use('/chats', chatsRouter);
router.use('/messages', messagesRouter);

export default router;
