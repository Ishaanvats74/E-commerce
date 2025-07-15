"use client";
export const dynamic = "force-dynamic";
import { useUser } from "@clerk/nextjs";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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
};

const SearhResults = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";
  console.log(query);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/products?query=${encodeURIComponent(
          query
        )}&limit=10&page=${currentPage}`
      );
      const { products, count } = await res.json();
      setProducts(products);
      setTotal(count);
      setIsLoading(false);
    };
    if (query) {
      fetchData();
    }
  }, [query, currentPage]);
  const totalPages = Math.ceil(total / 10);

  const handleToCart = async (item: Product) => {
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
          productId: item.id,
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
          quantity: 1,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Product added to cart!");
        console.log(data);
      } else {
        toast.error("Failed to add to cart: " + data.error);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleBuy = () => {
    console.log("Product purchased");
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-amber-500"></div>
        </div>
      ) : (
        <>
          <div className="flex max-w-full mt-5 h-auto">
            <div className="w-[20%] px-5 space-y-5 ">
              <div>
                <div className="font-bold text-xl">Year</div>
                <div className="flex flex-col gap-2 ">
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="2012-1"
                      name="2012-1"
                      className="h-3 w-3"
                    />
                    <label htmlFor="2012-1">2012</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="2012-2"
                      name="2012-2"
                      className="h-3 w-3"
                    />
                    <label htmlFor="2012-2">2012</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      id="2012-3"
                      name="2012-3"
                      className="h-3 w-3"
                    />
                    <label htmlFor="2012-3">2012</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[80%]">
              <div>
                <div className="font-bold text-2xl">Results for `{query}`</div>
                {products.map((item) => (
                  <div className="flex" key={item.id}>
                    <div>
                      <Image
                        src={item.link}
                        alt={item.productDisplayName}
                        width={300}
                        height={300}
                        className=""
                      ></Image>
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
                        <p className="text-2xl font-bold">₹{item.price}</p>
                      </div>
                      <div>
                        <p>(40% off)</p>
                      </div>
                      <div>
                        <p>Save Extra with No Cost EMI</p>
                      </div>
                      <div>
                        <button
                          className=" p-2 rounded-4xl mt-2 ml-2 transition-all duration-150 ease-in-out hover:bg-gray-500 bg-gray-400 text-sm font-semibold"
                          onClick={() => handleToCart(item)}
                        >
                          Add to Cart
                        </button>
                      </div>
                      <div>
                        <button
                          className=" p-2 rounded-4xl mt-2 ml-2 transition-all duration-150 ease-in-out hover:bg-amber-500 bg-amber-400 text-sm font-semibold"
                          onClick={handleBuy}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center my-5 mt-20">
            {products.length > 0 && (
              <div className="flex items-center gap-5 p-3 shadow-lg rounded-lg text-lg">
                <div>
                  <button
                    disabled={currentPage == 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={` p-1 shadow-lg rounded-lg w-20 ${
                      currentPage == 1
                        ? "text-gray-500"
                        : "text-black hover:bg-gray-300 transition-all duration-200 ease-in-out  "
                    }`}
                  >
                    Previous
                  </button>
                </div>
                <div className="gap-5 flex">
                  <button
                    disabled={currentPage == 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    {currentPage == 1 ? (
                      <div></div>
                    ) : (
                      <div className="p-2 text-black">{currentPage - 1}</div>
                    )}
                  </button>
                  <button className="border p-2 border-gray-300 text-gray-300">
                    {currentPage}
                  </button>
                  <button
                    disabled={totalPages == currentPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    {totalPages == currentPage ? (
                      <div></div>
                    ) : (
                      <div className="p-2 text-black">{currentPage + 1}</div>
                    )}
                  </button>
                </div>
                <div>
                  <button
                    disabled={totalPages == currentPage}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`w-20 p-1 shadow-lg rounded-lg ${
                      totalPages == currentPage
                        ? "text-gray-500"
                        : "text-black hover:bg-gray-300 transition-all duration-200 ease-in-out"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SearhResults;
