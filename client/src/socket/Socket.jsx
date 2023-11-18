import io from 'socket.io-client';

const socket = io('connect-me-two.vercel.app', {
    withCredentials: true,
});


export default socket;
