
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'





const ProductCard = () => {
    const Products = [
        {Deal: "Up to 55% off",
            items:[
                {Image: "/images/ac.jpg", Title: "Air Conditioners"},
                {Image: "/images/fridge.jpg", Title: "Refrigerators"},
                {Image: "/images/washing.jpg", Title: "Washing Machines"},
                {Image: "/images/microwave.jpg", Title: "Microwave Ovens"},
        ]},   
        {Deal: "Revamp your home in style ",
            items:[
                {Image: "/images/Cushion.jpg", Title: "Cushions Covers, Bedsheets & More"},
                {Image: "/images/Figurines.jpg", Title: "Figurines & Collectibles"},
                {Image: "/images/Storage.jpg", Title: "Home Storge"},
                {Image: "/images/Home_lighting.jpg", Title: "Lighting solutionss"},
        ]},   
        {Deal: "PlayStation 5 Slim & Accessories",
            items:[
                {Image: "/images/ps51.jpg", Title: "Ps5 Slim Digital Edition"},
                {Image: "/images/ps52.jpg", Title: "Ps5 Slim Disc Edition"},
                {Image: "/images/ps53.jpg", Title: "Ps5 Slime DualSense Controller"},
                {Image: "/images/ps54.jpg", Title: "Ps5 Slim Fortnite Digital Edition"},
        ]},   
        {Deal: "Under ₹499 | Deals on Home Improvement....",
            items:[
                {Image: "/images/under199.jpg", Title: "Under ₹199 | Cleaning Supplies"},
                {Image: "/images/under399.jpg", Title: "Under ₹399 | Bathroom Accessories"},
                {Image: "/images/under499.jpg", Title: "Under ₹499 | Home Tools"},
                {Image: "/images/under299.jpg", Title: "Under ₹299 | Wallpapers"},
        ]},   
    ]

    

  return (
    <div className="relative z-50 flex flex-wrap justify-evenly p-4 mt-60 w-full">
        {Products.map((product,index)=>(
            <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden w-72">
                <div className="p-4 text-2xl font-bold text-orange-700 h-20">{product.Deal}</div>
                <div className='grid grid-cols-2 gap-3 p-4 '>
                    {product.items.map((item,index)=>(
                        <Link href={"#"} key={index} className='flex flex-col items-center text-center hover:scale-105 transition'>
                            <div className="relative w-[120px] h-[90px]">
                                <Image src={item.Image} alt={item.Title} fill className="object-cover rounded-md"></Image>
                            </div>
                            <div className='text-sm mt-2 leading-tight'>{item.Title}</div>
                        </Link>
                    ))}
                </div>
            </div>
         ))}
    </div>
  )
}

export default ProductCard
