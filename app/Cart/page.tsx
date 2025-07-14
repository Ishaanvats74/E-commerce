'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'




const Page = () => {
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    const timeout = setTimeout(()=>{setLoading(false)},2000);
    return ()=> clearTimeout(timeout);
  })
  return (
    <>
    {loading ?(
      <div className="flex justify-center items-center h-screen w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500"></div>
        </div>
    ):(
      <>
        <div className='bg-gray-300 h-screen p-5 '>
          <div className='bg-white h-screen rounded-md p-6'>

            <div className='mb-2'>
              <div>
                <p className='text-3xl font-semibold'>Shopping Cart</p>
              </div>
              <div className='flex justify-between '>
                <button>Deselect all </button>
                <div>
                  <p>Price</p>
                </div>
              </div>
            </div>

            <hr />

            <div className='mt-5 space-y-10 h-auto'>
              <div className="flex space-x-4 items-center bg-gray-50 p-4 rounded-lg shadow-sm">

                <div className="min-w-[120px] h-[120px] relative">
                  <Image
                    src={"/images/ac.jpg"}
                    alt="product"
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md"
                  />
                </div>

                <div className="flex flex-col justify-between w-full">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-md leading-snug w-[70%]">
                      ETZIN VGA to HDMI Adapter, Gold-Plated VGA to HDMI Converter (Male to Female) with 0.5FT Audio Cable from PC, Monitor, Uni-Directional VGA (Source) to HDMI (Display)
                    </p>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-800">$45</p>
                      <p className="text-xs text-gray-500">Up to 5% back with Amazon Pay ICICI card</p>
                    </div>
                  </div>

                  <div className="text-green-600 text-sm mt-1">In stock</div>

                  <div className="flex items-center gap-2 mt-1">
                    <input type="checkbox" id="Gift" />
                    <label htmlFor="Gift" className="text-sm">Gift</label>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex border border-amber-400 rounded-full overflow-hidden text-sm">
                      <button className="w-8 h-8 border-r border-amber-400">-</button>
                      <button className="w-8 h-8">1</button>
                      <button className="w-8 h-8 border-l border-amber-400">+</button>
                    </div>
                    <button className="text-red-600 text-sm hover:underline">Delete</button>
                  </div>
                </div>
              </div>


              <hr />
            </div>

          </div>
        </div>


        <div>

        </div>
      </>
    )}
      
    </>
  )
}

export default Page
