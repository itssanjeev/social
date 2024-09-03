import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './component/Spinner';
import ProtectedPage from './component/ProtectedPage';
import { Skeleton } from 'antd';
import NotificationSocket from './pages/Notification/NotificationSocket';

// Lazy load pages
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/Profile/EditProfile'));
const UploadPost = lazy(() => import('./pages/UploadPost'));
const Followers = lazy(() => import('./pages/Profile/Followers'));
const OthersProfile = lazy(() => import('./pages/OthersProfile'));
const Following = lazy(() => import('./pages/Profile/Following'));
const Search = lazy(() => import('./pages/Search'));
const Message = lazy(() => import('./pages/Message/Message'));
const Notification = lazy(() => import('./pages/Notification/Notificaton'));
const AdminHome = lazy(() => import('./pages/Admin/AdminHome'));
const VisitPostById = lazy(() => import('./pages/VisitPost/VisitPostById'));
const TopPostInLastWeek = lazy(() => import('./pages/PostRatingWise/TopPostInLastWeek'));
const MostLikedPost = lazy(() => import('./pages/PostRatingWise/MostLikedPost'));
const MostEngagingPost = lazy(() => import('./pages/PostRatingWise/MostEngagingPost'));

const App = () => {
  const { loading } = useSelector((state) => state.loaders);

  return (
    <div>
      {loading && <Spinner />}
      <NotificationSocket />
      <BrowserRouter>
        <Suspense fallback={<Skeleton active />}>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>} />
            <Route path="/profile" element={<ProtectedPage><Profile /></ProtectedPage>} />
            <Route path="/editProfile" element={<ProtectedPage><EditProfile /></ProtectedPage>} />
            <Route path="/uploadPost" element={<ProtectedPage><UploadPost /></ProtectedPage>} />
            <Route path="/followers" element={<ProtectedPage><Followers /></ProtectedPage>} />
            <Route path="/following" element={<ProtectedPage><Following /></ProtectedPage>} />
            <Route path="/OthersProfile" element={<ProtectedPage><OthersProfile /></ProtectedPage>} />
            <Route path="/search" element={<ProtectedPage><Search /></ProtectedPage>} />
            <Route path="/message" element={<ProtectedPage><Message /></ProtectedPage>} />
            <Route path="/notification" element={<ProtectedPage><Notification /></ProtectedPage>} />
            <Route path="/admin" element={<ProtectedPage><AdminHome /></ProtectedPage>} />
            <Route path="/post/:id" element={<ProtectedPage><VisitPostById /></ProtectedPage>} />
            <Route path="/topPostInLastWeek" element={<ProtectedPage><TopPostInLastWeek /></ProtectedPage>} />
            <Route path="/allTimeHighestRatedPost" element={<ProtectedPage><MostLikedPost /></ProtectedPage>} />
            <Route path="/LeadingInComments" element={<ProtectedPage><MostEngagingPost /></ProtectedPage>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
