import React, { useEffect, useState } from 'react'
import { List } from 'antd';
import { getNotificationApi, readNotificationApi } from '../../apicall/notificationApi';
import { useNavigate } from 'react-router-dom';


/**
 * The function `formatCustomRelativeTime` takes a date as input and returns a formatted string
 * representing the relative time difference between that date and the current date.
 * @returns The function `formatCustomRelativeTime` takes a date as input, calculates the time
 * difference between that date and the current date, and returns a formatted string indicating how
 * long ago the input date was relative to the current date. The function returns a string with a
 * custom relative time format, such as "Just now", "Xs ago", "Xm ago", "Xh ago", "Xd
 */
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
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('currentUserId');
    const [result, setResult] = useState([]);
    /**
     * The function `getNotification` asynchronously fetches notification data from an API based on the
     * current user ID and sets the result to the retrieved data.
     */
    const getNotification = async () => {
        const data = await getNotificationApi({ currentUserId: currentUserId });
        // console.log(data);
        setResult(data.data);
    }
    if (!result) {
        return <div>Loading...</div>;
    }
    /**
     * The function `readNotificationFun` is an asynchronous function that calls an API to mark a
     * notification as read, handling any errors that may occur.
     */
    const readNotificationFun = async () => {
        try {
            await readNotificationApi({ currentUserId: currentUserId });
        } catch (error) {
            // console.log(error);
        }
    }
    /**
     * The handleClick function navigates to a specific post page based on the provided id.
     */
    const handleClick = (id) => {
        navigate(`/post/${id}`);
    }
    useEffect(() => {
        getNotification();
    }, [])
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
                    <List.Item className={`font-semibold flex flex-row cursor-pointer  ${item.read === false ? 'bg-gray-100' : ''}`}
                        onClick={() => handleClick(item?.post)}
                    >
                        <div>{item.sender.name} has {item.action} your post</div>
                        <div>{formatCustomRelativeTime(item.createdAt)} item</div>
                    </List.Item>}
            />
        </div>
    )
}

export default Notificaton;