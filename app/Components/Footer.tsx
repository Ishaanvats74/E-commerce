"use client";

import React from "react";

const GetToKnow = [
  "About Us",
  "Careers",
  "Press Releases",
  "E-Commerce Science",
];
const ConnectWithUs = ["Facebook", "Twitter", "Instagram"];
const MakeMoneyWithUs = [
  "Sell on ShopWise",
  "Sell under Accelerator",
  "Protect Your Brand",
  "Advertise Your Products",
  "Self-Publish with Us",
  "Host a ShopWise Hub",
  "See More Ways to Earn",
];
const LetUsHelpYou = [
  "Your Account",
  "Returns Centre",
  "Purchase Protection",
  "App Download",
  "Help",
];

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-[#f1f5f9] text-sm">
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full text-center bg-[#1e293b] hover:bg-[#334155] text-white py-4 cursor-pointer transition"
      >
        Back to Top
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-700">
        <div>
          <h4 className="font-semibold text-white mb-4">Get to Know Us</h4>
          <ul className="space-y-2">
            {GetToKnow.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Connect with Us</h4>
          <ul className="space-y-2">
            {ConnectWithUs.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Make Money with Us</h4>
          <ul className="space-y-2">
            {MakeMoneyWithUs.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Let Us Help You</h4>
          <ul className="space-y-2">
            {LetUsHelpYou.map((item, i) => (
              <li key={i} className="hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#1e293b] py-6 flex flex-col items-center text-gray-400 text-sm">
        <p className="text-[#f59e0b] font-bold text-lg">ShopWise</p>
        <p>© {new Date().getFullYear()} ShopWise, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
