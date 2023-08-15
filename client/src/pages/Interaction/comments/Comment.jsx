import React, { useEffect } from 'react'
import { Modal } from 'antd';
import { useState } from 'react';
import { commentOnPost } from '../../../apicall/postApi';

const Comment = ({ userId, postId, comment }) => {
    const [open, setOpen] = useState(false);
    const [userComment, setUserComments] = useState({});
    const [existingComment, setExistingComment] = useState()
    const handleClick = () => {
        setExistingComment(comment);
        setOpen(true)
        console.log(comment);
    }
    const handleComment = (e) => {
        console.log(e.target.value);
        setUserComments({
            ...userComment, data: e.target.value
        })
    }
    const commentFun = async () => {
        try {
            // console.log(comments.data);
            const result = await commentOnPost({ comment: userComment.data, userId: userId, postId: postId });
            console.log(result);
        } catch (error) {
            console.log(error);
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
                    className='w-full bg-slate-400 h-screen'
                >

                    <div className='flex flex-row fixed bottom-1 justify-center sm:min-w-[480px] min-w-[300px]'>
                        <textarea type="text" placeholder='write something' className='h-14 w-full' onChange={handleComment} />
                        <div className='bg-slate-400 cursor-pointer' onClick={commentFun}>comment</div>
                    </div>

                </Modal>
            </div>
        </div>
    )
}

export default Comment;