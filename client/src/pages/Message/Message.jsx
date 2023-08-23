import React, { useEffect, useState } from 'react'
// import socket from '../../socket/Socket';
import { Row, Col } from 'antd'
import UserList from './UserList';
import ChatBox from './ChatBox';
import { getOtherUser } from '../../apicall/otherUserApi';
import { setOtherUser } from '../../redux/otherUserSlice';
import { useDispatch, useSelector } from 'react-redux';

const Message = () => {
    const dispatch = useDispatch();
    const getOtherUserFun = async () => {
        const id = localStorage.getItem('otherUserId');
        const data = await getOtherUser({ otherUserId: id });
        dispatch(setOtherUser(data.data));
    }
    const otherUser = useSelector((state) => state.otherUsers.otherUser);
    useEffect(() => {
        getOtherUserFun();
    }, [])

    return (
        <>
            <Row className=''>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} className='w-full border-2 border-blue-800 bg-sky-100'>
                    <UserList otherUser={otherUser} getOtherUserFun={getOtherUserFun}></UserList>
                </Col>
                <Col xs={0} sm={0} md={16} lg={16} xl={16} >
                    <ChatBox otherUser={otherUser}></ChatBox>
                </Col>
            </Row>
        </>
    )
}

export default Message;