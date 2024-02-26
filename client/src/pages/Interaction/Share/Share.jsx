import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const Share = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleClick = () => {
        console.log('clicked');
    }
    return (
        <div className='cursor-pointer'

        >
            <i className=" mr-7 text-5xl ri-share-fill cursor-pointer"
                onClick={showModal}
            ></i>
            <Modal title="share to"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className='w-full bg-slate-400 h-screen'
            >


            </Modal>
        </div>
    )
}

export default Share