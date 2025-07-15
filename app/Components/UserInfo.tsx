'use client';

import { UserProfile } from '@clerk/nextjs';
import React, { useState } from 'react'

const UserInfo = () => {
    const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" >

    <button className='w-full p-5' onClick={()=> setIsVisible(!isVisible)}>
        {isVisible ? "Hide Profile" : "Show Profile"}
    </button>
        <div className={`transition-all duration-700 ease-in-out overflow-hidden ${isVisible ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 "} mt-4`}>
            <UserProfile/>
        </div>
    </div>
  )
}

export default UserInfo
