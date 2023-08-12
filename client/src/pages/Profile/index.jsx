import { Button, Row, Col, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loaderSlice';
import Devider from '../../component/Devider';
import { getCurrentUser } from '../../apicall/userApi';
import { setUser } from '../../redux/userSlice';
import { getUserPost } from '../../apicall/postApi';
const index = () => {
    const [userPost, setUserPost] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCurrentUserFun = async () => {
        const data = await getCurrentUser();
        dispatch(setUser(data.data));
    }
    const currentUser = useSelector((state) => state.users.user);
    console.log(currentUser);


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

    useEffect(() => {
        getCurrentUserFun();
    }, [])
    return (
        currentUser &&
        (
            <div>
                <Row>
                    <Col span={6} className='border-r-2 border-red-600'>
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
                            <div className='ml-12 mt-5'>
                                <Button className='bg-zinc-300 shadow-lg w-3/4' onClick={() => navigate("/editProfile")}>Edit Profile</Button>
                            </div>
                            <Devider className='mt-8'></Devider>
                            <div>
                                <div className='flex flex-col space-y-1 justify-center items-center '>
                                    <div className='text-xl'>Post Liked &nbsp;({currentUser.postLiked.length})</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col span={14} offset={4}>
                        <div className='bg-gray-100 mr-1 border-solid border-black h-screen'>
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