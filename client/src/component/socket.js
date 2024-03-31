import { io } from 'socket.io-client';
export const socket = io("localhost:8080", { transports: ['websocket'] });
// export const socket = io("wss://ghost-chat-m4a4.onrender.com", { transports: ['websocket'] });
