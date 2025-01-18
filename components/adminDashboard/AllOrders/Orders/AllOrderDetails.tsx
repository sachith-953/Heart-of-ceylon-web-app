"use client"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
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

interface ApiResponse {
  content: OrderData[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInfo, setPageInfo] = useState<{
    currentPage: number;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
    totalElements: number;
    pageSize: number;
  }>({
    currentPage: 0,
    totalPages: 0,
    isFirst: true,
    isLast: false,
    totalElements: 0,
    pageSize: 50,
  });

  const router = useRouter();
  const { toast } = useToast();

  const handleChildDataChange = (newChildData: OrderData[]) => {
    setData(newChildData);
  };

  const fetchOrderDetails = async (page: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin-dashboard/AllOrders/Orders/get-50-order-details`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requestedPage: page }),
        }
      );

      if (!res.ok) {
        if (res.status === 403) {
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Please login again to continue.",
          });
          router.push("/log-in");
          return;
        }
        throw new Error('Failed to fetch orders');
      }

      const responseData: ApiResponse = await res.json();
      
      setData(responseData.content);
      setPageInfo({
        currentPage: responseData.number,
        totalPages: responseData.totalPages,
        isFirst: responseData.first,
        isLast: responseData.last,
        totalElements: responseData.totalElements,
        pageSize: responseData.size,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to load orders. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load orders. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if (!pageInfo.isLast) {
      fetchOrderDetails(pageInfo.currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (!pageInfo.isFirst) {
      fetchOrderDetails(pageInfo.currentPage - 1);
    }
  };

  useEffect(() => {
    fetchOrderDetails(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-500 text-center">{error}</div>
        <Button onClick={() => fetchOrderDetails(pageInfo.currentPage)} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  const startEntry = pageInfo.currentPage * pageInfo.pageSize + 1;
  const endEntry = Math.min(
    (pageInfo.currentPage + 1) * pageInfo.pageSize,
    pageInfo.totalElements
  );

  return (
    <div className="space-y-4">
      <SearchBarForAllOrderDetails
        onChildDataChange={handleChildDataChange}
        clearSearchResults={() => fetchOrderDetails(0)}
      />

      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-semibold">Orders</h2>
        <span className="text-sm text-gray-500">
          Showing {startEntry}-{endEntry} of {pageInfo.totalElements} entries
        </span>
      </div>

      <div className="rounded-md border ml-1">
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
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              data.map((order) => (
                <TableRow className="hover:bg-transparent" key={order.orderId}>
                  <TableCell className="font-medium text-black">{order.orderId}</TableCell>
                  <TableCell className="font-medium text-black">{formatDate(order.orderDateTime)}</TableCell>
                  <TableCell className="font-medium text-black">{formatTime(order.orderDateTime)}</TableCell>
                  <TableCell className="font-medium text-black">
                    {order.productName.length > 62
                      ? `${order.productName.slice(0, 62)}...`
                      : order.productName}
                  </TableCell>
                  <TableCell className="font-medium text-black">{order.quantity}</TableCell>
                  <TableCell className="font-medium text-black">{formatPrice(order.productPrice)}</TableCell>
                  <TableCell className="font-medium text-black">{formatPrice(order.totalPrice)}</TableCell>
                  <TableCell className="font-medium text-black">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.orderStatus === 'PENDING' ? 'bg-blue-100 text-blue-800' :
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
                    <MoreAboutAnOrderPOPUPButton orderID={order.orderId} OrderQuantity={order.quantity}/>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-gray-500">
          Page {pageInfo.currentPage + 1} of {pageInfo.totalPages}
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={handlePreviousPage}
            disabled={pageInfo.isFirst}
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={pageInfo.isLast}
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AllOrderDetails;