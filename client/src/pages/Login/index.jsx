import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { loginUser } from '../../apicall/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../apicall/userApi';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const onFinish = async (values) => {
        try {
            const response = await loginUser(values);
            console.log(response);
            if (response.success === true) {
                dispatch(setUser(response.data));
                localStorage.setItem("token", response.data);

                setIsLogin(true);
                try {
                    const data = await getCurrentUser();
                    localStorage.setItem('currentUserId', data.data._id);
                } catch (error) {
                    console.log(error);
                }

                navigate("/");
            } else {
                throw new error(response.message);
            }
        } catch (error) {
            console.log(error.message, "login")
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (isLogin && localStorage.getItem("token")) {
            navigate("/");
        }
    }, [])

    return (
        <div className='  bg-black  h-screen w-full  flex items-center justify-center '>
            <div>
                <div className='text-white text-4xl ml-56 mb-5'>Ghost chat</div>
                <div className='flex items-center justify-center flex-col pr-10 bg-slate-400 rounded-lg'>
                    <div className='text-3xl mb-4'>Login</div>
                    <div className=''>
                        <Form
                            name="login"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            className='lg:min-w-[600px]  md:min-w-[400px]'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input type='text' />
                            </Form.Item>
                            <Form.Item
                                label="password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item wrapperCol={{ offset: 13, span: 16 }}>
                                <Button type="primary" htmlType="submit" className='rounded-md'>
                                    login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='cursor-pointer mb-3'><span>create an account?{" "}
                        <Link to="/register" className="text-primary">register</Link>
                    </span></div>
                </div>
            </div>
        </div>
    )
}

export default Login;
