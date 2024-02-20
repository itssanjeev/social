import { Button, Row, Col, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loaderSlice';
import Devider from '../../component/Devider';
import { getCurrentUser } from '../../apicall/userApi';
import { setUser } from '../../redux/userSlice';
import { getUserPost, postsLikedByCurrentUserApi } from '../../apicall/postApi';

const index = () => {
    const [userPost, setUserPost] = useState([]);
    const [postLikedByUser, setPostLikedByuser] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCurrentUserFun = async () => {
        const data = await getCurrentUser();
        dispatch(setUser(data.data));
    }
    const currentUser = useSelector((state) => state.users.user);
    // console.log(currentUser);


    const getUserPostFun = async () => {
        try {
            dispatch(setLoader(true));
            const data = await getUserPost();
            dispatch(setLoader(false));
            setUserPost(data.data);
            // console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            await getUserPostFun();
        }
        fetchData();
    }, []);

    const vistFollowers = (id) => {
        console.log(id);
        localStorage.setItem('followerId', id);
        navigate('/followers');
    }

    const visitFollowing = (id) => {
        localStorage.setItem('followingId', id);
        navigate('/following');
    }

    const postsLikedByCurrentUser = async () => {
        try {
            dispatch(setLoader(true));
            const data = await postsLikedByCurrentUserApi();
            console.log(data.data.data);
            setPostLikedByuser(data.data.data);
            dispatch(setLoader(false));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        postsLikedByCurrentUser();
    }, [])

    useEffect(() => {
        getCurrentUserFun();
    }, [])
    return (
        currentUser &&
        (
            <div>
                <Row className='bg-sky-50 h-screen'>
                    <Col className='border-r-2 border-red-600' xs={24} sm={24} md={24} lg={10} xl={10}>
                        <div className='flex flex-col'>
                            <div className='flex items-center justify-center flex-col mt-2'>
                                {
                                    currentUser.profilePicture ? (<img src={currentUser.profilePicture} className='border-2 border-t-black rounded-full w-28 h-28' alt='currentUser picture'></img>) : (
                                        <div className='border-2 border-t-black rounded-full bg-gray-400 w-28 h-28 flex items-center justify-center' >
                                            <div>image</div>
                                        </div>
                                    )
                                }
                                <div>{currentUser.name}</div>
                            </div>
                            <div className='flex flex-row space-x-4 items-center justify-center'>
                                <div className='flex flex-col space-y-1 justify-center items-center'>
                                    <div>{currentUser.posts.length}</div>
                                    <div>posts</div>
                                </div>
                                <div className='flex flex-col space-y-1 justify-center items-center cursor-pointer' onClick={() => vistFollowers(currentUser._id)}>
                                    <div>{currentUser.followers.length}</div>
                                    <div >followers</div>
                                </div>
                                <div className='flex flex-col space-y-1 justify-center items-center cursor-pointer' onClick={() => visitFollowing(currentUser._id)}>
                                    <div>{currentUser.following.length}</div>
                                    <div>following</div>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <div className='flex flex-col space-y-1 justify-center items-center'>
                                    <p className='text-3xl text-gray-800'>{currentUser.bio}</p>
                                </div>
                            </div>
                            <div className=' mt-5 flex flex-row w-full  justify-center'>
                                <div className=' bg-gray-600 h-8 text-2xl rounded-md cursor-pointer w-3/4 text-center' onClick={() => navigate("/editProfile")}>Edit</div>
                            </div>
                            <Devider className='mt-8'></Devider>
                            <div>
                                <div className='flex flex-col space-y-1 justify-center items-center '>
                                    <div className='text-2xl font-semibold flex justify-center'>Post Liked &nbsp;({postLikedByUser.length})
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 m-2 overflow-y-auto">
                                        {
                                            postLikedByUser?.map((post) => (
                                                <div className="flex items-center justify-center min-w-50 min-h-50 max-w-100 max-h-100 bg-blue-900 cursor-pointer" key={post._id}>
                                                    <img src={post.content} alt="" className='w-full h-full' />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col offset={0} xs={0} sm={0} md={0} lg={10} xl={14}>
                        <div className=' mr-1 border-solid border-black h-screen'>
                            <div className="grid grid-cols-4 gap-4">
                                {
                                    userPost?.map((post) => (
                                        <div className="flex items-center justify-center min-w-50 min-h-50 max-w-100 max-h-100 bg-blue-900" key={post._id}>
                                            <img src={post.content} alt="" className='w-full h-full' />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
                <div>
                </div>
            </div>
        )
    )
}

export default index;