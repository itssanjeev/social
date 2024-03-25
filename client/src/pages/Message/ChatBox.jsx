import React, { useEffect, useState } from 'react';
import { getAllUserMessage, sentMessage } from '../../apicall/messageApi';
import { getOtherUser } from '../../apicall/otherUserApi';
import { parseISO, format } from 'date-fns';
import { socket } from '../../component/socket';
import { readMessageNotificationChatBoxOpen } from '../../apicall/notificationApi';

const ChatBox = ({ chatId, receiverId, handleToggle }) => {
    const [data, setData] = useState([]);
    const [text, setText] = useState('');
    const [receiver, setReceiver] = useState();
    const getUserMessage = async () => {
        try {
            const data = await getAllUserMessage({ chatId: chatId, receiverId: receiverId });
            setData(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const userid = localStorage.getItem('currentUserId');
    const getText = async (e) => {
        try {
            e.preventDefault();
            setText(e.target.value);
        } catch (error) {
            console.log(error);
        }
    }
    const sentText = async () => {
        try {
            if (text.length === 0) throw new Error("size is 0");
            await sentMessage({ chatId: chatId, receiverId: receiverId, text: text });
            let currentDate = new Date();
            // Format date and time
            let formattedDateTime = currentDate.toISOString();
            console.log("Current Date and Time:", formattedDateTime);
            socket.emit("send-message", { receiverId, userid, text, createdAt: formattedDateTime });
            setText('');
            getUserMessage();
        } catch (error) {
            console.log(error);
        }
    }

    const formattedDate = (currentDate) => {
        const parsedDate = parseISO(currentDate);
        return format(parsedDate, 'HH:mm:ss dd-MM-yyyy');
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            sentText();
        }
    };
    const handleReceiver = async () => {
        try {
            const result = await getOtherUser({ otherUserId: receiverId });
            setReceiver(result.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleSocket = () => {
        // Add socket event listener when component mounts
        socket.on("recieve-message", async (newData) => {
            const socketSenderId = newData.userid;
            console.log(socketSenderId, 'sam', receiverId);
            if (receiverId) {
                if (socketSenderId === receiverId) {
                    console.log('inside the if before compresion')
                    setData(prevstate => [...prevstate, newData]);
                    if (chatId && receiverId) {
                        try {
                            const data = await readMessageNotificationChatBoxOpen({ receiverId, userid });
                            console.log(data);
                        } catch (error) {
                            console.log('error:', error);
                        }
                    }
                }
            }
            // console.log(newData);
        });
        // Clean up function to remove socket event listener when component unmounts
        return () => {
            socket.off("recieve-message");
        };
    }
    useEffect(() => {
        if (chatId && receiverId) {
            getUserMessage();
        }
        handleSocket();
    }, [chatId, receiverId]);
    useEffect(() => {
        handleReceiver()
    }, [receiverId])

    return (
        <>
            {
                chatId &&
                <div>
                    <div className="h-screen overflow-hidden border border-y-4 border-black">
                        <div className="flex flex-col justify-between ">
                            <div className="h-12 bg-gray-200 flex justify-center">
                                <div onClick={handleToggle} className='absolute top-0 left-0 cursor-pointer sm:hidden'>
                                    <i className="ri-arrow-left-line text-4xl "></i>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="">
                                        {
                                            receiver?.profilePicture.length > 0 &&
                                            <img src={`${receiver?.profilePicture}`} className='w-10 h-10 rounded-full' alt="img"></img>
                                        }
                                    </div>
                                    <div className='m-2'>
                                        {
                                            receiver && receiver.username
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='overflow-y-auto m-2 p-2 h-[550px]'>
                                {
                                    data?.map((d) => (
                                        <div className='flex flex-col  mt-4' key={d._id}>
                                            <p className={`flex text-xl    ${d.receiverId === userid ? 'justify-start' : 'justify-end'}  p-2 rounded-lg`} >
                                                <div className='flex flex-col'>
                                                    <div>{d.text}</div>
                                                    <div className='text-slate-600'>{formattedDate(d?.createdAt)}</div>
                                                </div>
                                            </p>
                                            <hr />
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="mt-auto  p-2 absolute bottom-14 left-0 right-0  flex flex-row">
                                <input type="text" placeholder="type something" className=' h-14 text-xl w-full rounded-xl'
                                    value={text}
                                    onChange={getText}
                                    onKeyDown={handleKeyPress}
                                />
                                <i className="ri-send-plane-2-fill text-6xl cursor-pointer"
                                    onClick={sentText}
                                ></i>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default ChatBox;