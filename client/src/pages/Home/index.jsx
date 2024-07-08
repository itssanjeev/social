import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loaderSlice';
import { getCurrentUser } from '../../apicall/userApi';
import { setUser } from '../../redux/userSlice';
import { Row, Col, Card } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../../component/Spinner';
import { getAllPost, postLike, postDistLike } from '../../apicall/postApi';
import { followUser } from '../../apicall/userApi';

const Likes = lazy(() => import('../Interaction/Likes/Likes'));
const DisLikes = lazy(() => import('../Interaction/DisLikes/DisLikes'));
const Comment = lazy(() => import('../Interaction/Comments/index'));
const FilterByTopics = lazy(() => import('../Filter/FilterByTopics'));
const Share = lazy(() => import('../Interaction/Share/Share'));

const Index = () => {
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [currentUsers, setCurrentUsers] = useState(null);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getCurrentUsersFun = async () => {
        try {
            dispatch(setLoader(true));
            const currentUser = await getCurrentUser();
            setCurrentUsers(currentUser.data);
            if (currentUser.success === false) {
                navigate("/login");
            }
            if (currentUser.data.role === 'admin') {
                navigate('/admin');
            }
            dispatch(setUser(currentUser.data));
        } catch (error) {
            // Handle error
        } finally {
            dispatch(setLoader(false));
            setLoading(false); // Ensure loading state is updated after fetching user data
        }
    }

    const getAllPostFunction = async () => {
        try {
            dispatch(setLoader(true));
            let data = await getAllPost(page);
            data = data.data;
            if (data.length > 0) {
                setPosts([...posts, ...data]);
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            // Handle error
        } finally {
            dispatch(setLoader(false));
        }
    }

    const currentUser = useSelector((state) => state.users.user);

    const followUserFun = async (values) => {
        try {
            dispatch(setLoader(true));
            const response = await followUser({ userIdToFollow: values });
            dispatch(setLoader(false));
            dispatch(setUser(response.data));
        } catch (error) {
            // Handle error
        }
    }

    const showFollowButton = (id) => {
        let flag = false;
        if (currentUser._id === id) {
            flag = true;
        }
        for (let i = 0; i < currentUser.following.length; i++) {
            if (currentUser.following[i] === id) {
                flag = true;
            }
        }
        return !flag;
    }

    const handleClickLike = async (userId, postId, index) => {
        const result = await postLike({ userId, postId });
        if (result.success) {
            const postLiked = [...posts];
            postLiked[index].likes.push(currentUsers);
            setPosts(postLiked);
            if (result.alreadyDisLiked) {
                handleClickDisLike(userId, postId, index);
            }
        } else {
            const postLiked = [...posts];
            postLiked[index].likes.pop();
            setPosts(postLiked);
        }
    }

    const handleClickDisLike = async (userId, postId, index) => {
        try {
            const result = await postDistLike({ userId, postId });
            if (result.success) {
                const postLiked = [...posts];
                postLiked[index].dislikes.push(currentUsers._id);
                setPosts(postLiked);
                if (result.alreadyLiked) {
                    handleClickLike(userId, postId, index);
                }
            } else {
                const postLiked = [...posts];
                postLiked[index].dislikes.pop();
                setPosts(postLiked);
            }
        } catch (error) {
            // Handle error
        }
    }

    const handleVisitProfile = (id) => {
        localStorage.setItem('otherUserId', id);
        const currentUserId = localStorage.getItem('currentUserId');
        navigate(currentUserId === id ? '/profile' : '/OthersProfile');
    }

    const handleTopLikesIn7Day = () => navigate('/topPostInLastWeek');
    const handleMostLikedPost = () => navigate('/allTimeHighestRatedPost');
    const handleMostEngagingPost = () => navigate('/LeadingInComments');

    useEffect(() => {
        const fetchData = async () => {
            await getCurrentUsersFun();
            await getAllPostFunction();
        }
        fetchData();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
            <Row>
                <Col xs={0} sm={0} md={6} lg={6} xl={6} className='w-full bg-slate-50'>
                    <div className='bg-slate-200 m-3'>
                        <Suspense fallback={<Spinner />}>
                            <FilterByTopics setPosts={setPosts} />
                        </Suspense>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className='w-full bg-slate-50 overflow-y-scroll h-screen mb-2' id="scrollableDiv">
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={getAllPostFunction}
                            hasMore={hasMore}
                            loader={<Spinner />}
                            scrollableTarget="scrollableDiv"
                        >
                            {posts && posts.map((post, index) => (
                                <div className='border-spacing-2 border-black flex items-center justify-center flex-col mb-5' key={post._id}>
                                    <div className='w-full h-14 border-2 border-black bg-slate-200 flex flex-row'>
                                        <div className='flex flex-col'>
                                            <div className='flex flex-row'>
                                                <p className='font-mono text-2xl ml-1 font-bold cursor-pointer' onClick={() => handleVisitProfile(post.user._id)}>{post.user?.username}</p>
                                                {showFollowButton(post.user?._id) && (
                                                    <p className='cursor-pointer ml-2 text- flex items-center' onClick={() => followUserFun(post.user._id)}>follow</p>
                                                )}
                                            </div>
                                        </div>
                                        <p className='ml-5 text-2xl flex items-center'>{post.title || null}</p>
                                    </div>
                                    <img className='w-full h-[600px] sm:min-h[400px]' src={post.content} alt="" />
                                    <div className='w-full h-20 border-2 border-black bg-slate-200 flex flex-row justify-between items-center'>
                                        <Suspense fallback={<Spinner />}>
                                            <Likes userId={currentUser._id} postId={post._id} initialLike={post.likes} getAllPostFunction={getAllPostFunction} handleClickLike={handleClickLike} index={index} />
                                            <DisLikes userId={currentUser._id} postId={post._id} initialDisLike={post.dislikes} getAllPostFunction={getAllPostFunction} handleClickDisLike={handleClickDisLike} index={index} />
                                            <Comment userId={currentUser._id} postId={post._id} comment={post.comment} />
                                            {/* <Share /> */}
                                        </Suspense>
                                    </div>
                                </div>
                            ))}
                        </InfiniteScroll>
                        <div className="h-[50px]"></div>
                    </div>
                </Col>
                <Col xs={0} sm={0} md={6} lg={6} xl={6} className='w-full bg-slate-50 flex justify-center'>
                    <div className='flex flex-col space-y-5'>
                        <div className='mt-2 cursor-pointer' onClick={handleTopLikesIn7Day}>
                            <Card title="Last week's top post" bordered={false} style={{ width: 250 }}>
                                <p className='cursor-pointer'>#TopPost#WeekInReview</p>
                            </Card>
                        </div>
                        <div className='cursor-pointer' onClick={handleMostLikedPost}>
                            <Card title="The all-time highest-rated post" bordered={false} style={{ width: 250 }}>
                                <p className='cursor-pointer'>#TopPostLikePost</p>
                            </Card>
                        </div>
                        <div className='cursor-pointer' onClick={handleMostEngagingPost}>
                            <Card title="Most engaging post" bordered={false} style={{ width: 250 }}>
                                <p className='cursor-pointer'>#MostEngagingPost</p>
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Index;
