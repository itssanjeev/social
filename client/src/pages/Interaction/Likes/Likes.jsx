import React, { useEffect, useState } from 'react'
import { postLike } from '../../../apicall/postApi';
import { Modal } from 'antd';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const Likes = ({ userId, postId, initialLike }) => {
    const navigate = useNavigate();
    const [likes, SetLikes] = useState(initialLike);
    const [open, setOpen] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    const handleClick = async () => {
        const result = await postLike({ userId: userId, postId: postId })
        // console.log(result.data);
        if (result.success) {
            setAlreadyLiked(!alreadyLiked);
            const updatedLikes = [...likes, result.data.likes]
            // console.log(updatedLikes);
            SetLikes(updatedLikes);
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
    useEffect(() => {
        setAlreadyLiked(initialLike.some(l => l._id === userId));
    }, [likes])
    const renderLikedUsers = () => {
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
                    dataLength={likes.length}
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
                        dataSource={likes}
                        renderItem={(item) => (
                            <div className='cursor-pointer' onClick={() => handleVisitProfile(item._id)}>
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
    }
    return (
        <div className='flex flex-col' onClick={handleClick}>
            <div className='ml-7 mr-7 text-5xl cursor-pointer'>
                {
                    alreadyLiked ? <i className='ri-thumb-up-fill' >{console.log(alreadyLiked)}</i> : <i className='ri-thumb-up-line'>{console.log(alreadyLiked)}</i>

                }
            </div>
            <div className='flex justify-center font-bold cursor-pointer mt-2' onClick={() => setOpen(true)}>{likes ? likes.length : 0} likes</div>
            <div>
                <Modal
                    title="post Liked by"
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    className='w-full bg-slate-400'
                >
                    {renderLikedUsers()}
                </Modal>
            </div>
        </div>
    )
}

export default Likes