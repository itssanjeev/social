import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/notificationSlice';
import { socket } from '../../component/socket';
import { fetchNotifications } from '../../redux/redux-thunk/notificationReduxThunk';

const currentUserId = localStorage.getItem('currentUserId');

const NotificationSocket = () => {
    const dispatch = useDispatch();
    dispatch(fetchNotifications({ currentUserId: currentUserId }));

    useEffect(() => {
        socket.emit("new-user-add", currentUserId)

        socket.on('like', (data) => {
            console.log(data);
            dispatch(addNotification({ type: 'like', ...data }));
        });

        socket.on('comment', (data) => {
            dispatch(addNotification({ type: 'comment', ...data }));
        });

        socket.on('message', (data) => {
            dispatch(addNotification({ type: 'message', ...data }));
        });

        return () => {
            socket.off('like');
            socket.off('comment');
            socket.off('message');
        };
    }, [dispatch]);

    return null;
};

export default NotificationSocket;
