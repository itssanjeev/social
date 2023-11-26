import io from 'socket.io-client';

const socket = io('https://connectme-backend-9zma.onrender.com', {
    withCredentials: true,
});


export default socket;
