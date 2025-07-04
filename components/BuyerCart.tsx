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
    if (data && data.cartProducts) {
      const newTotalPrice = data.cartProducts.reduce(
        (total, product) => total + (product.price * product.quantity),
        0
      );
      
      if (newTotalPrice !== data.totalPrice) {
        setData(prevData => ({
          ...prevData!,
          totalPrice: newTotalPrice
        }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.cartProducts]);

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

  const updateCart = async (updatedProducts: CartProduct[]) => {
    if (data) {
      const totalPrice = updatedProducts.reduce(
        (total, product) => total + (product.price * product.quantity),
        0
      );
      
      setData({
        ...data,
        cartProducts: updatedProducts,
        totalPrice: totalPrice
      });
    }
  };

  const handleIncreaseQuantity = (productId: number) => {
    if (data) {
      const updatedProducts = data.cartProducts.map((product) => {
        if (product.productId === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      updateCart(updatedProducts);
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    if (data) {
      const updatedProducts = data.cartProducts.map((product) => {
        if (product.productId === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      updateCart(updatedProducts);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    if (data) {
      const updatedProducts = data.cartProducts.filter(
        (product) => product.productId !== productId
      );
      updateCart(updatedProducts);
    }
  };

  const handleCheckout = async () => {
    if (data) {
      try {
        // First update the cart products table
        const updateCartResponse = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/product/checkout-cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartId: data.cartId,
            buyerId: data.buyerId,
            cartProducts: data.cartProducts.map(product => ({
              productId: product.productId,
              quantity: product.quantity,
              price: product.price
            }))
          }),
        });

        if (updateCartResponse.ok) {
          // If cart update is successful, redirect to payment page
          //const totalAmount = data.totalPrice + 19.25; // Including shipping fee
          router.push(`/checkout`);
        } else {
          const errorData = await updateCartResponse.json();
          toast({
            variant: "destructive",
            title: "Error",
            description: errorData.message || "Failed to checkout cart",
          });
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Checkout failed. Please try again.",
        });
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No cart data available.</div>;
  }

  const totalItems = data.cartProducts.reduce((sum, product) => sum + product.quantity, 0);
  const SHIPPING_FEE = 19.25;

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row bg-gray-100 p-5">
        <div className="md:flex-3 mr-5 w-full md:w-3/5 bg-white p-5 rounded-lg max-h-[80vh] overflow-y-auto">
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
                <div className="flex items-center justify-between">
                  <p className="my-1 text-xl text-green-600">$ {product.price.toFixed(2)}</p>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecreaseQuantity(product.productId)}
                      className="text-black py-1 px-3 rounded-lg bg-gray-300 text-xl font-bold hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="px-3">{product.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(product.productId)}
                      className="text-black py-1 px-3 rounded-lg bg-gray-300 text-xl font-bold hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-xl my-1">Total: ${(product.price * product.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleDeleteProduct(product.productId)}
                  className="bg-red-500 text-white py-1 px-3 rounded mt-2 text-xl hover:bg-red-600 hover:shadow-lg transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:flex-1 bg-gray-200 p-5 rounded-lg w-full md:w-2/5">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="my-2">Subtotal: US ${data.totalPrice.toFixed(2)}</p>
          <p className="my-2">Shipping fee: US ${SHIPPING_FEE.toFixed(2)}</p>
          <p className="my-2">Saved: US $0.00</p>
          <p className="my-2 font-bold">Total: US ${(data.totalPrice + SHIPPING_FEE).toFixed(2)}</p>
          <button
            className="bg-red-500 text-white py-2 w-full rounded my-5 hover:bg-red-900 hover:shadow-lg transition duration-300 ease-in-out"
            onClick={handleCheckout}
          >
            Checkout ({totalItems} items)
          </button>

          <div className="text-center">
            <h3 className="m-2.5 pr-10 text-middle font-bold text-2xl">Pay with</h3>
            <Image
              src="https://www.4x50.com/fileadmin/_processed_/a/4/csm_paymentmethods_1f47eaef07.jpg"
              alt="Payment Methods"
              width={700}
              height={50}
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuyerCart;