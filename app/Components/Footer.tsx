'use client';

import React from 'react'

const GetToKnow =[
    'About Us',
    'Careers',
    'Press Releases',
    'E-Commerce Science',
]

const ConnectWithUs = [
    'Facebook',
    'twitter',
    'Instagram',
]

const MakeMoneyWithUs = [
    'Sell on E-Commerce',
    'Sell under E-Commerce Accelerator',
    'Protect & Build Your Brand',
    'Advertise Your Products',
    'Self-Publish with Us',
    'Host an E-Commerce Hub',
    'See More Make Money with Us'
]

const LetUsHelpYou = [
    'your Account',
    'Returns Centre',
    '100% Purchase Protection',
    'E-Commerce App Download',
    'Help',
]



const Footer = () => {
  return (
    <div className='bg-[#1e242af0] text-[#DDDDDD]'>
        <div onClick={()=> window.scrollTo({top:0,behavior:'smooth'})} className='w-full shadow justify-center bg-[#252c34] text-white hover:bg-gray-700/80 hover:cursor-pointer h-15 flex items-center'>Back to Top</div>
      <div className='   space-y-20 pt-24 '>
        <div className='flex justify-around text-white'>
            <div className='space-y-4'>
                <p className='font-bold'>Get to Know Us</p>
                <ul>{GetToKnow.map((item,index)=>(<li key={index}>{item}</li>))}</ul>
            </div>
            <div className='space-y-4'>
                <p className='font-bold'>Connect with Us</p>
                <ul>{ConnectWithUs.map((item,index)=>(<li key={index}>{item}</li>))}</ul>
            </div>
            <div className='space-y-4'>
                <p className='font-bold'>Make Money with Us</p>
                <ul>{MakeMoneyWithUs.map((item,index)=>(<li key={index}>{item}</li>))}</ul>
            </div>
            <div className='space-y-4'>
                <p className='font-bold'>Let Us Help You</p>
                <ul>{LetUsHelpYou.map((item,index)=>(<li key={index}>{item}</li>))}</ul>
            </div>
        </div>
        <hr />
      </div>
        <div className='flex flex-col justify-center items-center text-white bg-gray-700 py-10'>
            <p>E-Commerce</p>
            <p>© 2023 E-Commerce, Inc. or its affiliates</p>
        </div>  
    </div>
  )
}

export default Footer
