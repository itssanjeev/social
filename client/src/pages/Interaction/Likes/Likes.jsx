import React, { useEffect, useState } from 'react'
import { postLike } from '../../../apicall/postApi';
import { Modal } from 'antd';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

const Likes = ({ userId, postId, initialLike, getAllPostFunction }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleClick = async () => {
        console.log('click on like');
        const result = await postLike({ userId: userId, postId: postId })
        if (result.success) {
            getAllPostFunction();
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

    const alreadyLike = () => {
        let flag = false;
        initialLike.forEach(li => {
            if (li._id === userId) {
                flag = true;
            }
        })
        if (flag) {
            return true;
        } else {
            return false;
        }
    }

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
                    dataLength={initialLike.length}
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
                        dataSource={initialLike}
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
                    alreadyLike() ? <i className='ri-thumb-up-fill' ></i> : <i className='ri-thumb-up-line'></i>

                }
            </div>
            <div className='flex justify-center font-bold cursor-pointer mt-2' onClick={() => setOpen(true)}>{initialLike ? initialLike.length : 0} likes</div>
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