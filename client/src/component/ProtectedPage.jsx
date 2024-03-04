import { Col, Row, notification } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../apicall/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
// import socket from '../socket/Socket';
import { getNotificationApi } from '../apicall/notificationApi';
import { setNotification } from '../redux/notificationSlice';
import image from '../assets/logo1.ico';
import { Tooltip } from 'antd'

const ProtectedPage = ({ children }) => {
    let currentUserId = localStorage.getItem('currentUserId');
    const [currentUser, setCurrentUser] = useState();
    const [toggleMenu, setToggleMenu] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const currentUserFun = async () => {
        const data = await getCurrentUser();
        if (!currentUserId) {
            navigate('/login');
            return;
        } else {
            setCurrentUser(data.data);
            dispatch(setUser(data.data));
        }
        // localStorage.setItem('currentUserId', data.data._id);

    }
    useEffect(() => {
        currentUserFun();
    }, []);


    /*------------------------------------notification part from here----------------------------*/
    const [countNotification, setCountNotification] = useState(0);
    const getNotificationFun = async () => {

        try {
            const result = await getNotificationApi({ currentUserId: currentUserId });
            //console.log(location, 'protectedpage location 56');
            if (result && Array.isArray(result.data)) {
                for (const element of result?.data) {
                    if (element.read === false) {
                        setCountNotification(countNotification + 1);
                        break;
                    } else {
                        setCountNotification(0);
                    }
                };
                dispatch(setNotification(result.data));
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (location.pathname !== '/notification') {
            getNotificationFun();
        }
    }, [location]);
    return (
        currentUser &&
        <div className="h-screen overflow-hidden">
            <div className=''>
                {/* -------------------------------------for pc -----------------------------------------------*/}
                <div className="hidden sm:flex">
                    <header className=' bg-gray-200   w-full '>
                        <Row style={{ height: "50px", border: "2px solid gray" }}>
                            <Col span={6}>
                                <Row>
                                    <Col span={12}>
                                        <div className='text-2xl border-gray-400 text-red-600'><img src={image} className='w-12 h-12'></img></div>
                                    </Col>
                                    <Col span={12}>
                                        <div className='text-2xl cursor-pointer hover:text-red-400 '>
                                            <Tooltip title="upload post">
                                                <i className="ri-gallery-upload-line"
                                                    onClick={() => {
                                                        navigate('/uploadPost');
                                                    }}>
                                                </i>
                                            </Tooltip>
                                        </div>
                                    </Col>
                                </Row>

                            </Col>


                            <Col span={8} offset={2}>
                                <Row className='flex justify-between'>
                                    <Col span={6} className='flex items-center justify-center '>
                                        <Tooltip title="home">
                                            <i className="ri-home-4-line text-4xl cursor-pointer"
                                                onClick={() => {
                                                    navigate('/')
                                                }}
                                            ></i>
                                        </Tooltip>
                                    </Col>
                                    <Col span={6} className='flex items-center justify-center'>
                                        <Tooltip title="notification">

                                            <i className={`ri-notification-2-line text-4xl cursor-pointer ${countNotification > 0 ? 'text-red-700 animate-pulse' : ''}`} onClick={() => { navigate('/notification') }} ></i>
                                        </Tooltip>
                                    </Col>

                                    <Col span={6} className='flex items-center justify-center cursor-pointer'
                                        onClick={() => { navigate('/search') }}>
                                        <Tooltip title="search">
                                            <i className="ri-search-line text-4xl"></i>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={6} offset={2}>
                                <Row className='flex items-end justify-between'>
                                    <Col span={5} className='flex items-center justify-center '>
                                        <Tooltip title="message">
                                            <i className="ri-mail-line text-4xl cursor-pointer" onClick={() => {
                                                navigate('/message');
                                            }}></i>
                                        </Tooltip>
                                    </Col>
                                    <Col span={4} className=' flex items-center justify-center mr-8'>
                                        <Tooltip title="profile">

                                            <i className="ri-account-circle-fill text-4xl cursor-pointer"
                                                onClick={() => {
                                                    navigate("/profile")
                                                }}
                                            ></i>
                                        </Tooltip>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </header>
                </div>
                {/*--------------------------------------for mobile ------------------------------------------- */}
                <div className="sm:hidden">
                    <header className=' bg-gray-200   '>
                        <div className="flex ">
                            <div className="flex">
                                <div className='text-2xl border-gray-400 text-red-600'><img src={image} className='w-12 h-12'>
                                </img>
                                </div>
                                <div className='flex justify-end ml-10 space-x-9 items-center'>
                                    <div className='text-2xl cursor-pointer hover:text-red-400 '>
                                        <i className="ri-gallery-upload-line"
                                            onClick={() => {
                                                navigate('/uploadPost');
                                            }}>
                                        </i>
                                    </div>
                                    <div>
                                        <i className="ri-home-4-line text-4xl cursor-pointer"
                                            onClick={() => {
                                                navigate('/')
                                            }}
                                        ></i>
                                    </div>
                                    <div>
                                        <i className={`ri-notification-2-line text-4xl cursor-pointer ${countNotification > 0 ? 'text-red-700 animate-pulse' : ''}`} onClick={() => { navigate('/notification') }} ></i>
                                    </div>
                                </div>
                            </div>
                            <div className=" w-64"></div>
                            <div className='flex justify-end  items-center cursor-pointer'>
                                <i className="ri-menu-2-line text-5xl" onClick={() => setToggleMenu(!toggleMenu)}></i>
                            </div>
                        </div>
                        <div>
                            {
                                toggleMenu &&
                                <div className='flex flex-col space-y-1 '>
                                    <div className='flex items-center justify-center cursor-pointer'
                                        onClick={() => { navigate('/search') }}>
                                        <i className="ri-search-line text-5xl"></i>
                                        <div className='text-2xl'>Search User</div>
                                    </div>
                                    <div className='flex items-center justify-center ' onClick={() => {
                                        navigate('/message');
                                    }}>
                                        <i className="ri-mail-line text-4xl cursor-pointer" ></i>
                                        <div className='text-2xl'>Message</div>
                                    </div>
                                    <div className=' flex items-center justify-center mr-8' onClick={() => {
                                        navigate("/profile")
                                    }}>
                                        <i className="ri-account-circle-fill text-4xl cursor-pointer"></i>
                                        <div className='text-2xl'>Profile</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </header>
                </div>
                <div className=''>{children}</div>
            </div>
        </div>
    )
}

export default ProtectedPage;



