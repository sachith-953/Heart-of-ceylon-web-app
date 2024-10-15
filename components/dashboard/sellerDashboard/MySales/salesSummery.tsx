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
    const { toast } = useToast();

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
            } else if (res.status === 403) {
                toast({
                    variant: "destructive", // red notification
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                console.log("****403****************");
                console.log("SalesSummery >>> Redirecting to login. RT error");
                router.push("/log-in");
            }

            const responseData: Data = await res.json();
            setData(responseData);
        } catch (error) {
            console.error("Error fetching sales summary:", error);
            setError("Failed to load data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSalesSummary();
    }, []);

    // Function to handle refresh button click
    const handleRefresh = () => {
        fetchSalesSummary();
    };

    return (
        <div className='mt-2 bg-gray-300 rounded ml-2'>
            <div className="ml-5">
                <div className="flex justify-between items-center">
                    <h1 className='text-2xl font-sans font-bold'>Sales Summary</h1>
                    
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : data ? (
                    <div className="mt-3">
                        <p className="text-2xl">Total Revenue: ${data.totalRevenue}</p>
                        <p className="text-2xl">Total Orders: {data.totalOrders}</p>
                    </div>
                ) : null}
            </div>
            <button
                onClick={handleRefresh}
                className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl ml-5 mt-3 mb-2"
            >
                Refresh
            </button>
        </div>
    );
};

export default MySales;
