'use client';

import React from 'react'
import UserInfo from '../../Components/UserInfo';
import OrderHistory from '../../Components/OrderHistory';


const page = () => {
  return (
   <div className="max-w-4xl mx-auto py-10 space-y-8">
  <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
  {/* <UserInfo />
  <OrderHistory />
  <AddressSection />
  <Settings /> */}
    <UserInfo/>
    <OrderHistory />
</div>
  )
}

export default page
