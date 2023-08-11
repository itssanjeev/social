import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loaderSlice';
import { useNavigate } from 'react-router-dom';
import { followersApi } from '../../apicall/userApi';
const Followers = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const followersFun = async (req, res) => {
        try {
            dispatch(setLoader(true));
            const result = await followersApi();
            dispatch(setLoader(false));

            setData(result)
            // console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    const handleVisitProfile = (id) => {
        localStorage.setItem('otherUserId', id);
        // console.log(localStorage.getItem('otherUserId'));
        // console.log(id);
        navigate('/OthersProfile');
    }
    useEffect(() => {
        followersFun();
    }, [])
    return (
        <div
            id="scrollableDiv"
            style={{
                height: 400,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
            }}
        >
            <InfiniteScroll
                dataLength={data.length}
                next={followersFun}
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
                        <div onClick={() => handleVisitProfile(item._id)}>
                            <List.Item key={item._id}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.profilePicture
                                    } />}
                                    title={<div >{item.name}</div>}
                                    description={item.username}
                                />
                                <div>Content</div>
                            </List.Item>
                        </div>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};
export default Followers;