import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loaderSlice';
import { getCurrentUser } from '../../apicall/userApi';
import { setUser } from '../../redux/userSlice';
import { Row, Col } from 'antd';

const index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCurrentUsers = async () => {
        try {
            // console.log(user);
            dispatch(setLoader(true));
            const data = await getCurrentUser();
            console.log(data.data);
            dispatch(setUser(data.data));
            dispatch(setLoader(false));
        } catch (error) {
            console.log(error.message);
        }
    }
    const currentUser = useSelector((state) => state.users.user);
    console.log(currentUser);
    +

        useEffect(() => {
            const fetchData = async () => {
                await getCurrentUsers();
            };
            fetchData();
        }, []);
    return (
        <div className=''>
            <Row>
                {/* this is for showing post of user */}
                <Col span={12}>
                    <div className='w-full bg-slate-50'>
                        {
                            posts &&
                            posts.map((post) => (
                                <div className=' border-spacing-2 border-black flex items-center justify-center flex-col mb-5' key={post._id}>
                                    <div className='w-full h-14 border-2 border-black bg-slate-200 flex flex-row  '>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row'>
                                                <p className='font-mono text-2xl ml-1 font-bold cursor-pointer '>{post.user.username}</p>
                                                {
                                                    showFollowButton(post.user._id) ? <p className='cursor-pointer ml-2 text- flex items-center'
                                                        onClick={() => followUserFun(post.user._id)}
                                                    >follow</p> : null
                                                }

                                            </div>
                                        </div>
                                        <p className='ml-5 text-2xl flex items-center'>{post.title ? post.title : null}</p>

                                    </div>
                                    <img className='w-full h-[600px]' src={post.content} alt="" />
                                    <div className='w-full h-20 border-2 border-black bg-slate-200 flex flex-row justify-between items-center'>
                                        <i className="ml-7 mr-7 text-5xl ri-thumb-up-line"></i>
                                        <i className="ml-7 mr-7 text-5xl ri-thumb-down-line"></i>
                                        <i className="ml-7 mr-7 text-5xl ri-discuss-line"></i>
                                        <i className="ml-7 mr-7 text-5xl ri-share-fill"></i>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </Col>
                {/* this is for showing post comments */}
                <Col span={12} className='w-full bg-green-700'>

                </Col>

            </Row>
        </div>
    )
}

export default index;