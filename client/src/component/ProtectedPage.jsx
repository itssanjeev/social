import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../apicall/userApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';


const ProtectedPage = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUserFun = async () => {
        const data = await getCurrentUser();
        console.log(data.data);
        setCurrentUser(data.data);
        dispatch(setUser(data.data));
    }
    useEffect(() => {
        currentUserFun();
    }, [])
    return (
        currentUser &&
        <div className=''>
            <header className=' bg-gray-100'>
                <Row style={{ height: "50px", border: "2px solid gray" }}>
                    <Col span={6}>
                        <Row>
                            <Col span={12}>
                                <div className='text-2xl'>🫂</div>
                            </Col>
                            <Col span={12}>
                                <div className='text-2xl cursor-pointer'><i className="ri-gallery-upload-line" onClick={() => {
                                    navigate('/uploadPost');
                                }}></i></div>
                            </Col>
                        </Row>

                    </Col>


                    <Col span={8} offset={2}>
                        <Row>
                            <Col span={6} className='flex items-center justify-center '><i className="ri-home-4-line text-4xl cursor-pointer"
                                onClick={() => {
                                    navigate('/')
                                }}
                            ></i></Col>
                            <Col span={6} className='flex items-center justify-center'><i className="ri-contacts-book-2-line text-4xl"></i></Col>
                            <Col span={6} className='flex items-center justify-center'><i className="ri-notification-2-line text-4xl"></i></Col>
                            <Col span={6} className='flex items-center justify-center'>
                                <i className="ri-search-line text-4xl"></i>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} offset={2}>
                        <Row className='flex items-end justify-end'>
                            <Col span={5} className='flex items-center justify-center'><i className="ri-mail-line text-4xl"></i></Col>
                            <Col span={4} className=' flex items-center justify-center'><i className="ri-account-circle-fill text-4xl cursor-pointer"
                                onClick={() => {
                                    navigate("/profile")
                                }}
                            ></i></Col>
                        </Row>
                    </Col>
                </Row>
            </header>
            <div className=''>{children}</div>
        </div>
    )
}

export default ProtectedPage;



