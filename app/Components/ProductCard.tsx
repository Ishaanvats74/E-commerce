
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const ProductCard = () => {
    

  return (
    <div className="relative z-50 bg-white w-80">
        <div className=" p-4  text-2xl font-semibold">Appliances for Your Home | Up to 55% off</div>
        <div className='grid grid-cols-2 grid-rows-2 gap-2 p-4 m-2'>
            <Link href={""}>
                <Image src={""} alt=''></Image>
                <div>Air Conditioners</div>
            </Link>
            <Link href={""}>
                <Image src={""} alt=''></Image>
                <div>Air Conditioners</div>
            </Link>
            <Link href={""}>
                <Image src={""} alt=''></Image>
                <div>Air Conditioners</div>
            </Link>
            <Link href={""}>
                <Image src={""} alt=''></Image>
                <div>Air Conditioners</div>
            </Link>

        </div>
    </div>
  )
}

export default ProductCard
