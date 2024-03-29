import React, { useEffect, useState } from 'react'
import { postDistLike } from '../../../apicall/postApi';


const DisLikes = ({ userId, postId, initialDisLike, getAllPostFunction, index, handleClickDisLike }) => {


    const alreadyDisLike = () => {
        let flag = false;
        // console.log(userId);
        initialDisLike.forEach(dli => {
            if (dli === userId) {
                flag = true;
                // console.log(flag);
            }
        })
        if (flag) {
            return true;
        } else {
            return false;
        }
    }
    return (
        <div className='flex flex-col ' onClick={() => handleClickDisLike(userId, postId, index)}>{
            alreadyDisLike() ? <i className='ri-thumb-down-line ml-7 mr-7 cursor-pointer text-5xl' ></i> : <i className="  ri-thumb-down-line  ml-7 mr-7 cursor-pointer text-5xl"></i>
        }
            <div className='flex justify-center font-bold cursor-pointer' >{initialDisLike ? initialDisLike.length : 0} dislikes</div>
            <div>
            </div>
        </div>
    )
}

export default DisLikes;