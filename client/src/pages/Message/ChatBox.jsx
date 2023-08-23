import { Button, Input } from 'antd';
import React from 'react'
import { useState, useEffect } from 'react';
// import socket from '../../socket/Socket';
import { sentMessage } from '../../apicall/messageApi';
import { getAllMessage } from '../../apicall/messageApi';

const { TextArea } = Input;

const ChatBox = ({ otherUser }) => {
    const [text, setText] = useState('');
    const [message, setMessage] = useState([]);

    /* useEffect(() => {
           socket.on('connect', () => {
               console.log('Connected to the server');
           });
   
           socket.on('disconnect', () => {
               console.log('Disconnected from the server');
           });
   
           socket.on('chatMessage', (message) => {
               // console.log(message);
               setReceivedMessages((prevMessages) => [...prevMessages, message]);
           });
       }, [])
      
       const handleSendMessage = () => {
           if (message.trim() !== '') {
               socket.emit('chatMessage', message);
               setMessage('');
           }
       };
        */

    const currentUserId = localStorage.getItem('currentUserId');
    const otherUserIds = localStorage.getItem('otherUserId');
    // const otherUserId = localStorage.getItem('otheruserId');
    const getAllMessageFun = async () => {
        try {
            const response = await getAllMessage({ otherUserId: otherUserIds, currentUserId: currentUserId });
            console.log(response);
            setMessage(response.data);
        } catch (error) {
            console.log(error);
        }

    }
    const handleSendMessage = async () => {
        const result = await sentMessage({ msg: text, currentUserId: currentUserId, otherUserId: otherUserIds });
        console.log(result);
        setText('');
        getAllMessageFun();
    }
    const handleChange = (e) => {
        setText(e.target.value)
    }
    useEffect(() => {
        getAllMessageFun();
    }, [otherUserIds])
    return (
        <div>
            <div className='text-2xl h-10 bg-slate-300 flex  justify-center'>{otherUser?.name} </div>
            <div className="h-screen mb-8 overflow-y-scroll flex flex-col-reverse">
                <div className="p-4">
                    {
                        message.map((m) => (
                            <>
                                <div key={m._id} className={`mb-2 font-semibold text-xl ${m.sender == currentUserId ? 'bg-red-200 text-right mr-1' : 'bg-blue-200 text-left ml-1'}`}>
                                    <div className='m-1'>{m.messages[0].content}</div>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>

            <div className='flex flex-row absolute bottom-1 w-full ml-2 mr-3'>
                <Input.TextArea
                    type="text"
                    size='small'
                    placeholder='write something'
                    className='text-black flex-grow bg-slate-100 border border-black'
                    onChange={handleChange} value={text}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <Button size='large' className='bg-gray-400 ' onClick={handleSendMessage}>send</Button>
            </div>
        </div>
    )
}

export default ChatBox;