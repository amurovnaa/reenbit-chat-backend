import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import chatRoutes from './routers/chats.js';
import messageRoutes from './routers/messages.js';
// import { swaggerSpec, swaggerUi } from './config/swagger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/chats', chatRoutes);
app.use('/api/messages', messageRoutes);

export default app;
