import React, { useEffect, useState } from 'react'
// import { postDistLike } from '../../../apicall/postApi';


const DisLikes = ({ userId, postId, initialDisLike, index, handleClickDisLike }) => {
    const [showDisLike, setShowDislike] = useState(true);

    const alreadyDisLike = () => {
        const found = initialDisLike.some(dli => dli === userId);
        setShowDislike(found);
        // console.log(userId);
        // console.log(initialDisLike);
    }

    useEffect(() => {
        alreadyDisLike();
    }, [handleClickDisLike, initialDisLike]);
    return (
        <div className='flex flex-col ' onClick={() => handleClickDisLike(userId, postId, index)}>{
            showDisLike ? <i className='ri-thumb-down-fill ml-7 mr-7 cursor-pointer text-5xl' ></i> : <i className=" ri-thumb-down-line  ml-7 mr-7 cursor-pointer text-5xl"></i>
        }
            <div className='flex justify-center font-bold cursor-pointer' >{initialDisLike ? initialDisLike.length : 0} dislikes</div>
            <div>
            </div>
        </div>
    )
}

export default DisLikes;