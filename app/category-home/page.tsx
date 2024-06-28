"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Category_Level_1 from "@/components/CategoryLevel1";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import SubCategories from "@/components/SubCategories";
import SubCategoriesSkeliton from "@/components/SubCategoriesSkeliton";


export default function SearchPage() {

    //get parameters
    const searchParams = useSearchParams();
    const parentCategoryId = searchParams.get("parentCategoryId");

    console.log("[category-home]data recived : " + parentCategoryId)

    interface dataDataType {
        categoryId: number
        categoryName: string;
        description: string
        image: string
    }

    //for response handling 
    const [errorMessage, setErrorMessage] = useState("");
    const [dataFetchError, setDataFetchError] = useState(false);

    // store fetched product data
    const [data, setData] = useState<dataDataType[]>([]);

    console.log("start Search Page");


    const [isLoading, setIsLoading] = useState(true)


    // when search button clicked this triggers
    // const handleSearch = () => {
    //     setIsLoading(true)
    //     handleFetchSubCategories(searchKey, "1") // when new keyword added and click serach, we show new results in page 1
    // };

    // data fetching subCategories by this function
    const handleFetchSubCategories = async (parentCategoryId: string) => {

        console.log("sending parentId to Next.js get Child Categories API");

        const res = await fetch(
            "http://localhost:3000/api/category-home",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parentCategoryId),
            }
        );

        if (res.ok) {
            const responseData = await res.json();

            console.log("Data recived sucess");
            console.log(responseData);

            setErrorMessage("") // remove error message 
            setDataFetchError(false)
            setData(responseData)

            setIsLoading(false) // this stop display skeliton animation

        } else {
            const responseData = await res.json();
            setErrorMessage(responseData.message);
            setDataFetchError(true)
            setDataFetchError(false)
            setData([])
            console.log("********failed********")
        }
    };


    //this part triggers when component mounted. 
    // so this should work when user redirected from another page
    useEffect(() => {

        // get url parameters
        const parentCategoryId = searchParams.get("parentCategoryId");

        console.log("inside UseEffect : parentCategoryId :" + parentCategoryId)

        //send data to to API
        handleFetchSubCategories(parentCategoryId || "");

    }, [searchParams]); // when URL parameters change, then re-execute this useEffect


    return (

        <>
            <Navbar />

            <SearchBar />

            {/* parent component */}
            <div className="bg-white flex justify-center">
                <div className="flex flex-row  max-w-screen-lg w-full">

                    {/* left side- coded by madhushan    */}
                    <div className="hidden sm:flex sm:w-1/3 bg-gray-100">
                        <Category_Level_1 />
                    </div>

                    {/* right side */}
                    <div className="w-full mx-2 sm:mx-0 sm:w-2/3 min-h-svh">

                        <p className="text-2xl font-bold ml-2 my-1">
                            Shop by Cateogory
                        </p>

                        {!isLoading ? (
                            <div>
                                <SubCategories subCategoryData={data} errorMessage={errorMessage} />
                            </div>
                        ) : (
                            <SubCategoriesSkeliton />
                        )}



                    </div>
                </div>
            </div >

            <Footer />
        </>

    );
}
