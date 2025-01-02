"use client"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AllDetailsModal from "@/components/adminDashboard/POPUPwindows/MoreAboutAnOrderPOPUPButton/MoreAboutAnOrderPOPUPButton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import SearchBarForAllOrderDetails from "./SearchBarForAllOrderDetails";
import MoreAboutAnOrderPOPUPButton from "@/components/adminDashboard/POPUPwindows/MoreAboutAnOrderPOPUPButton/MoreAboutAnOrderPOPUPButton";

interface OrderData {
  orderId: number;
  orderDateTime: string;
  productName: string;
  quantity: number;
  productPrice: number;
  totalPrice: number;
  orderStatus: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString();
};

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
};

const AllOrderDetails = () => {

  const [data, setData] = useState<OrderData[]>([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [orderQuantity, setQuantity] = useState<number | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  //this handle by child component >> SearchBarForAllOrderDetails
  const handleChildDataChange = (newChildData: OrderData[]) => {
    setData(newChildData)
    console.log("child data updated to parent data")
  };

  //this handle by child component >> SearchBarForAllOrderDetails
  const reloadParentFromChild = () => {
    // if reloadPage is ture, them make it false. do this to chenge the useState, se useEffect will re-run
    setReloadPage(!reloadPage);
  }

  const fetchAdminDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3000/api/admin-dashboard/AllOrders/Orders/get-50-order-details', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const responseData: OrderData[] = await res.json();
        setData(responseData);
      } else if (res.status === 403) {
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        router.push("/log-in");
      } else {
        const errorData = await res.json();
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "Please Try Again. There was a problem with your request." + errorData.message,
        });
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("Failed to load order data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // handle view more details button
  const handleViewMoreDetails = (orderId: number,quantity:number ) => {
    setSelectedOrder(orderId);
    setQuantity(quantity);
  };

  useEffect(() => {
    fetchAdminDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadPage]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="space-y-4">

      <SearchBarForAllOrderDetails
        onChildDataChange={handleChildDataChange}
        clearSearchResults={reloadParentFromChild}
      />

      <div className="rounded-md border ml-1">
        <div className="rounded-md border hover:bg-transparent">
          <Table className="border-3 border-black-200">
            <TableHeader className="bg-gray-300 rounded">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-black text-lg">ID</TableHead>
                <TableHead className="text-black text-lg">Date</TableHead>
                <TableHead className="text-black text-lg">Time</TableHead>
                <TableHead className="text-black text-lg">Product</TableHead>
                <TableHead className="text-black text-lg">Quantity</TableHead>
                <TableHead className="text-black text-lg">Unit Price</TableHead>
                <TableHead className="text-black text-lg">Total Price</TableHead>
                <TableHead className="text-black text-lg">Status</TableHead>
                <TableHead className="text-black text-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <TableRow className="hover:bg-transparent" key={order.orderId}>
                  <TableCell className="font-medium text-black">{order.orderId}</TableCell>
                  <TableCell className="font-medium text-black">{formatDate(order.orderDateTime)}</TableCell>
                  <TableCell className="font-medium text-black">{formatTime(order.orderDateTime)}</TableCell>
                  <TableCell className="font-medium text-black">
                    {/* limit the product name to 62 characters */}
                    {order.productName.length > 62
                      ? `${order.productName.slice(0, 62)}...`
                      : order.productName}
                  </TableCell>
                  <TableCell className="font-medium text-black">{order.quantity}</TableCell>
                  <TableCell className="font-medium text-black">{formatPrice(order.productPrice)}</TableCell>
                  <TableCell className="font-medium text-black">{formatPrice(order.totalPrice)}</TableCell>
                  <TableCell className="font-medium text-black">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.orderStatus === 'PENDING' ? 'bg-blue-100 text-blue-800' :
                        order.orderStatus === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                          order.orderStatus === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                            order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                              order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                'bg-gray-100 text-gray-800'
                      }`}>
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-black">
                    {/* more button */}
                  <MoreAboutAnOrderPOPUPButton orderID={order.orderId} OrderQuantity={order.quantity}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default AllOrderDetails;