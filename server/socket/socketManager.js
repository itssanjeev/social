const userSocket = {};
module.exports = {
    getUserSocket: (userId) => {
        // console.log(userId, userSocket[userId], 'socket Manager 5');
        return userSocket[userId];
    },
    setUserSocket: (userId, socket) => {
        userSocket[userId] = socket
        // console.log(userSocket[userId], userId, 'inside socketManager 10');
    }
}