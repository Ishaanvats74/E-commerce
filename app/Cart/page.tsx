"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
type Cart = {
  productId: number,
  id: number,
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
};

const Page = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [emptyCart, setEmpty] = useState(true);

  const refetchCart = async () => {
    const res = await fetch("/api/cart");
    const { Cart } = await res.json();
    setCart(Cart);
    const total = Cart.reduce(
      (sum: number, item: Cart) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
    setEmpty(Cart.length === 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/cart");
        const { Cart } = await res.json();
        console.log(Cart);
        setCart(Cart);
        const total = Cart.reduce(
          (sum: number, item: Cart) => sum + item.price * item.quantity,
          0
        );
        setTotalPrice(total);
        setLoading(false);
        if (Cart.length == 0) {
          setEmpty(true);
        } else {
          setEmpty(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  });

  const handleDelete = async (item: Cart) => {
    if (!user) {
      alert("Please login to add products to cart");
      return;
    }

    try {
      const res = await fetch("/api/cart", {
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
      if (res.ok) {
        await refetchCart();
        toast.success("Item Deleted.");
        console.log(data);
      } else {
        toast.error("Failed to update quantity: " + data.error);
      }
    } catch (error) {
      toast.error('Error:' + error);
    }
  };

  const handleMinus = async (item: Cart) => {
    if (!user) {
      alert("Please login to add products to cart");
      return;
    }
    if (item.quantity <= 1) {
      await handleDelete(item);
      return;
    }
    try {
      const res = await fetch("/api/cart", {
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
          quantity: item.quantity,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        await refetchCart();
        toast.success(`Quantity Decreased Total:${item.quantity-1}`);
        console.log(data);
      } else {
        toast.error("Failed to update quantity: " + data.error);
      }
    } catch (error) {
      toast.error("Error:" + error);
    }
  };

  const handlePlus = async (item: Cart) => {
    if (!user) {
      toast("Please login to add products to cart");
      return;
    }
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
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
          quantity: item.quantity,
          action: "increase",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        await refetchCart();
        toast.success(`Quantity Added Total:${item.quantity+1}`);
        console.log(data);
      } else {
        toast.error("Failed to update quantity: " + data.error);
      }
    } catch (error) {
      toast.error("Error:" + error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500"></div>
        </div>
      ) : (
        <>
          {emptyCart ? (
            <div className="bg-gray-300 h-screen flex flex-col justify-center items-center space-y-4">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty Cart"
                width={150}
                height={150}
              />
              <p className="text-gray-600 text-lg">Your cart is empty</p>
              <button
                className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition duration-200"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="bg-gray-300 h-auto p-5  overflow-auto">
              <div className="bg-white h-auto rounded-md p-6">
                <div className="mb-2">
                  <div>
                    <p className="text-3xl font-semibold">Shopping Cart</p>
                  </div>
                  <div className="flex justify-end ">
                    <p>Price</p>
                  </div>
                </div>

                <hr />

                {cart.map((item) => (
                  <div className="mt-5 space-y-10 h-auto" key={item.productId}>
                    <div className="flex space-x-4 items-center bg-gray-50 p-4 rounded-lg shadow-sm">
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
                        <div>
                          {item.gender} {item.baseColour}, {item.season},{" "}
                          {item.subCategory}, {item.usage}, {item.year}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <input type="checkbox" id="Gift" />
                          <label htmlFor="Gift" className="text-sm">
                            Gift
                          </label>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex border border-amber-400 rounded-full overflow-hidden text-sm">
                            <button
                              className="w-8 h-8 border-r border-amber-400 hover:bg-amber-300 transition-all duration-200 ease-in-out"
                              onClick={() => handleMinus(item)}
                            >
                              -
                            </button>
                            <button className="w-8 h-8">{item.quantity}</button>
                            <button
                              className="w-8 h-8 border-l border-amber-400 hover:bg-amber-300 transition-all duration-200 ease-in-out"
                              onClick={() => handlePlus(item)}
                            >
                              +
                            </button>
                          </div>
                          <button
                            className="text-red-600 text-sm hover:underline"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
                <div className="flex justify-between text-3xl font-semibold">
                  <div>Total Price: </div>
                  <div>₹{totalPrice}</div>
                </div>
              </div>
            </div>
          )}

          <div></div>
        </>
      )}
    </>
  );
};

export default Page;
