"use client"

import { useEffect } from "react";

const AllOrders = () => {


    const handleProductSearch = async () => {

        try {
            console.log("fetch All Orders start");

            const res = await fetch(
                "http://localhost:3000/api/buyer/dashboard/getAllOrders", 
                { cache: 'no-store' }
            );

            if (res.ok) {
                const responseData = await res.json();
                console.log(responseData);
            } else {
                const responseData = await res.json();
                console.log(responseData)
                console.log("********failed********")
            }

        }
        catch (error) {
            return new Response(JSON.stringify({
                error: {
                    message: "Un Expected Error"
                }
            }), { status: 500 });
        }
    };

    useEffect(() => {

        handleProductSearch()

    }, []);


    return (
        <>
            {/* Parent Containter */}
            <div className="mt-4">
                {/* header and View all button */}
                <div className="flex flex-row justify-between">
                    <span className="text-2xl font-bold">Recent Orders</span>
                    <span className="text-blue-700 hover:bg-blue-300 hover:text-black content-center px-2 rounded-xl cursor-pointer">View All</span>
                </div>

                {/* order carts */}
                <div></div>
            </div>
        </>
    )
}

export default AllOrders