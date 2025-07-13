'use client';
export const dynamic = 'force-dynamic';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'

type Product = {
  id: number;
  gender: string;
  masterCategory: string;
  subCategory: string;
  articleType: string;
  baseColour: string;
  season: string;
  year: number;
  usage: string;
  productDisplayName: string;
  price: number;
  link: string;
}



const Page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';
  console.log(query);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await fetch(`/api/products?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProducts(data);
    }
    if(query) {
      fetchData();
    }
  },[query]);
  
  return (
    <Suspense fallback={<div className="p-10 text-xl">Loading...</div>}>
      <div className='flex max-w-full mt-5 h-auto'>
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
              <div className='font-bold text-2xl'>Results for `{query}`</div>
                {products.map((item)=>(
                  <div className='flex' key={item.id}>
                  <div>
                      <Image src={item.link} alt={item.productDisplayName} width={300} height={300} className=''></Image>
                  </div>
                  <div>
                      <div>
                        <p>{item.productDisplayName}</p>
                      </div>
                      <div>
                          <Rating style={{ maxWidth: 100 }} value={4} readOnly />
                      </div>
                      <div>
                          <p>300+ bought in past month</p>
                      </div>
                      <div>
                          <p className='text-2xl font-bold'>₹{item.price}</p>
                      </div>
                      <div>
                          <p>(40% off)</p>
                      </div>
                      <div>
                          <p>Save Extra with No Cost EMI</p>
                      </div>
                  </div>
              </div>
                ))}
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Page
