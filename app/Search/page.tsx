'use client';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Image from 'next/image'
import React from 'react'





const Page = () => {

  return (
    <div className='flex max-w-full mt-5 h-screen'>

      <div className='w-[20%] px-5 space-y-5 '>
        <div>
            <div className='font-bold text-xl'>Year</div> 
            <div className='flex flex-col gap-2 '>
                <div className='flex items-center gap-1'>
                    <input type='checkbox' id='2012-1' name='2012-1' className='h-3 w-3'/>
                    <label htmlFor="2012-1">2012</label>
                </div>
                <div className='flex items-center gap-1' >
                    <input type='checkbox' id='2012-2' name='2012-2' className='h-3 w-3'/>
                    <label htmlFor="2012-2">2012</label>
                </div>
                <div className='flex items-center gap-1'>
                    <input type='checkbox' id='2012-3' name='2012-3' className='h-3 w-3'/>
                    <label htmlFor="2012-3">2012</label>
                </div>
            </div>
        </div>
      </div>

      <div className='w-[80%]'>
        <div>
            <div className='font-bold text-2xl'>Results</div>
            <div className='flex'>
                <div>
                    <Image src={'/images/ac.jpg'} alt='' width={300} height={300} className=''></Image>
                </div>
                <div>
                    <div>
                      <p>Wildcraft Unisex Grey & Green Rucksack</p>
                    </div>
                    <div>
                        <Rating style={{ maxWidth: 100 }} value={4} readOnly />
                    </div>
                    <div>
                         <p>300+ bought in past month</p>
                    </div>
                    <div>
                        <p className='text-2xl font-bold'>₹1,999</p>
                    </div>
                    <div>
                        <p>(40% off)</p>
                    </div>
                    <div>
                        <p>Save Extra with No Cost EMI</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page
