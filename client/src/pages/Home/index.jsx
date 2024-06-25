import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loaderSlice';
import { getCurrentUser } from '../../apicall/userApi';
import { setUser } from '../../redux/userSlice';
import { Row, Col } from 'antd';
import { getAllPost } from '../../apicall/postApi';
import { followUser } from '../../apicall/userApi';
import Likes from '../Interaction/Likes/Likes';
import DisLikes from '../Interaction/DisLikes/DisLikes';
import Comment from '../Interaction/Comments/index';
import FilterByTopics from '../Filter/FilterByTopics';
import Share from '../Interaction/Share/Share';
import { Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../component/Spinner';
import { postLike } from '../../apicall/postApi';
import { postDistLike } from '../../apicall/postApi';


const index = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState();


    const dispatch = useDispatch();
    const navigate = useNavigate();
    /**
     * The function getCurrentUsersFun fetches the current user data, checks for admin role, and handles
     * navigation based on the user's role.
     */
    const getCurrentUsersFun = async () => {
        try {
            dispatch(setLoader(true));
            const currentUser = await getCurrentUser();
            // console.log(currentUser.data);
            setCurrentUsers(currentUser.data);
            if (currentUser.success === false) {
                navigate("/login");
            }
            if (currentUser.data.role === 'admin') {
                navigate('/admin');
            }
            dispatch(setUser(currentUser.data));
            dispatch(setLoader(false));
        } catch (error) {
            // console.log(error.message);

        }
    }
    /**
     * The function `getAllPostFunction` asynchronously fetches posts, updates state based on the
     * response, and handles errors.
     */
    const getAllPostFunction = async () => {
        // console.log(page);
        try {
            dispatch(setLoader(true));
            // console.log(page);
            let data = await getAllPost(page);
            data = data.data;
            // console.log(data);
            if (data.length > 0) {
                setPosts([...posts, ...data]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
            dispatch(setLoader(false));
        } catch (error) {
            // console.log(error.message);
        }
    }

    /* The above code is using the `useSelector` hook from the React-Redux library to access the `user`
    property from the `users` slice of the Redux state. It is then assigning the value of
    `state.users.user` to the `currentUser` variable. */
    const currentUser = useSelector((state) => state.users.user);

    // console.log(currentUser);
    /**
     * The `followUserFun` function is an asynchronous function that dispatches actions to follow a user
     * and update the user state based on the response.
     */
    const followUserFun = async (values) => {
        try {
            dispatch(setLoader(true));
            const response = await followUser({ userIdToFollow: values });
            // console.log(response);
            dispatch(setLoader(false));
            // console.log(response.data);
            dispatch(setUser(response.data));
        } catch (error) {
            // console.log(error);
        }
    }

    /**
     * The function `showFollowButton` checks if the current user is the owner of a post or is already
     * following the user with the given ID, and returns a boolean value accordingly.
     * @returns The `showFollowButton` function returns a boolean value. If the conditions in the
     * function are met, it returns `false`, otherwise it returns `true`.
     */
    const showFollowButton = (id) => {
        let flag = false;
        //ye toh khud ka post id check karne ke liye hai
        if (currentUser._id === id) {
            flag = true;
        }
        //ye yah check karne ke liye hai agar currentUser already follow karta hai kya
        for (let i = 0; i < currentUser.following.length; i++) {
            if (currentUser.following[i] === id) {
                flag = true;
            }
        }
        if (flag) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * The function `handleClickLike` asynchronously adds a user's like to a post and updates the posts
     * state accordingly.
     */
    const handleClickLike = async (userId, postId, index) => {
        // console.log('click on like');
        const result = await postLike({ userId: userId, postId: postId })
        if (result.success) {
            // console.log(posts);
            // console.log(index);
            const postLiked = [...posts];
            postLiked[index].likes.push(currentUsers);
            setPosts(postLiked);
            // console.log(postLiked);
        }
    }

    /**
     * The handleClickDisLike function asynchronously adds a user to the dislikes list of a post and
     * updates the posts state if successful.
     */
    const handleClickDisLike = async (userId, postId, index) => {
        try {
            const result = await postDistLike({ userId: userId, postId: postId })
            // console.log(result.data);
            // console.log(userId, 'user');
            // console.log(initialDisLike);
            if (result.success) {
                // console.log(posts);
                // console.log(index);
                const postLiked = [...posts];
                postLiked[index].dislikes.push(currentUsers);
                // console.log(postLiked);
                setPosts(postLiked);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    /**
     * This function sets the other user's ID in local storage and navigates to either the current
     * user's profile or the other user's profile based on the comparison of IDs.
     */
    const handleVisitProfile = (id) => {
        localStorage.setItem('otherUserId', id);
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId === id) {
            navigate('/profile');
        } else {
            navigate('/OthersProfile');
        }
    }
    /**
     * The function `handleTopLikesIn7Day` navigates to the '/topPostInLastWeek' page.
     */
    const handleTopLikesIn7Day = () => {
        navigate('/topPostInLastWeek')
    }
    /**
     * The function `handleMostLikedPost` navigates to the page displaying the all-time highest rated
     * post.
     */
    const handleMostLikedPost = () => {
        navigate('/allTimeHighestRatedPost')
    }
    /**
     * The function `handleMostEngagingPost` navigates to the '/LeadingInComments' page.
     */
    const handleMostEngagingPost = () => {
        navigate('/LeadingInComments')
    }
    /* The above code is using the `useEffect` hook in a React component to call two different
    functions when the component mounts. The first `useEffect` hook is calling the
    `getCurrentUsersFun` function, and the second `useEffect` hook is calling the
    `getAllPostFunction` function. Both functions are being called with an empty dependency array
    `[]`, which means they will only be called once when the component mounts. */
    useEffect(() => {
        getCurrentUsersFun();
    }, [])
    useEffect(() => {
        getAllPostFunction();
    }, []);

    return (
        <div className=''>
            <Row className=''>
                {/* this is for showing filter post */}
                <Col xs={0} sm={0} md={6} lg={6} xl={6} className='w-full bg-slate-50'>
                    <div className='bg-slate-200 m-3'>
                        <FilterByTopics setPosts={setPosts}></FilterByTopics>
                    </div>
                </Col>
                {/* main content */}
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className=''>
                        <div className='w-full bg-slate-50 overflow-y-scroll h-screen mb-2' id="scrollableDiv">
                            <InfiniteScroll
                                dataLength={posts.length}
                                next={getAllPostFunction}
                                hasMore={hasMore}
                                loader={<Spinner></Spinner>}
                                scrollableTarget="scrollableDiv"
                            >
                                {
                                    posts &&
                                    posts.map((post, index) => (
                                        <div className=' border-spacing-2 border-black flex items-center justify-center flex-col mb-5' key={post._id}>
                                            <div className='w-full h-14 border-2 border-black bg-slate-200 flex flex-row  '>
                                                <div className='flex flex-col'>
                                                    <div className='flex flex-row'>
                                                        <p className='font-mono text-2xl ml-1 font-bold cursor-pointer ' onClick={() => handleVisitProfile(post.user._id)}>{post.user?.username}</p>
                                                        {
                                                            showFollowButton(post.user?._id) ? <p className='cursor-pointer ml-2 text- flex items-center'
                                                                onClick={() => followUserFun(post.user._id)}
                                                            >follow</p> : null
                                                        }

                                                    </div>
                                                </div>
                                                <p className='ml-5 text-2xl flex items-center'>{post.title ? post.title : null}</p>
                                            </div>
                                            <img className='w-full h-[600px] sm:min-h[400px]' src={post.content} alt="" />
                                            <div className='w-full h-20 border-2 border-black bg-slate-200 flex flex-row justify-between items-center'>
                                                <Likes userId={currentUser._id} postId={post._id} initialLike={post.likes} getAllPostFunction={getAllPostFunction} handleClickLike={handleClickLike} index={index}></Likes>
                                                <DisLikes userId={currentUser._id} postId={post._id} initialDisLike={post.dislikes} getAllPostFunction={getAllPostFunction} handleClickDisLike={handleClickDisLike} index={index}></DisLikes>
                                                <Comment userId={currentUser._id} postId={post._id} comment={post.comment} ></Comment>
                                                {/* <Share></Share> */}
                                            </div>
                                        </div>
                                    ))
                                }
                            </InfiniteScroll>
                            <div className="h-[50px]"></div>
                        </div>
                    </div>
                </Col>
                {/* this is for showing most recent post */}
                <Col xs={0} sm={0} md={6} lg={6} xl={6} className='w-full bg-slate-50 flex justify-center'>
                    <div className='flex flex-col space-y-5 '>
                        <div className='mt-2 cursor-pointer'
                            onClick={handleTopLikesIn7Day}
                        >
                            <Card
                                title="Last week's top post"
                                bordered={false}
                                style={{
                                    width: 250,
                                }}
                            >
                                <p className='cursor-pointer'

                                >#TopPost#WeekInReview</p>

                            </Card>
                        </div>
                        <div className='cursor-pointer'
                            onClick={handleMostLikedPost}
                        >
                            <Card
                                title="The all-time highest-rated post"
                                bordered={false}
                                style={{
                                    width: 250,
                                }}
                            >
                                <p className='cursor-pointer '>#TopPostLikePost</p>

                            </Card>
                        </div>
                        <div className='cursor-pointer'
                            onClick={handleMostEngagingPost}
                        >
                            <Card
                                title="Leading in comments"
                                bordered={false}
                                style={{
                                    width: 250,
                                }}
                            >
                                <p className='cursor-pointer '>#TopEngagingPost</p>
                            </Card>
                        </div>
                    </div>

                </Col>

            </Row>
        </div>
    )
}

export default index;