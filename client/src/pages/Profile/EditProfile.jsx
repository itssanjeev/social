import { Form, Input, Button, message } from 'antd';
import Dropzone from 'react-dropzone';
import { useEffect, useState } from 'react';
import { updateUserProfile } from '../../apicall/userApi';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../../apicall/userApi';
//component main function
const EditProfile = () => {
    const currentUser = useSelector((state) => state.users.user);
    // console.log(currentUser);
    const profilePic = currentUser.profilePicture;
    // console.log(profilePic);
    const [uploadedFile, setUploadedFile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * The `handleDrop` function sets the uploaded file to the first accepted file in an array.
     */
    const handleDrop = (acceptedFiles) => {
        // Assuming only a single file is allowed to be uploaded
        const file = acceptedFiles[0];
        setUploadedFile(file);
        // console.log(file);
        // console.log(file);
    };

    /**
     * The function `onFinish` handles form data submission for updating user profile with error
     * handling and success message display.
     */
    async function onFinish(values) {
        try {
            const formData = new FormData();
            formData.append("file", uploadedFile);
            if (values.name) {
                formData.append("name", values.name);
            }
            if (values.username) {
                formData.append("username", values.username);
            }
            if (values.bio) {
                formData.append("bio", values.bio);
            }
            // console.log('client side', formData);
            // console.log(formData);
            dispatch(setLoader(true));
            const response = await updateUserProfile(formData);
            dispatch(setLoader(false));
            if (response.success) {
                message.success(response.message);
                navigate("/profile");
            } else {
                message.error(response.message);
            }
        } catch (error) {
            // console.log(error.message);
        }
    }
    function onFinishFailed(value) {
        // console.log(value);
    }



    return (
        <div className='mt-0 flex justify-center items-center flex-col h-screen bg-slate-400'>
            <div className='bg-slate-300'>
                <div className='text-xl flex items-center justify-center m-6 '>click on pic to change</div>
                <div className='lg:min-w-[500px] md:min-w-[300px]'>
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <div className='items-center justify-center ml-16 mb-2'>
                            <Dropzone onDrop={handleDrop} accept="image/*">
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()} className="dropzone">
                                        <input {...getInputProps()} />
                                        {uploadedFile ? (
                                            <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded" className="uploaded-image w-36 h-36 border-gray-800 rounded-full" />
                                        ) : (
                                            <div className='bg-slate-500 border-2 border-gray-800 rounded-full h-36 w-36 justify-center items-center'>{profilePic ? <img src={profilePic}
                                                className='w-36 h-36 border-gray-800 rounded-full'
                                            ></img> : <i className="ri-image-line flex justify-center items-center text-9xl text-white"></i>}</div>
                                        )}
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                        <Form.Item label="Name" name="name" className='mb-2'>
                            <Input type="text"></Input>
                        </Form.Item>
                        <Form.Item label="UserName" name="username" className='mb-2'>
                            <Input type="text"></Input>
                        </Form.Item>
                        <Form.Item label="Bio" name="bio" className='mb-3'>
                            <Input.TextArea></Input.TextArea>
                        </Form.Item>

                        <div className='flex items-center justify-center'>
                            <Button htmlType='submit' className='bg-primary '>save</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;





