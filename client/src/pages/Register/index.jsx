import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { registerUser } from '../../apicall/userApi';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loaderSlice';
import image from '../../assets/logo1.png'


const index = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(setLoader(true));
            const response = await registerUser(values);
            dispatch(setLoader(false));
            if (response.success) {
                message.success('user registered successfully');
                navigate("/login");
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const onFinishFailed = (errorInfo) => {
        // console.log('Failed:', errorInfo);
    };

    return (
        <div className='   bg-black  h-screen w-full  flex items-center justify-center  flex-col'>
            <div className='text-3xl mb-2 text-white'>
                <div className='text-2xl border-gray-400 text-red-600 flex flex-row items-center'>
                    <img src={image} className='w-12 h-12 mr-2'></img>
                    <div>Ghost Chat</div>
                </div>
            </div>

            <div className=' flex items-center justify-center flex-col pr-10 bg-slate-400 rounded-lg mt-2'>
                <div className='mb-4 '></div>
                <div className=''>
                    <Form
                        name="register"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        className='lg:min-w-[600px]  md:min-w-[400px]'
                        // initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter you name!' }]}
                        >
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input type='text' />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input type='email' />
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
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='cursor-pointer'>Already have an account?
                    <Link to='/login'><span>Login</span></Link> </div>
            </div>
        </div>
    )
}

export default index;
