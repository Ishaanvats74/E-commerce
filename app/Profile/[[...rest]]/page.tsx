'use client';

import React, { useEffect, useState } from 'react'
import UserInfo from '../../Components/UserInfo';
import OrderHistory from '../../Components/OrderHistory';
import AddressSection from '@/app/Components/AddressSection';
import Setting from '@/app/Components/Setting';



const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const timeout = setTimeout(()=> {setLoading(false)},10);
    return ()=> clearTimeout(timeout);
  },[]);
 

  return (
    <>
    {loading && (
        <div className="flex justify-center items-center h-full w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500"></div>
        </div>
    )}
   <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
        <UserInfo/>
        <OrderHistory />
        <AddressSection />
        <Setting />
    </div>
    </>
  )
}

export default Page
