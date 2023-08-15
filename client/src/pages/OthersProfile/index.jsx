import { Button, Row, Col, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loaderSlice';
import Devider from '../../component/Devider';
import { getOtherUser } from '../../apicall/otherUserApi';
import { setOtherUser } from '../../redux/otherUserSlice';
import { getOtherUserPost } from '../../apicall/otherPost';
const index = () => {
    const [userPost, setUserPost] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getOtherUserFun = async () => {
        const id = localStorage.getItem('otherUserId');
        const data = await getOtherUser({ otherUserId: id });
        // console.log(data.data);
        dispatch(setOtherUser(data.data));
    }
    const otherUser = useSelector((state) => state.otherUsers.otherUser);
    // console.log(otherUser);

    const getUserPostFun = async () => {
        try {
            dispatch(setLoader(true));
            const id = localStorage.getItem('otherUserId');
            const data = await getOtherUserPost({ otherUserId: id });
            console.log(data.data);
            dispatch(setLoader(false));
            setUserPost(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    const vistFollowers = (id) => {
        localStorage.setItem('followerId', id);
        navigate('/followers');
    }
    const vistFollowing = (id) => {
        localStorage.setItem('followingId', id);
        navigate('/following');
    }

    useEffect(() => {
        const fetchData = async () => {
            await getUserPostFun();
        }
        fetchData();
    }, []);

    useEffect(() => {
        getOtherUserFun();
    }, [])
    return (
        otherUser &&
        (
            <div>
                <Row className='bg-sky-50 h-screen'>
                    <Col className='border-r-2 border-red-600' xs={24} sm={24} md={24} lg={10} xl={10}>
                        <div className='flex flex-col'>
                            <div className='flex items-center justify-center flex-col mt-2'>
                                {
                                    otherUser.profilePicture ? (<img src={otherUser.profilePicture} className='border-2 border-t-black rounded-full w-28 h-28' alt='otherUser picture'></img>) : (
                                        <div className='border-2 border-t-black rounded-full bg-gray-400 w-28 h-28 flex items-center justify-center' >
                                            <div>image</div>
                                        </div>
                                    )
                                }
                                <div>{otherUser.name}</div>
                            </div>
                            <div className='flex flex-row space-x-4 items-center justify-center'>
                                <div className='flex flex-col space-y-1 justify-center items-center'>
                                    <div>{otherUser.posts.length}</div>
                                    <div>posts</div>
                                </div>
                                <div className='flex flex-col space-y-1 justify-center items-center cursor-pointer' onClick={() => vistFollowers(otherUser._id)}>
                                    <div>{otherUser.followers.length}</div>
                                    <div >followers</div>
                                </div>
                                <div className='flex flex-col space-y-1 justify-center items-center cursor-pointer' onClick={() => vistFollowing(otherUser._id)}>
                                    <div>{otherUser.following.length}</div>
                                    <div>following</div>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <div className='flex flex-col space-y-1 justify-center items-center'>
                                    <p className='text-3xl text-gray-800'>{otherUser.bio}</p>
                                </div>
                            </div>
                            <div className=' mt-5 flex flex-row justify-center'>
                                <div className='bg-gray-600 h-8 text-2xl  rounded-md cursor-pointer text-sky-100' >Message</div>
                                <div className='bg-gray-600 h-8 text-2xl ml-3 rounded-md cursor-pointer text-sky-100'>follow</div>
                            </div>
                            <Devider className='mt-8'></Devider>
                            <div>
                                <div className='flex flex-col space-y-1 justify-center items-center '>
                                    <div className='text-xl'>Post Liked &nbsp;({otherUser.postLiked?.length})</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col offset={0} xs={0} sm={0} md={0} lg={10} xl={14} className='bg-sky-50'>
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