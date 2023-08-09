import React from 'react'

const Spinner = () => {
    return (
        <div className='fixed inset-0 bg-black z-[999] flex items-center justify-center opacity-70'>
            <div className='w-10 h-10 border-2 border-dashed border-t-transparent rounded-full animate-spin border-white'></div>
        </div>
    )
}

export default Spinner;