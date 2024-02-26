import React, { useEffect } from 'react'
import { Modal } from 'antd';
import { useState } from 'react';
import { commentOnPost } from '../../../apicall/postApi';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';


/**
 * @param {string} -[]
 * @descripton {userId} -[]
 *                                  
 */
const Comment = ({ userId, postId, comment }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const [userComment, setUserComments] = useState();
    const [existingComment, setExistingComment] = useState()
    const handleClick = () => {
        setExistingComment(comment);
        setOpen(true)
        console.log(comment);
    }
    const handleComment = (e) => {
        console.log(e.target.value);
        setUserComments(e.target.value)
    }
    const commentFun = async () => {
        try {
            // console.log(comments.data);
            const result = await commentOnPost({ comment: userComment, userId: userId, postId: postId });
            console.log(result.data.comment);
            setUserComments('');
            setExistingComment(result.data.comment);
        } catch (error) {
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
        <div>
            <i className="ml-7 mr-7 text-5xl ri-discuss-line cursor-pointer" onClick={handleClick}></i>
            <div>
                <Modal
                    title="commented by"
                    centered
                    open={open}
                    footer={null}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    value={userComment}
                    className='w-full bg-slate-400 h-screen'
                >
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
                            dataLength={existingComment?.length}
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
                                dataSource={existingComment}
                                renderItem={(item) => (
                                    <div className='cursor-pointer' onClick={() => handleVisitProfile(item.user._id)}>
                                        <List.Item key={item._id}>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.user.profilePicture
                                                } />}
                                                title={<div >{item.user.username}</div>}
                                                description={item.comment}
                                            />
                                        </List.Item>
                                    </div>
                                )}
                            />
                        </InfiniteScroll>
                    </div>
                    <div className='flex flex-row fixed bottom-1 justify-center sm:min-w-[480px] min-w-[300px]'>
                        <textarea type="text" placeholder='write something' className='h-14 w-full bg-sky-50' onChange={handleComment} />
                        <div className='bg-sky-50 cursor-pointer flex justify-center items-center' onClick={commentFun}><i className="ri-send-plane-2-fill w-10 text-4xl"></i></div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Comment;