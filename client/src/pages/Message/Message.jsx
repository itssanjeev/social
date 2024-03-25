import React, { useEffect, useState } from 'react'
import ChatBox from './ChatBox';
import { messageUserList } from '../../apicall/messageApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom'
// import { readMessageNotificationApi } from '../../apicall/notificationApi';
import { socket } from '../../component/socket';

const Message = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [chatId, setChatId] = useState();
    const [toggleList, setToggleList] = useState(true);
    const [toggleChat, setToggleChat] = useState(false);
    const userid = localStorage.getItem('currentUserId');
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

    const handleToggle = () => {
        setToggleList(!toggleList);
        setToggleChat(!toggleChat);
    }
    const handleClick = (value) => {
        console.log(value.receiverId, 'userid', userid);
        setChatId(value)
        value.notificationsCount = 0;
    }

    useEffect(() => {
        loadMoreData();
    }, []);
    useEffect(() => {
        socket.on("get-users", (activeUser) => {
            console.log(activeUser);
        })
    })

    return (
        <div>
            {/*---------------------------------- for pc------------------------ */}
            <div className="hidden sm:flex flex-col">
                <div>
                    <div className='flex flex-row h-screen '>
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
                                                <div className={`${item.notificationsCount > 0 ? "bg-red-400 rounded-full w-6 h-6 text-center font-semibold" : ''}`}>{item.notificationsCount > 0 ? item.notificationsCount : ''}</div>
                                            </List.Item>
                                        )}
                                    />
                                </InfiniteScroll>
                            </div>
                        </div>
                        <div className='w-4/6 border-solid'>
                            <div className='flex-grow relative'>
                                <ChatBox chatId={chatId?.chatId} receiverId={chatId?.receiverId}>
                                </ChatBox>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ----------------------------for mobile----------------------- */}
            <div className='sm:hidden'>
                <div>
                    <div className='flex flex-row h-screen '>
                        {toggleList &&
                            <div className='w-full overflow-y-auto h-full' onClick={handleToggle}>
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
                        }
                        {
                            toggleChat &&
                            <div className='w-full border-solid' >
                                <div className='flex-grow relative'>
                                    <ChatBox chatId={chatId?.chatId} receiverId={chatId?.receiverId} handleToggle={handleToggle}>
                                    </ChatBox>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Message;