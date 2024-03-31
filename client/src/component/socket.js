import { io } from 'socket.io-client';
export const socket = io("https://ghost-chat-m4a4.onrender.com", { transports: ['websocket'] });
