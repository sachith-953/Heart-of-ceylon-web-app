'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type CartProduct = {
  productId: number;
  productName: string;
  productMainImage: string;
  quantity: number;
  price: number;
};

type CartData = {
  cartId: number;
  totalPrice: number;
  buyerId: number;
  cartProducts: CartProduct[];
};

const BuyerCart = () => {
  const [data, setData] = useState<CartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadPage, setReloadPage] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/buyer-cart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          const responseData = await res.json();
          const calculatedTotalPrice = responseData.cartProducts.reduce(
            (total: number, product: CartProduct) => 
              total + (product.price * product.quantity), 
            0
          );
          
          setData({
            ...responseData,
            totalPrice: calculatedTotalPrice
          });
        } else if (res.status === 403) {
          toast({
            variant: "destructive",
            title: "Sorry!",
            description: "Please Login again. Your Session has Expired!",
          });
          router.push("/log-in");
        } else {
          const errorData = await res.json();
          toast({
            variant: "destructive",
            title: "Error",
            description: errorData.message || "Failed to load cart data",
          });
        }
      } catch (error) {
        console.error("Error fetching cart details:", error);
        setError("Failed to load cart data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [router, reloadPage, toast]);

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No cart data available.</div>;
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col md:flex-row bg-gray-100 p-5 w-full">
        <div className=" bg-white p-5 rounded-lg max-h-[80vh] overflow-y-auto">
          {data.cartProducts.map((product) => (
            <div key={product.productId} className="flex flex-col md:flex-row mb-5 p-4 border border-gray-300 rounded-lg bg-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 md:mr-5">
                <Image
                  src={product.productMainImage}
                  alt={product.productName}
                  width={200}
                  height={200}
                  className="productImage rounded-lg"
                />
              </div>
              <div className="flex-1 mt-4 md:mt-0">
                <p className="text-2xl font-bold">{product.productName}</p>
                <div className=" items-center justify-between">
                  <p className="my-1 text-xl text-green-600">$ {product.price.toFixed(2)}</p>
                  <p> Quantity : {product.quantity} </p>
                </div>
                <p className="text-xl my-1">Total: ${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default BuyerCart;