import { Button, Input } from 'antd';
import React from 'react'
import { useState, useEffect } from 'react';
// import socket from '../../socket/Socket';
import Devider from '../../component/Devider';
const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [sendMessage, setSendMessage] = useState([]);
    const [receivedMessages, setReceivedMessages] = useState([]);

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

    const handleSendMessage = () => {
        setSendMessage([...sendMessage, message]);
        setMessage('');
    }
    const handleChange = (e) => {
        setMessage(e.target.value)
        // console.log(message);
    }
    return (
        <div>
            <div className='text-2xl h-10 bg-slate-300 flex  justify-center'>Name </div>
            <div className="h-screen mb-8 overflow-y-scroll flex flex-col-reverse">
                <div className="p-4">
                    {
                        sendMessage?.map((msg, index) => (
                            <>
                                <div key={index}>{msg}</div>
                                <Devider></Devider>
                            </>
                        ))

                    }
                </div>
            </div>

            <div className='flex flex-row absolute bottom-1 w-full'>
                <Input
                    type="text"
                    placeholder='write something'
                    className='text-black flex-grow bg-slate-100 border border-black'
                    onChange={handleChange} value={message}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <Button className='bg-gray-400 ' onClick={handleSendMessage}>send</Button>
            </div>
        </div>
    )
}

export default ChatBox;