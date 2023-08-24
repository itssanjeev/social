import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { messageUserList } from '../../apicall/messageApi';

const UserList = ({ getOtherUserFun }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const currentUserId = localStorage.getItem('currentUserId');
    const messageUserListId = localStorage.getItem('messageUserListId');
    const userListFun = async () => {
        try {
            const result = await messageUserList({ currentUserId: currentUserId, otherUserId: messageUserListId });
            console.log(result);
            setData(result.recievers)
        } catch (error) {
            console.log(error);
        }
    }
    const handleUserList = async (otherid) => {
        console.log(otherid);
        localStorage.setItem('messageUserListId', otherid)
        getOtherUserFun();
    }
    useEffect(() => {
        userListFun();
        // loadMoreData();
    }, [messageUserListId]);
    return (
        <div
            id="scrollableDiv"
            style={{
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
            className='h-screen'
        >
            <InfiniteScroll
                dataLength={data?.length}
                loader={
                    <Skeleton
                        avatar
                        paragraph={{
                            rows: 1,
                        }}
                        active
                    />
                }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item key={item._id} onClick={() => handleUserList(item._id)} className={`cursor-pointer ${item._id === messageUserListId ? 'bg-green-200' : 'bg-sky-100'}`}>
                            <div >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.profilePicture} />}
                                    title={<div>{item.username}</div>}
                                    description={item.name}
                                />
                            </div>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    )
}

export default UserList;