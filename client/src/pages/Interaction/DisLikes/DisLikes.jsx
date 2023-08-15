import React, { useEffect, useState } from 'react'
import { postDistLike } from '../../../apicall/postApi';
import { useNavigate } from 'react-router-dom';
// import { Button, Modal } from 'antd';
// import { Avatar, Divider, List, Skeleton } from 'antd';
// import InfiniteScroll from 'react-infinite-scroll-component';

const DisLikes = ({ userId, postId, initialDisLike }) => {
    // const navigate = useNavigate();
    const [disLikes, SetDisLikes] = useState(initialDisLike);
    // const [open, setOpen] = useState(false);

    const handleClick = async () => {
        try {
            const result = await postDistLike({ userId: userId, postId: postId })
            console.log(result.data);
            if (result.success) {
                SetDisLikes([...disLikes, result.data.dislikes]);
                console.log(DisLikes);
            }
        } catch (error) {
            console.log(error);
        }

    }
    // const handleVisitProfile = (id) => {
    //     localStorage.setItem('otherUserId', id);
    //     const currentUserId = localStorage.getItem('currentUserId');
    //     if (currentUserId === id) {
    //         navigate('/profile');
    //     } else {
    //         navigate('/OthersProfile');
    //     }
    // }
    // const renderLikedUsers = () => {
    //     return (
    //         <div
    //             id="scrollableDiv"
    //             style={{

    //                 overflow: 'auto',
    //                 padding: '0 16px',
    //                 border: '1px solid rgba(140, 140, 140, 0.35)',
    //             }}
    //             className='h-screen bg-sky-100'
    //         >

    //             <InfiniteScroll
    //                 dataLength={likes.length}
    //                 hasMore={likes.length < likes.length}
    //                 loader={
    //                     <Skeleton
    //                         avatar
    //                         paragraph={{
    //                             rows: 1,
    //                         }}
    //                         active
    //                     />
    //                 }
    //                 endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
    //                 scrollableTarget="scrollableDiv"
    //             >
    //                 <List
    //                     dataSource={likes}
    //                     renderItem={(item) => (
    //                         <div className='cursor-pointer'>
    //                             <List.Item key={item._id}>
    //                                 <List.Item.Meta
    //                                     avatar={<Avatar src={item.profilePicture
    //                                     } />}
    //                                     title={<div >{item.name}</div>}
    //                                     description={item.username}
    //                                 />
    //                                 <div>Content</div>
    //                             </List.Item>
    //                         </div>
    //                     )}
    //                 />
    //             </InfiniteScroll>
    //         </div>
    //     );
    // }
    return (
        <div className='flex flex-col' onClick={handleClick}>
            <i className="ml-7 mr-7 text-5xl ri-thumb-down-line cursor-pointer"></i>
            <div className='flex justify-center font-bold cursor-pointer' >{disLikes ? disLikes.length : 0} likes</div>
            <div>
                {/* <Modal
                    title="post Liked by"
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    className='w-full bg-slate-400'
                >
                    {renderLikedUsers()}
                </Modal> */}
            </div>
        </div>
    )
}

export default DisLikes;