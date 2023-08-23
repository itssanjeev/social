import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { messageUserList } from '../../apicall/messageApi';

const UserList = ({ otherUser }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const currentUserId = localStorage.getItem('currentUserId');
    const otherUserId = localStorage.getItem('otherUserId');
    const userListFun = async () => {
        try {
            const result = await messageUserList({ currentUserId: currentUserId, otherUserId: otherUserId });
            console.log(result);
            setData(result.recievers)
        } catch (error) {
            console.log(error);
        }
    }
    // const handleUserList = async (otherid) => {
    //     console.log(otherid);
    // }
    useEffect(() => {
        userListFun();
        // loadMoreData();
    }, []);
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
                dataLength={data.length}
                // hasMore={data.length < 50}
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
                        <List.Item key={item._id}>
                            <div >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.profilePicture} />}
                                    title={<div>{item.username}</div>}
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