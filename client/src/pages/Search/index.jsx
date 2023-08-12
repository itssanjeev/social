import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { searchUser } from '../../apicall/userApi';
import { useNavigate } from 'react-router-dom';

const index = () => {
    const navigate = useNavigate();
    const [inputData, setInputData] = useState({});
    const [data, setData] = useState([]);
    const handleChange = (e) => {
        // console.log(e.target.value);
        setInputData({ ...inputData, 'text': e.target.value });
    }
    const searchUserFun = async () => {
        try {
            const result = await searchUser(inputData);
            setData(result.data);
            console.log(result.data);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleVisitProfile = (id) => {
        localStorage.setItem('otherUserId', id);
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId === id) {
            navigate('/profile');
        } else {
            navigate('/OthersProfile');
        }
    }

    return (
        <div >
            <div className='w-full  bg-sky-100 flex  justify-center flex-row'>
                <input type="text" placeholder=' input userid ' className='lg:w-1/2 bg-slate-100 h-8  w-full' onChange={handleChange}
                />
                <div className='flex-row mt-0'>
                    <i className="ri-search-line text-4xl bg-sky-200" onClick={() => searchUserFun()}></i>
                </div>
            </div>
            <div
                id="scrollableDiv"
                style={{
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
                className='h-screen bg-sky-100'
            >

                <InfiniteScroll
                    dataLength={data.length}
                    hasMore={data.length < data.length}
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
                            <div className='cursor-pointer' onClick={() => handleVisitProfile(item._id)}>
                                <List.Item key={item._id}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.profilePicture
                                        } />}
                                        title={<div >{item.username}</div>}
                                        description={item.name}
                                    />
                                    <div>Content</div>
                                </List.Item>
                            </div>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default index