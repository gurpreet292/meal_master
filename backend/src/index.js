import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

dotenv.config();
const PORT = globalThis.process?.env?.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the existing process or choose another PORT.`);
      globalThis.process?.exit?.(1);
      return;
    }

    console.error('Server error:', err.message);
    globalThis.process?.exit?.(1);
  });
};

startServer();
