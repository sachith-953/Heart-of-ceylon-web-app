"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import CategoryLevel1 from "@/components/CategoryLevel1";
import NameConverAndProfilePic from "@/components/sellerStore/NameConverAndProfilePic";
import SearchBar from "@/components/SearchBar";
import SellerProductDetails from "@/components/sellerStore/SellerProductDetails";
import MaxWidthLg from "@/components/MaxWidthLg";


const Page = () => {

    const searchParams = useSearchParams();

    // useEffect(()=>{

    // }, []);

    return (

        <>
            {/* <p>sellerId :{searchParams.get('sellerId')}</p> */}

            <Navbar />

            <MaxWidthLg>

                <SearchBar />

                {/* Cover Image, Store Image, Store Name */}
                <div>
                    <NameConverAndProfilePic sellerId={Number(searchParams.get('sellerId'))} />
                </div>

                <div>

                    {/* parent component */}
                    <div className="bg-white flex justify-center">
                        <div className="flex flex-row  max-w-screen-lg w-full">

                            {/* left side : All Categories */}
                            <div className="hidden sm:flex sm:w-1/3 bg-gray-100">
                                <CategoryLevel1 />
                            </div>


                            {/* right side */}
                            <div className="w-full sm:w-2/3">
                                <SellerProductDetails sellerId={Number(searchParams.get('sellerId'))} />
                            </div>

                        </div>
                    </div>
                </div>

            </MaxWidthLg>

            <Footer />
        </>

    );
}

const SellerStoreWholePage = () => {
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

export default SellerStoreWholePage;


