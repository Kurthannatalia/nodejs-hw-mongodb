import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const PORT = process.env.PORT || Number(getEnvVar('PORT', '3000'));

const startServer = async () => {
  try {
    // Чекаємо успішного підключення до MongoDB
    await initMongoConnection();

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.use('/contacts', contactsRouter);

    app.use('*', notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
