import Link from 'next/link'
import React from 'react'




const Navbar = () => {
    const Category = [
        "All Categories",
        "Electronics & Smart Gadgets",
        "Home & Kitchen Essentials",
        "Fashion & Accessories",
        "Health & Beauty",
        "Sports & Outdoors",
        "Toys & Games",
        "Books & Stationery",
        "Automotive & Tools",
        "Pet Supplies"
    ]
  return (
    <div className='bg-black h-15 text-white flex items-center justify-between'>
        <div className='text-3xl px-5'>
            <Link href="/">E-Commerence</Link> 
        </div>
        <div className='flex items-center '>
                <select name="" id="" className='bg-gray-200 h-10 w-14 rounded-l-lg text-black px-2 overflow-scroll hover:bg-gray-300 transition-all duration-150 ease-in-out'>
                    {Category.map((item,index)=>(
                        <option value={item} key={index} className='bg-white pr-10'>{item}</option>
                    ))}
                </select>
            <input type="text" placeholder="Search for products..." className='bg-white h-10 w-[700px] text-black px-2 '/>
            <button className='h-10 bg-amber-500 w-15 rounded-r-lg hover:bg-amber-600 text-black transition-all duration-150 ease-in-out'>Search</button>
        </div>
        <div className='flex items-center gap-5 px-5'>
            <div>
                <button className='hover:border px-7 py-2'>Profile</button>
            </div>
            <div>
                <button className='hover:border px-7 py-2'>Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar
