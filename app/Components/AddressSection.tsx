'use client';

import React, { useState } from 'react'

const AddressSection = () => {
    const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" >
      <button  className='w-full p-5' onClick={()=>setIsVisible(!isVisible)}>{isVisible? "Hide Address" : "Show Address"}</button>
    </div>
  )
}

export default AddressSection
