'use client';

import React, { useState } from 'react'

const Setting = () => {
    const [isVisible, setIsVisible] = useState(false);
  return (
     <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" >
      <button  className='w-full p-5' onClick={()=>setIsVisible(!isVisible)}>{isVisible? "Hide Settings" : "Show Settings"}</button>
    </div>
  )
}

export default Setting
