"use client";

import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import Category_Level_1 from "@/components/CategoryLevel1";
import SearchProductSortDropDown from "@/components/SearchProductSortDropDown";
import { ArrowDownNarrowWide, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductSkeliton from "@/components/ProductSkeliton";
import CategoryLevel1Skeliton from "@/components/CategoryLevel1Skeliton";
import Link from "next/link";
import SearchBarForSearchProduct from "@/components/ProductSearchBar";

/**
 * This page call API in two instances 
 * 1. when user redirected to this page, by useState() call API to fetch data according to URL params
 * 2. when user enter search keyword to search input and click the search button, onclick action call the API. 
 * this both actions send requst to backend requesting page 1 data.
 * 
 * when user click in next and previous buttons, user redirect again to this page but with requestedPage url param with (currentPage + 1) or (currentPage - 1)
 * 
 */

export default function SearchPage() {

    //TODO : add this to env file
    const PRODUCTS_PER_PRODUCT_SEARCH_RESULT = 4;


    //get parameters
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query");

    console.log("data recived : " + searchQuery)

    interface dataDataType {
        productAvailableStokes: number
        productID: number
        productMainImage: string
        productName: string
        productNoOfRatings: number
        productPrice: number
        productRatings: number
        productTotalItemSold: number
        //todo : add seller details
        // change this in product.tsx too
    }

    //for response handling 
    const [errorMessage, setErrorMessage] = useState("");
    const [dataFetchError, setDataFetchError] = useState(false);

    // store fetched product data
    const [data, setData] = useState<dataDataType[]>([]);

    console.log("start Search Page");

    // store search keyword 
    const [searchKey, setSearchKey] = useState("");

    const [sortMethod, setSortMethod] = useState("")

    const [isLoading, setIsLoading] = useState(true)

    // totoal rows matching for the keyword in database
    const [totoalResultFound, setTotalResultFound] = useState(0)

    // page user currently visited 
    const [currentPage, setCurrentPage] = useState("1")


    //this handle by child component. 
    // use to get sort method selection
    const handleChildDataChange = (newChildData: string) => {
        setSortMethod(newChildData);
        console.log("sort method set to :", newChildData)

        // sorting based on sortingMethod selected
        const sortedData = [...data].sort((a, b) => {
            switch (newChildData) {
                case "Price":
                    return a.productPrice - b.productPrice;
                case "Ratings":
                    return b.productRatings - a.productRatings;
                case "Top Selling":
                    return b.productTotalItemSold - a.productTotalItemSold;
                default:
                    return 0;
            }
        });
        setData(sortedData)
        console.log("******data*******")
        console.log(data)
        console.log("******sortedData*******")
        console.log(sortedData)
    };

    // when search button clicked this triggers
    const handleSearch = () => {
        console.log(searchKey)
        setIsLoading(true)
        handleProductSearch(searchKey, "1") // when new keyword added and click serach, we show new results in page 1
    };

    // data fetching handle by this function
    const handleProductSearch = async (searchKeyParam: string, requestedPage: string) => {

        console.log("sending keyword to Next.js Search Product API");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_URL}/api/product/search`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ searchKeyParam, requestedPage }),
            }
        );

        if (res.ok) {
            const responseData = await res.json();

            console.log("Data recived sucess");
            console.log(responseData);

            setErrorMessage("") // remove error message 
            setDataFetchError(false)
            setData(responseData.productList) // add data to data useState

            console.log("responseData.productList");

            setTotalResultFound(responseData.totalResults)

            setIsLoading(false) // this stop display skeliton animation

        } else {
            const responseData = await res.json();
            setErrorMessage(responseData.message);
            setDataFetchError(true)
            console.log("********failed********")
        }
    };


    //this part triggers when component mounted. 
    // so this should work when user redirected from the home page
    useEffect(() => {

        // get url parameters
        const searchQuery = searchParams.get("query");
        const page = searchParams.get("page")

        console.log("inside UseEffect : searchQuery :" + searchQuery)
        console.log("inside UseEffect : page :" + page)

        //set vales to use state
        setSearchKey(searchQuery || "") //assign "" if searchQuery is null
        setCurrentPage(page || "1") // if page is null, set 1 as default value

        console.log("inside UseEffect => searchKey :" + searchKey + "page :" + page)


        //send data to to API
        handleProductSearch(searchQuery || "", page || "1");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]); // without [] this run non-stop
    // we add variable names inside [] to ensure useEffect re-excecure when theose variable change values


    return (

        <>
            <Navbar />

            <SearchBarForSearchProduct />

            <div>
                <h2>{errorMessage === "" ? <p></p> : <p className="justify-center">errorMessage</p>}</h2>
                {/* Render search results */}
            </div>



            {/* *********************other parts*********************** */}

            {/* parent component */}
            <div className="bg-white flex justify-center">
                <div className="flex flex-row  max-w-screen-lg w-full">

                    {/* left side- coded by madhushan    */}
                    <div className="hidden sm:flex sm:w-1/3 bg-gray-100">
                        <Category_Level_1 />
                    </div>


                    {/* right side */}
                    <div className="w-full mx-2 sm:mx-0 sm:w-2/3 min-h-svh">

                        {/* sort option */}
                        <div className="flex flex-col sm:flex-row justify-between bg-gray-300 py-1 content-center px-2">

                            {/* totoal search results */}
                            <div className="mr-3 content-center text-sm sm:text-base">
                                <p>{"'"}{searchKey}{"'"}: Total {totoalResultFound} Results Found</p>
                            </div>

                            {/* Sort option */}
                            <div className="flex flex-row content-center">
                                <div className="content-center">
                                    <ArrowDownNarrowWide className="mr-2" />
                                </div>

                                <p className="mr-3 content-center">Sort By:</p>
                                {/* add shadcn drop drown here */}
                                {/* https://ui.shadcn.com/docs/components/dropdown-menu */}
                                <SearchProductSortDropDown onChildDataChange={handleChildDataChange} />

                            </div>

                        </div>

                        {/* horizontal black line */}
                        <div className="border-t border-gray-700 my-2">

                        </div>

                        {/* Product Card */}
                        {isLoading
                            ?
                            <div>
                                <ProductSkeliton />
                                <ProductSkeliton />
                                <ProductSkeliton />
                                <ProductSkeliton />
                                <ProductSkeliton />
                            </div>
                            :
                            <Product productData={data} />
                        }

                        {/* Pagination section */}
                        <div className="flex flex-row justify-center gap-2 mb-10 mt-3">
                            {/* previous */}
                            <div className="flex flex-row justify-center">
                                {currentPage === "1" ? (
                                    <div className="flex flex-row justify-center content-center pl-1 pr-3 py-1 rounded-lg bg-gray-200 text-gray-400 border-2 opacity-50 cursor-not-allowed">
                                        <div className="content-center">
                                            <ChevronLeft className="h-4 w-4" />
                                        </div>
                                        <span>Previous</span>
                                    </div>
                                ) : (
                                    <Link
                                        className="flex flex-row justify-center content-center pl-1 pr-3 py-1 rounded-lg hover:bg-gray-600 bg-gray-200 hover:text-white border-2"
                                        href={{
                                            pathname: "/search-products",
                                            query: {
                                                query: searchKey,
                                                page: String(Number(currentPage) - 1),
                                            },
                                        }}
                                    >
                                        <div className="content-center">
                                            <ChevronLeft className="h-4 w-4" />
                                        </div>
                                        <span>Previous</span>
                                    </Link>
                                )}
                            </div>

                            {/* current page / total pages */}
                            <div className="flex flex-row justify-center">
                                <div className="flex flex-row justify-center content-center px-1 py-1 rounded-lg bg-white border-2 border-gray-300">
                                    <span>
                                        {currentPage} /{" "}
                                        {totoalResultFound > 0
                                            ? Math.ceil(totoalResultFound / PRODUCTS_PER_PRODUCT_SEARCH_RESULT)
                                            : 1}
                                    </span>
                                </div>
                            </div>

                            {/* next */}
                            <div className="flex flex-row justify-center">
                                {currentPage === String(Math.ceil(totoalResultFound / PRODUCTS_PER_PRODUCT_SEARCH_RESULT)) ? (
                                    <div className="flex flex-row justify-center content-center pl-5 pr-3 py-1 rounded-lg bg-gray-200 text-gray-400 border-2 opacity-50 cursor-not-allowed">
                                        <span>Next</span>
                                        <div className="content-center">
                                            <ChevronRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        className="flex flex-row justify-center content-center pl-5 pr-3 py-1 rounded-lg hover:bg-gray-600 bg-gray-200 hover:text-white border-2"
                                        href={{
                                            pathname: "/search-products",
                                            query: {
                                                query: searchKey,
                                                page: String(Number(currentPage) + 1),
                                            },
                                        }}
                                    >
                                        <span>Next</span>
                                        <div className="content-center">
                                            <ChevronRight className="h-4 w-4" />
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
            </div >

            <Footer />
        </>

    );
}
