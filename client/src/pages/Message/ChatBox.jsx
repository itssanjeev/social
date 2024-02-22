import React, { useEffect, useState } from 'react';
import { getAllUserMessage } from '../../apicall/messageApi';

const ChatBox = ({ chatId, receiverId }) => {
    const [data, setData] = useState([]);
    const getUserMessage = async () => {
        try {
            const data = await getAllUserMessage({ chatId: chatId });
            setData(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const userid = localStorage.getItem('currentUserId');
    useEffect(() => {
        getUserMessage();
    }, [chatId, receiverId]);
    return (
        <>
            {
                chatId &&
                <div className="h-screen overflow-hidden border border-y-4 border-black">
                    <div className="flex flex-col justify-between flex-grow">
                        <div className="h-12 bg-gray-200 flex flex-row justify-center items-center">
                            <div>profile picture</div>
                            <div>username</div>
                        </div>
                        <div className='overflow-y-auto m-2 p-2'>
                            {
                                data?.map((d) => (
                                    <div className='flex flex-col  mt-4'>
                                        <div className={`flex text-xl ${d.receiverId === userid ? 'justify-end' : 'justify-start'}`}>{d.text}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="mt-auto  p-2 absolute bottom-14 left-0 right-0  flex flex-row">
                            <input type="text" placeholder="type something" className=' h-14 text-xl w-full rounded-xl' />
                            <i className="ri-send-plane-2-fill text-6xl"></i>
                        </div>

                    </div>
                </div>
            }
        </>

    )
}

export default ChatBox;