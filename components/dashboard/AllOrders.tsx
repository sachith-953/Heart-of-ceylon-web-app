"use client"

import { useEffect, useState } from "react";
import MaxWidthLg from "../MaxWidthLg";
import ErrorForCatch from "../ErrorForCatch";
import { cn } from "@/lib/utils";
import Image from "next/image";

const AllOrders = () => {

    interface dataDataType {
        expectedDeliveryDate: string
        orderDateTime: string
        orderId: number
        orderStatus: string
        productID: number
        productMainImage: string
        productName: string
        quantity: number
        sellerId: number
        shippingCost: number
        totalPrice: number
    }

    const [data, setData] = useState<dataDataType[]>([]);

    const [isLoading, setIsLoading] = useState(true)

    const [isViewAll, setIsViewAll] = useState(false)

    const dataFetching = async () => {

        try {

            console.log("fetch All Orders start");

            const res = await fetch(
                "http://localhost:3000/api/buyer/dashboard/get-all-orders",
                { cache: 'no-store' }
            );

            if (res.ok) {
                const responseData = await res.json();
                console.log(responseData);
                setData(responseData)
                setIsLoading(false)
            }
            else {
                const responseData = await res.json();
                console.log(responseData)
                console.log("********failed********")
                setIsLoading(true)
            }
        }
        catch (error) {
            return (
                <>
                    <ErrorForCatch />
                </>
            )
        }
    };


    useEffect(() => {

        dataFetching()

    }, []);


    return (
        <>
            {/* Parent Containter */}
            <div className="mt-4">
                {/* header and View all button */}
                <div className="flex flex-row justify-between mb-3">

                    <span className="text-2xl font-bold">Recent Orders</span>

                    <span onClick={() => {
                        setIsViewAll(!isViewAll)
                    }}
                        className={`text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer ${isViewAll ? "bg-gray-200" : ""}`}>
                        View All
                    </span>
                </div>

                {/* order cart holder */}
                <div>

                    {/* order cart */}
                    <div className="flex flex-row bg-gray-200 p-5">

                        {/* product image */}
                        <div className="w-1/5 border-2 border-yellow-500">
                            <Image
                                src={"https://www.bigbasket.com/media/uploads/p/l/1213602_4-b-natural-juice-guava-gush.jpg"}
                                width={2000}
                                height={2000}
                                alt="sample image"

                                style={{
                                    objectFit: "cover",
                                    maxWidth: "auto%",
                                    // height: "100%",
                                }}
                            />
                        </div>

                        {/* order details */}
                        <div className="w-4/5 border-2 p-3 border-yellow-500">
                                <p className="text-xl font-semibold">
                                    Black Peller 100g packs, grinded organic nice spices made in Sri Lanka
                                </p>
                                <p className="text-lg font-medium text-blue-700">
                                    Kandy Spice Store
                                    </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                                    <p>Order Number : 2018237</p>
                                    <p>Order Date : 01/01/2024</p>
                                    <p>Status : <span className="text-red-600">PENDING</span></p>
                                    <p>Quantity : 2</p>
                                    <p>Total Price : $239.02</p>
                                </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default AllOrders