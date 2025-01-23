"use client"

import MaxWidthLg from "@/components/MaxWidthLg";
import Navbar from "@/components/Navbar";
import AboutProduct from "@/components/ProductProfileTabs/AboutProduct";
import Reviews from "@/components/ProductProfileTabs/Reviews";
import ShippingReturnPayment from "@/components/ProductProfileTabs/ShippingReturnPayment";
import SearchBar from "@/components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/productProfileDetails/ProductDetails";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import SellerDetailsForProductProfile from "@/components/productProfileDetails/SellerDetailsForProductProfile";



const Page = () => {

  const searchParams = useSearchParams();


  return (
    <>
      <Navbar />
      <SearchBar />

      <MaxWidthLg>

        <ProductDetails pId={Number(searchParams.get('pid'))} />

        <div className="my-8">

          <Tabs defaultValue="about" className="flex flex-col justify-center">
            <TabsList className="flex flex-col sm:flex-row w-full mt-4 sm:mt-0 mb-10 sm:mb-2">
              {/*About product tag*/}
              <TabsTrigger className="basis-1/3 my-2" value="about">About this Product</TabsTrigger>
              {/*Shipping tag*/}
              <TabsTrigger className="basis-1/3 my-2" value="shipping">
                Shipping, Return and Payments
              </TabsTrigger>
              {/*Reviews tag*/}
              <TabsTrigger className="basis-1/3 my-2" value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="about">
              <AboutProduct pId={Number(searchParams.get('pid'))} />
            </TabsContent>

            <TabsContent value="shipping">
              <ShippingReturnPayment pId={Number(searchParams.get('pid'))} />
            </TabsContent>

            <TabsContent value="reviews">
              <Reviews pId={Number(searchParams.get('pid'))} />
            </TabsContent>

          </Tabs>

        </div>

        <SellerDetailsForProductProfile pId={Number(searchParams.get('pid'))} />

      </MaxWidthLg>

      <Footer />
    </>
  );
}

const ProductProfileWholePage = () => {
  return (
    <>
      <div className="bg-white">
        <Suspense>
          <Page />
        </Suspense>
      </div>
    </>
  )
}


export default ProductProfileWholePage;
