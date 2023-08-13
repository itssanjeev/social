import React, { useState } from 'react'
import { postLike } from '../../../apicall/postApi';

const Likes = ({ userId, postId }) => {
    const [likes, SetLikes] = useState([]);
    const handleClick = async () => {
        const result = await postLike({ userId: userId, postId: postId })
        if (result.success) {
            SetLikes(result.data.likes);
        }
        console.log(result.data);
    }

    return (
        <div className='flex flex-col' onClick={handleClick}>
            <i className="ml-7 mr-7 text-5xl ri-thumb-up-line cursor-pointer"></i>
            <div className='flex justify-center font-bold cursor-pointer'>{likes ? likes.length : 0} likes</div>
        </div>
    )
}

export default Likes