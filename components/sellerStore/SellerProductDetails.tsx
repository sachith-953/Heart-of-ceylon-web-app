"use client"

import { ArrowDownNarrowWide } from "lucide-react"
import ProductSkeliton from "../ProductSkeliton"
import SearchProductSortDropDown from "../SearchProductSortDropDown"
import Product from "../Product"
import { useState } from "react"

const SellerProductDetails = () => {


    const [errorMessage, setErrorMessage] = useState("");
    const [dataFetchError, setDataFetchError] = useState(false);
    const [sortMethod, setSortMethod] = useState("")
    const [isLoading, setIsLoading] = useState(true)

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

    //this handle by child component
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

    };

    const [data, setData] = useState<dataDataType[]>([]);

    return (
        <>
            <div className="bg-white">
                <div className="w-full mx-2 sm:mx-0 min-h-svh">

                    {/* sort option */}
                    <div className="flex flex-col sm:flex-row justify-between bg-gray-300 py-1 content-center px-2">

                        {/* totoal search results */}
                        <div className="mr-3 content-center text-sm sm:text-base">
                            <p>{} : 230 Results Found</p>
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
                    <div className="border-t border-gray-700 my-2"></div>

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


                </div>
            </div>
        </>
    )
}
export default SellerProductDetails