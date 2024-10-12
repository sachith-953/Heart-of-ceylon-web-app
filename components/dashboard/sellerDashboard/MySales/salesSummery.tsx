'use client'

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';

interface Data {
    totalRevenue: number;
    totalOrders: number;
}

const MySales = () => {
    const [data, setData] = useState<Data | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast()
    useEffect(() => {
        const fetchSalesSummary = async () => {
            try {
                setIsLoading(true);
                const res = await fetch('http://localhost:3000/api/seller-dashboard/get-sales-summery', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch sales summary data");
                }

                
                else if (res.status === 403) {
                    // this trigger when referesh token has issure. 
                    // if token is expired this will trigger
                    toast({
                        variant: "destructive", // red notification
                        title: "Sorry!",
                        description: "Please Login again. Your Session has Expired!",
                      })
                    console.log("****403****************")
                    console.log("SalesSummery >>> Redirectiong to login. RT error")
                    router.push("/log-in");
                }

                const responseData: Data = await res.json();  // fetch data comming from backend
                setData(responseData);
            } catch (error) {
                console.error("Error fetching sales summary:", error);
                setError("Failed to load data. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchSalesSummary();
    }, []);

    return (
        <div className='mt-10 bg-slate-400'>
            {/* this is for sales table */}
            {/* <div className='bg-cyan-300'>
                <h2>This is My sales tab content</h2>
                <p>all contents for my sales section should go to this component</p>
            </div> */}

            {/* this is for sales summary */}
            <div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : data ? (
                    <div>
                        <h1 className='text-3xl'>Sales Summary</h1>
                        <div className="mt-3">
                            <p className="text-2xl">Total Revenue: ${data.totalRevenue}</p>
                            <p className="text-2xl">Total Orders: {data.totalOrders}</p>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default MySales;