'use client';
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "./Components/ProductCard";


export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    const timeout = setTimeout(()=>setLoading(false),10);
    return ()=> clearTimeout(timeout);
  },[])
  


    
  

  return (
    <>
    {loading &&(
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
    <div className="relative w-full h-[600px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/PC_Hero_Asin_3000x1200---Prime-Blue-TRIMMER-PDED._CB790427816_.jpg" width={1000} height={1000} alt="" className="w-full h-full object-cover"/>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 z-50 ">
        <ProductCard />
      </div>
    </div>
    </>
  );
}
