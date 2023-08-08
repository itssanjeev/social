import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loaderSlice';
import { setUser } from '../../redux/userSlice';
import { getCurrentUser } from '../../apicall/userApi';

const index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const getCurrentUsers = async () => {
        try {
            // console.log(user);
            dispatch(setLoader(true));
            const data = await getCurrentUser();
            // console.log(data.data);
            if (data.success === false) {
                navigate("/login");
            }
            dispatch(setUser(data.data));
            dispatch(setLoader(false));
        } catch (error) {
            console.log(error.message);
        }
    }
    const currentUser = useSelector((state) => state.users.user);
    console.log(currentUser);
    useEffect(() => {
        const fetchData = async () => {
            await getCurrentUsers();
        };
        fetchData();
    }, []);
    return (
        <div onClick={() => navigate('/profile')}>index


        </div>
    )
}

export default index;