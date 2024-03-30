import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button, message, Input } from 'antd';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { uploadPost } from '../../apicall/postApi';
import { setLoader } from '../../redux/loaderSlice';
import { Radio } from 'antd'

const UploadPost = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [categoryValue, setCategoryValue] = useState(4);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setCategoryValue(e.target.value);
    };

    /**
     * The handleDrop function sets the uploaded file to the first file in the acceptedFiles array.
     */
    const handleDrop = (acceptedFiles) => {
        // Assuming only a single file is allowed to be uploaded
        const file = acceptedFiles[0];
        setUploadedFile(file);
    };


    /**
     * The function `onFinish` handles the submission of form data, including file uploads, post title,
     * and category, and displays success or error messages based on the response.
     */
    async function onFinish(values) {
        try {
            // console.log(values);
            const formData = new FormData();
            formData.append("file", uploadedFile);
            if (values.postTitle) {
                formData.append("postTitle", values.postTitle);
            }
            // console.log(categoryValue);
            formData.append("category", categoryValue);
            // console.log(formData);
            dispatch(setLoader(true));
            const response = await uploadPost(formData);
            dispatch(setLoader(false));
            // console.log(response);
            if (response.success) {
                message.success(response.message);
                navigate("/");
            } else {
                message.error(response.message);
            }
        } catch (error) {
            // console.log('upload post', error.message);
        }
    }

    function onFinishFailed(value) {
        // console.log(value);
    }

    return (
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <div className='flex items-center justify-center h-screen bg-slate-200'>
                <div className='w-4/5 md:w-1/2  bg-white shadow-lg'>
                    <div className='aspect-4-3 relative'>
                        <div className='absolute inset-0 flex items-center justify-center flex-col '>
                            <Form.Item
                                label="title"
                                name="postTitle"
                            >
                                <Input className='w-[300px] ' />
                            </Form.Item>
                            <div className='mb-2'>
                                <Radio.Group onChange={onChange} value={categoryValue}>
                                    <Radio value={1}>Sports</Radio>
                                    <Radio value={2}>Politics</Radio>
                                    <Radio value={3}>Religion</Radio>
                                    <Radio value={4}>General</Radio>
                                </Radio.Group>
                            </div>
                            <Dropzone onDrop={handleDrop} accept="image/*">
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className="dropzone">
                                        <input {...getInputProps()} />
                                        {uploadedFile ? (
                                            <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded"
                                                className="uploaded-image bg-slate-500 border-2 border-gray-800 h-[500px] w-[500px] flex items-center justify-center" />
                                        ) : (
                                            <div className='bg-slate-500 border-2 border-gray-800 h-[500px] w-[500px] flex items-center justify-center'>
                                                <i className="ri-gallery-upload-fill text-center text-9xl"></i>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                            <div><Button htmlType='submit' className='bg-slate-950 text-white mt-2'>Upload Image</Button></div>
                        </div>
                    </div>
                </div>
            </div>
        </Form>

    )
}

export default UploadPost;