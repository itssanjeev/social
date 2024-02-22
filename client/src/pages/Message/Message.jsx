import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox';
import { messageUserList } from '../../apicall/messageApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom'

const Message = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [chatId, setChatId] = useState();
    const navigate = useNavigate();
    const loadMoreData = async () => {
        try {
            if (loading) {
                return;
            }
            setLoading(true);
            const result = await messageUserList();
            setData([...data, ...result.data]);
            console.log(result.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    const handleClick = (value) => {
        console.log(value);
        setChatId(value)
    }
    useEffect(() => {
        loadMoreData();
    }, []);
    return (
        <div className='flex flex-row h-screen'>
            <div className='w-2/6 overflow-y-auto h-full'>
                <div
                    id="scrollableDiv"
                    style={{
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length > 40 ? data.length < 40 : data.length < data.length}
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
                                <List.Item key={item.receiverId} className='hover:bg-slate-400 cursor-pointer'
                                    onClick={() => handleClick(item)}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.profilePicture} />}
                                        title={item.receiverName}
                                        description={item.receiverUsername}
                                    />
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </div>
            <div className='w-4/6 '>
                <div className='flex-grow relative'>
                    <ChatBox chatId={chatId?.chatId} receiverId={chatId?.receiverId}>
                    </ChatBox>
                </div>

            </div>
        </div>
    )
}

export default Message;