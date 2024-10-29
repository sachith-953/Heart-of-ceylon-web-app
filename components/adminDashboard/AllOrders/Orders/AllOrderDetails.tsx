"use client"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const fetchAdminDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3000/api/admin-dashboard/get-50-order-details', {
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
        router.push("/seller-log-in");
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

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // If search is empty, fetch all orders
      fetchAdminDetails();
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3000/api/admin-dashboard/search-an-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (res.ok) {
        const responseData = await res.json();
        setData(responseData);
      } else if (res.status === 403) {
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        router.push("/seller-log-in");
      } else {
        const errorData = await res.json();
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "Please Try Again. There was a problem with your request." + errorData.message,
        });
      }
    } catch (error) {
      console.error("Error searching orders:", error);
      toast({
        variant: "destructive",
        title: "Search failed",
        description: "Failed to search orders. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    // ****************************************************************************
    // ********* todo : search orders , route is completed --> search-an-order **********************************************
    // ******************************************************************************
    <div className="space-y-4">
      <MaxWidthWrapper>
        <div className="flex flex-col gap-10 items-center p-6 ">
          <div className="items-start flex flex-row w-full sm:w-2/3 max-w-96 sm:max-w-screen-md">
            <div className="relative flex flex-col w-full">
              <div className="flex flex-row w-full">
                <input 
                  type="text" 
                  className="z-40 px-5 py-1 w-full sm:px-5 sm:py-3 flex-1 text-zinc-600 bg-slate-300 focus:big-black rounded-l-3xl focus:outline-none focus:bg-gray-300"
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button 
                  className="z-40 bg-gray-300 px-6 rounded-r-3xl ml-px hover:bg-gray-600 hover:text-white"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>

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
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      More
                    </Button>
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