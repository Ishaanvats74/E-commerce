"use client";

import Link from "next/link";
import React, { useState } from "react";
import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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
  "Pet Supplies",
];

const Navbar = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleChange = () => {
    if (SearchTerm.trim() !== "") {
      router.push(`/Search?query=${encodeURIComponent(SearchTerm.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleChange();
    }
  };

  const HandletoCart = () => {
    router.push("/Cart");
  };

  return (
    <div className="bg-[#0f172a] text-[#f1f5f9] flex items-center justify-between px-6 py-4 shadow-md">
      <div className="text-2xl font-bold tracking-wide text-[#f59e0b]">
        <Link href="/">ShopWise</Link>
      </div>

      <div className="flex items-center border rounded-md">
        <select className="bg-[#1e293b] text-white px-2 py-2 rounded-l-md outline-none">
          {Category.map((item, index) => (
            <option key={index} value={item} className="bg-white text-black">
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search for products..."
          className="px-3 py-2 w-[500px] text-white rounded-r-none focus:outline-none" 
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-[#f59e0b] hover:bg-[#fbbf24] text-black px-4 py-2 rounded-r-md transition"
          onClick={handleChange}
        >
          Search
        </button>
      </div>

      <div className="flex items-center gap-5">
        <button
          className="hover:bg-[#1e293b] px-4 py-2 rounded-md transition"
          onClick={HandletoCart}
        >
          Cart
        </button>
        <SignedOut>
          <SignUpButton>
            <button className="hover:bg-[#1e293b] px-4 py-2 rounded-md transition">
              Profile
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <Link
            href="/Profile"
            className="hover:bg-[#1e293b] px-4 py-2 rounded-md transition"
          >
            Profile
          </Link>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
