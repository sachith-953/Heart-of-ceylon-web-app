'use client'

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import StatusUpdateDropdown from "@/components/dashboard/sellerDashboard/MySales/updateStatusDropDownMenu"
import classNames from 'classnames';
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
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/seller-dashboard/get-seller-sales`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if(res.ok){
                const responseData: SaleData[] = await res.json();
                setData(responseData);
            }
            
            else if (res.status === 403) { // 403 error come from route--> expire refresh token
                // this trigger when referesh token has issure. 
                // if token is expired this will trigger
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                })
                console.log("**** FetchSellerSales >> 403 ****************")
                console.log("Redirectiong to login. RT error")
                router.push("/seller-log-in");
            }
            else{
                const data = await res.json(); // this from route catch block or else block
                // show error notification in red color
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Plase Try Again. There was a problem with your request." + data.message,
                })
                console.error('Error fetching seller sales!:', res.status);
            }

            
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/seller-dashboard/update-order-status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId, newStatus }),
        });

        if (response.ok) {
        const updatedOrder = await response.json();
        // Update the local state with the new status
        setData(prevData => prevData.map(sale => 
            sale.orderId === orderId ? { ...sale, orderStatus: newStatus } : sale
        ));
        toast({
            title: "Status Updated",
            description: `Order ${orderId} status updated to ${newStatus}`,
        });
        }
        else if(response.status === 403){ // 403 error come from route--> expire refresh token
            // this trigger when referesh token has issure. 
                // if token is expired this will trigger
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                })
                console.log("**** UpdateOrderStatus >> 403 ****************")
                console.log("Redirectiong to login. RT error")
                router.push("/seller-log-in");
        }
        else{
            const data = await response.json();
                // show error notification in red color
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Plase Try Again. There was a problem with your request." + data.message,
                })
                console.error('Error fetching seller sales!:', response.status);
        }
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

const getStatusStyle = (status: string | undefined) => {
    if (!status) return 'bg-gray-100 text-gray-800'; // Default style for undefined/null status

    const styles: Record<string, string> = {
        'processing': 'bg-green-200 text-green-800',
        'pending': 'bg-yellow-200 text-yellow-800',
        'cancelled': 'bg-red-400 text-red-800',
        'delivered':'bg-blue-200 text-blue-800',
        'shipped':'bg-purple-200 text-purple-800'
        // Add more statuses here as needed
        // , , SHIPPED, , 
    };

    return styles[status.toLowerCase()] || 'bg-gray-100 text-gray-800'; // Fallback style
};


    useEffect(() => {
        fetchSellerSales();
    }, []);

    // 
    useEffect(() => {
        
    }, []); // run the useEffect again and again when orderStatus change
    
    return (
        <div className="p-6 bg-gray-200 rounded ml-2">
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
            <div className="rounded-md border ml-1">
                <Table className="border-3 border-black-200">
                    <TableHeader className="bg-gray-300 rounded">
                        <TableRow className="hover:bg-transparent">
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
                            <TableRow key={sale.orderId} className="hover:bg-transparent"> {/* Explicitly set hover:bg-transparent */}
                                <TableCell>{sale.orderId}</TableCell>
                                <TableCell>{sale.productId}</TableCell>
                                <TableCell title={sale.productName}>
                                    {/* if the product name more than 25 length it handles here */}
                                    {sale.productName.length > 25 
                                        ? `${sale.productName.substring(0, 25)}...`
                                        : sale.productName}
                                </TableCell>
                                <TableCell>{sale.quantity}</TableCell>
                                <TableCell>${sale.totalPrice.toFixed(2)}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(sale.orderStatus)}`}>
                                        {sale.orderStatus || 'Unknown'}
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