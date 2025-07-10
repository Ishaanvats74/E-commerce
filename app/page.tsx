'use client';

import Image from "next/image";


export default function Home() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      <div className=" z-0">
      <Image src="/images/PC_Hero_Asin_3000x1200---Prime-Blue-TRIMMER-PDED._CB790427816_.jpg" width={1000} height={1000} alt="" className="w-full h-full object-cover z-0"/>
      </div>
      <div className="grid grid-cols-4 grid-rows-2 z-50">
      </div>
    </div>
  );
}
