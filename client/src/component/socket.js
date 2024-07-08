import { io } from 'socket.io-client';
import { baseUrl } from '../apicall/baseUrl';
export const socket = io(baseUrl, { transports: ['websocket'] });
