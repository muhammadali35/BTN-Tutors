// src/utils/socket.js

import { Server } from "socket.io";

// Socket.IO instance banayein (singleton)
const io = new Server({
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:5174'
    ],
    credentials: true,
  }
});

// Notification emit karne ka function
export const emitNewRegistration = (userData) => {
  io.emit("new-registration", userData);
};

// Instance export karo
export default io;