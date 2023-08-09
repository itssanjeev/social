import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile'
import EditProfile from './pages/Profile/EditProfile';
import { useEffect } from 'react';
import { setUser } from './redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './component/Spinner';

const App = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.loaders);
  useEffect(() => {
    const userData = localStorage.getItem('user');
    // console.log('app', userData)
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        console.log(userData);
        dispatch(setUser(parsedUserData));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    }
  }, [])
  return (
    <>
      {
        loading && <Spinner></Spinner>
      }
      <BrowserRouter >
        <Routes>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
          <Route path='/editProfile' element={<EditProfile></EditProfile>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;