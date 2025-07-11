'use client';

import React, { useEffect, useState } from 'react'
import UserInfo from '../../Components/UserInfo';
import OrderHistory from '../../Components/OrderHistory';
import AddressSection from '@/app/Components/AddressSection';
import Setting from '@/app/Components/Setting';
import { ShoppingBag,  } from 'lucide-react'; 


const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const timeout = setTimeout(()=> {setLoading(false)},10);
    return ()=> clearTimeout(timeout);
  },[]);
 

  return (
    <>
    {loading && (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-100 z-50">
      <div className="relative animate-bounce mb-4">
        <div className="w-20 h-20 bg-orange-500 rounded-full shadow-xl flex items-center justify-center">
          <ShoppingBag className="text-white w-10 h-10" />
        </div>
      </div>
      <div className="mt-4 text-orange-800 text-md font-medium animate-fade-in-up">
        Almost there... 🛍️✨
      </div>
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
