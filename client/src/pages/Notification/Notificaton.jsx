import React, { useEffect } from 'react'
import { List } from 'antd';
import { useSelector } from 'react-redux';
import { readNotificationApi } from '../../apicall/notificationApi';


function formatCustomRelativeTime(date) {
    const inputDate = new Date(date);
    const newDate = new Date(Date.now());
    const timeDifference = newDate.getTime() - inputDate.getTime(); // Calculate time difference in milliseconds

    // Determine which time interval label to use based on the time difference
    if (timeDifference < 1000) {
        return 'Just now'; // If less than 1 second
    } else if (timeDifference < 60 * 1000) {
        return `${Math.floor(timeDifference / 1000)}s ago`; // If less than 1 minute
    } else if (timeDifference < 60 * 60 * 1000) {
        return `${Math.floor(timeDifference / (60 * 1000))}m ago`; // If less than 1 hour
    } else if (timeDifference < 24 * 60 * 60 * 1000) {
        return `${Math.floor(timeDifference / (60 * 60 * 1000))}h ago`; // If less than 1 day
    } else if (timeDifference < 30 * 24 * 60 * 60 * 1000) {
        return `${Math.floor(timeDifference / (24 * 60 * 60 * 1000))}d ago`; // If less than 1 month
    } else if (timeDifference < 12 * 30 * 24 * 60 * 60 * 1000) {
        return `${Math.floor(timeDifference / (30 * 24 * 60 * 60 * 1000))}mo ago`; // If less than 1 year
    } else {
        return `${Math.floor(timeDifference / (12 * 30 * 24 * 60 * 60 * 1000))}y ago`; // If more than 1 year
    }
}

const Notificaton = () => {
    const currentUserId = localStorage.getItem('currentUserId');
    const result = useSelector((state) => state.notification.notification)
    if (!result) {
        return <div>Loading...</div>;
    }
    const readNotificationFun = async () => {
        try {
            const result = await readNotificationApi({ currentUserId: currentUserId });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        readNotificationFun();
    }, []);
    return (
        <div className='notification h-screen overflow-y-scroll mt-0 bg-sky-50'>
            <List
                size="large"
                bordered
                dataSource={result}
                renderItem={(item) =>
                    <List.Item className={`font-semibold flex flex-row ${item.read === false ? 'bg-gray-100' : ''}`}>
                        <div>{item.sender.name} has {item.action} your post</div>
                        <div>{formatCustomRelativeTime(item.createdAt)} item</div>
                    </List.Item>}
            />
        </div>
    )
}

export default Notificaton;