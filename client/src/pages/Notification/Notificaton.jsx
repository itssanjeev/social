import React, { useEffect, useState } from 'react'
import { List } from 'antd';
import { readNotificationApi } from '../../apicall/notificationApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



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

    const result = useSelector((state) => state.notifications.list);
    const loading = useSelector((state) => state.notifications.loading);
    const error = useSelector((state) => state.notifications.error);
    // console.log(result);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const readNotificationFun = async () => {
        try {
            await readNotificationApi({ currentUserId: currentUserId });
        } catch (error) {
            // console.log(error);
        }
    }

    // const handleClick = (id) => {
    //     navigate(`/post/${id}`);
    // } 

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
                    // onClick={() => handleClick(item?.post)} 
                    >
                        {
                            item.action === 'message' ? (
                                <>
                                    <div>{item?.sender?.name} has {item?.action} you</div>
                                    <div>{formatCustomRelativeTime(item?.updatedAt)} item</div>
                                </>
                            ) :
                                (
                                    <>
                                        <div>{item?.sender?.name} has {item?.action} your post</div>
                                        <div>{formatCustomRelativeTime(item?.updatedAt)} item</div>
                                    </>
                                )

                        }

                    </List.Item>}
            />
        </div>
    )
}

export default Notificaton;