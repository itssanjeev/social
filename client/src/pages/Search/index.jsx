import React, { useState } from 'react';

const index = () => {
    const [inputData, setInputData] = useState({});
    const handleVisitProfile = (id) => {
        localStorage.setItem('otherUserId', id);
        // console.log(localStorage.getItem('otherUserId'));
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId === id) {
            navigate('/profile');
        } else {
            navigate('/OthersProfile');
        }
    }
    return (
        <div>
            <div className='w-full  h-screen bg-sky-100 flex  justify-center'>
                <input type="text" placeholder=' input userid ' className='lg:w-1/2 bg-slate-100 h-8  w-full' />
            </div>
        </div>
    )
}

export default index