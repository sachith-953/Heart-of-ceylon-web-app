'use client'

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import StatusUpdateDropdown from "@/components/dashboard/sellerDashboard/MySales/updateStatusDropDownMenu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SaleData {
    orderId: string;
    productId: number;
    productName: string;
    quantity: number;
    totalPrice: number;
    orderStatus: string;
}



const MySales = () => {
    const [data, setData] = useState<SaleData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // update status use states
    const [orderStatus, setOrderStatus] = useState(""); // set default empty string  

    const router = useRouter();
    const { toast } = useToast()

    const fetchSellerSales = async () => {
        try {
            setIsLoading(true);
            const res = await fetch('http://localhost:3000/api/seller-dashboard/get-seller-sales', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch seller sales data");
            }

            if (res.status === 403) {
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                })
                console.log("****403****************")
                console.log("SellerSales >>> Redirecting to login. RT error")
                router.push("/log-in");
                return;
            }

            const responseData: SaleData[] = await res.json();
            setData(responseData);
        } catch (error) {
            console.error("Error fetching seller sales:", error);
            setError("Failed to load data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

//
const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
        setIsLoading(true);
        const response = await fetch('http://localhost:3000/api/seller-dashboard/update-order-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId, newStatus }),
        });

        if (!response.ok) {
            throw new Error('Failed to update order status');
        }

        const updatedOrder = await response.json();

        // Update the local state with the new status
        setData(prevData => prevData.map(sale => 
            sale.orderId === orderId ? { ...sale, orderStatus: newStatus } : sale
        ));

        toast({
            title: "Status Updated",
            description: `Order ${orderId} status updated to ${newStatus}`,
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "Failed to update order status. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
};

    useEffect(() => {
        fetchSellerSales();
    }, []);

    // 
    useEffect(() => {
        
    }, []); // run the useEffect again and again when orderStatus change
    
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Sales</h1>
            
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Loading...</p>
                </div>
            ) : error ? (
                <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Product ID</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total Price</TableHead>
                                <TableHead>Order Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((sale) => (
                                <TableRow key={sale.orderId}>
                                    <TableCell>{sale.orderId}</TableCell>
                                    <TableCell>{sale.productId}</TableCell>
                                    <TableCell>{sale.productName}</TableCell>
                                    <TableCell>{sale.quantity}</TableCell>
                                    <TableCell>${sale.totalPrice.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            sale.orderStatus === 'Completed' 
                                                ? 'bg-green-100 text-green-800'
                                                : sale.orderStatus === 'Pending'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {sale.orderStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <StatusUpdateDropdown 
                                            onStatusChange={(newStatus) => handleStatusUpdate(sale.orderId, newStatus)} 
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-8">
                                        No sales data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default MySales;