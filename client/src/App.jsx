import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register'
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/profile' element={<Profile></Profile>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;