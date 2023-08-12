import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loaderSlice';
import { useNavigate } from 'react-router-dom';
import { followingApi } from '../../apicall/userApi';
const Following = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const followingFun = async () => {
        try {
            const id = localStorage.getItem('followingId')
            // console.log(id);
            dispatch(setLoader(true));
            const result = await followingApi({ followingId: id });
            // console.log(result.data.following);
            dispatch(setLoader(false));

            setData(result.data.following)
            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    const handleVisitProfile = (id) => {
        localStorage.setItem('otherUserId', id);
        // console.log(localStorage.getItem('otherUserId'));
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId === id) {
            navigate('/profile');
        } else {
            navigate('/OthersProfile');
        }
    }
    useEffect(() => {
        followingFun();
    }, [])
    return (
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
                                    title={<div >{item.name}</div>}
                                    description={item.username}
                                />
                            </List.Item>
                        </div>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};
export default Following;