"use client"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BuyerDetailsModal from "@/components/adminDashboard/POPUPwindows/MoreAboutRequestedOrderOPUPButton/MoreAboutRequestedOrderOPUPButton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import SearchBarForRequestedOrders from "./SearchBarForRequestedOrders";
import MoreAboutRequestedOrderOPUPButton from "@/components/adminDashboard/POPUPwindows/MoreAboutRequestedOrderOPUPButton/MoreAboutRequestedOrderOPUPButton";

interface RequestedOrderData {
  requestOrderId: number;
  requestedDate: string;
  requestedTime: string;
  productName: string;
  requestedQuantity: number;
  expectedPrice: number;
  totalPrice: number;
  orderStatus: string;
}

interface FormattedOrderData extends Omit<RequestedOrderData, 'expectedPrice' | 'totalPrice'> {
  expectedPrice: string;
  totalPrice: string;
}

const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString();
  } catch {
    return dateString;
  }
};

const formatTime = (timeString: string) => {
  try {
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return timeString;
  }
};

const formatPrice = (price: number) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  } catch {
    return `$${price}`;
  }
};

const RequestedOrders = () => {

  const [data, setData] = useState<FormattedOrderData[]>([]);
  const [reloadPage, setReloadPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const [selectedRequest, setRequestedProduct] = useState<number | null>(null);

  //this handle by child component >> SearchBarForAllOrderDetails
  const handleChildDataChange = (newChildData: FormattedOrderData[]) => {
    setData(newChildData)
    console.log("child data updated to parent data")
  };

  //this handle by child component >> SearchBarForAllOrderDetails
  const reloadParentFromChild = () => {
    // if reloadPage is ture, them make it false. do this to chenge the useState, se useEffect will re-run
    setReloadPage(!reloadPage);
  }

  const fetchRequestedOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin-dashboard/AllOrders/RequestwdOrders/get-requested-order-list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        if (res.status === 403) {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Please log in again.",
          });
          router.replace("/log-in");
          return;
        }

        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch orders');
      }

      const responseData: RequestedOrderData[] = await res.json();
      const formattedData: FormattedOrderData[] = responseData.map(order => ({
        ...order,
        requestedDate: formatDate(order.requestedDate),
        requestedTime: formatTime(order.requestedTime),
        expectedPrice: formatPrice(order.expectedPrice),
        totalPrice: formatPrice(order.totalPrice),
      }));

      setData(formattedData);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load orders';
      setError(message);
      toast({
        variant: "destructive",
        title: "Error",
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // handle view more details button
  const handleViewMoreDetails = (requestOrderId: number) => {
    setRequestedProduct(requestOrderId);
  };

  useEffect(() => {
    fetchRequestedOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadPage]);

  const filteredData = data.filter(order =>
    order.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">

      {/* search bar for requested orders */}
      <SearchBarForRequestedOrders
        onChildDataChange={handleChildDataChange}
        clearSearchResults={reloadParentFromChild}
      />

      <div className="rounded-md border ml-1">
        <div className="rounded-md border hover:bg-transparent">
          <Table className="border-3 border-black-200">
            <TableHeader className="bg-gray-300 rounded">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-black text-lg">Request ID</TableHead>
                <TableHead className="text-black text-lg">Date</TableHead>
                <TableHead className="text-black text-lg">Time</TableHead>
                <TableHead className="text-black text-lg">Product</TableHead>
                <TableHead className="text-black text-lg">Quantity</TableHead>
                <TableHead className="text-black text-lg">Expected Price</TableHead>
                <TableHead className="text-black text-lg">Total Price</TableHead>
                <TableHead className="text-black text-lg">Status</TableHead>
                <TableHead className="text-black text-lg">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    No orders found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((order) => (
                  <TableRow className="hover:bg-transparent" key={order.requestOrderId}>
                    <TableCell className="font-medium text-black">{order.requestOrderId}</TableCell>
                    <TableCell className="font-medium text-black">{order.requestedDate}</TableCell>
                    <TableCell className="font-medium text-black">{order.requestedTime}</TableCell>
                    <TableCell className="font-medium text-black">
                      {/* limit product name length */}
                      {order.productName.length > 62
                        ? `${order.productName.slice(0, 62)}...`
                        : order.productName}
                    </TableCell>
                    <TableCell className="font-medium text-black">{order.requestedQuantity}</TableCell>
                    <TableCell className="font-medium text-black">{order.expectedPrice}</TableCell>
                    <TableCell className="font-medium text-black">{order.totalPrice}</TableCell>
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
                        <MoreAboutRequestedOrderOPUPButton requestedOrderID = {order.requestOrderId}/>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RequestedOrders;