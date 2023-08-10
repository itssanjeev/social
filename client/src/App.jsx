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

import ProtectedPage from './component/ProtectedPage';
const App = () => {
  const { loading } = useSelector(state => state.loaders);
  return (
    <>
      {
        loading && <Spinner></Spinner>
      }
      <BrowserRouter >
        <Routes>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<ProtectedPage><Home></Home></ProtectedPage>}></Route>
          <Route path='/profile' element={<ProtectedPage><Profile></Profile></ProtectedPage>}></Route>
          <Route path='/editProfile' element={<ProtectedPage><EditProfile></EditProfile></ProtectedPage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;