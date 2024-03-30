import { io } from 'socket.io-client';
// export const socket = io("ws://localhost:3000");
export const socket = io("ghost-chat-m4a4.onrender.com", { transports: ['websocket'] });
