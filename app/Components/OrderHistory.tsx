"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Order = {
  productId: number;
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
  quantity: number;
  filname: string;
  address: string;
};

const OrderHistory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [Order, setOrder] = useState<Order[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useUser();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/orders");
      const { order, error } = await res.json();
      console.log(order, error);
      setOrder(order);
      const total = order.reduce(
        (sum: number, item: Order) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleHistory = async (item: Order) => {
    if (!user) {
      alert("Please login to add products to cart");
      return;
    }

    try {
      const res = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          clerkUserId: user.id,
          productId: item.productId,
          price: item.price,
          link: item.link,
          year: item.year,
          gender: item.gender,
          articleType: item.articleType,
          baseColour: item.baseColour,
          subCategory: item.subCategory,
          season: item.season,
          productDisplayName: item.productDisplayName,
          usage: item.usage,
          masterCategory: item.masterCategory,
          filename: item.link.split("/").pop(),
          quantity: 0,
        }),
      });
      const data = await res.json();
      console.log(data);
      toast.success("Success");
      fetchData();
    } catch (error) {
      toast.error("error" + error);
    }
  };

  return (
    <>
      <div className="w-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <button className="w-full p-5" onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? "Hide Orders" : "Show Orders"}
        </button>

        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden ${
            isVisible ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          } mt-4`}
        >
          <div className="shadow-xl h-auto overflow-auto">
            <div className="bg-white h-auto rounded-md p-6">
              <div className="mb-2">
                <div className="flex justify-between items-center">
                  <p className="text-3xl font-semibold">All Orders</p>
                  {Order.length > 0 && (
                    <button
                      className="text-red-600 text-sm hover:underline"
                      onClick={() =>
                        Order.forEach((item) => handleHistory(item))
                      }
                    >
                      Clear History
                    </button>
                  )}
                </div>
                <div className="flex justify-end">
                  <p>Price</p>
                </div>
              </div>

              <hr />

              <div className="mt-5 space-y-10 h-auto">
                {Order.map((item) => (
                  <div
                    key={item.productId}
                    className="flex space-x-4 items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <div className="min-w-[120px] h-[120px] relative">
                      <Image
                        src={item.link}
                        alt="product"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-md"
                      />
                    </div>

                    <div className="flex flex-col justify-between w-full">
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-md leading-snug w-[70%]">
                          {item.productDisplayName}
                        </p>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-800">
                            ₹{item.price}
                          </p>
                          <p className="text-xs text-gray-500">
                            Up to 5% back with Amazon Pay ICICI card
                          </p>
                        </div>
                      </div>
                      <div className="text-green-600 text-sm mt-1">
                        In stock
                      </div>
                      <div>Quantity: {item.quantity}</div>
                      <div>
                        {item.gender} {item.baseColour}, {item.season},{" "}
                        {item.subCategory}, {item.usage}, {item.year}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <input type="checkbox" id={`${item.filname}`} />
                        <label htmlFor={`${item.filname}`} className="text-sm">
                          Gift
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-3xl font-semibold mt-4">
                <div>Total Price: </div>
                <div>₹{totalPrice}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
