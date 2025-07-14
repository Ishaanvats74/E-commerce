'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "./Components/ProductCard";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const timeout = setTimeout(()=>setLoading(false),2000);
    return ()=> clearTimeout(timeout);
  },[])
  
  return (
    <>
    {loading ?(
        <div className="flex justify-center items-center h-screen w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500"></div>
        </div>
    ):(
      <div className="relative w-full min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image src="/images/PC_Hero_Asin_3000x1200---Prime-Blue-TRIMMER-PDED._CB790427816_.jpg"  alt="" fill className="w-full h-full object-cover"/>
        </div>
        <div className="relative z-10 pt-12 ">
          <ProductCard />
        </div>
    </div>
    )}
    </>
  );
}
