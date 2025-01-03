import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Mail, Phone, MapPin, Store, Star } from "lucide-react";
import UpdateRequestedOrderStatusPOPUPButton from "../UpdateRequestedOrderStatusPOPUPButton/UpdateRequestedOrderStatusPOPUPButton";

interface MoreDetailsOfARequestedOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestedOrderID: number;
}

interface BuyertDetails {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNo: string;
  shippingAddress: string;
  city: string;
  country: string;
}

export enum RequestedOrderStatusEnum {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

interface RequestedOrderDetails {
  requestOrderId: number;
  productName: string;
  requestedDate: string;
  requestedTime: string;
  expectedPrice: number;
  requestedQuantity: number;
  description: string;
  orderStatus: RequestedOrderStatusEnum;
  comment: string;
  supplierResponse: string;
}

interface ChildProps {
  requestedOrderID: number;
}

const MoreAboutRequestedOrderOPUPButton: React.FC<ChildProps> = ({
  requestedOrderID,
}) => {
  const [buyer, setBuyer] = React.useState<BuyertDetails | null>(null);
  const [order, setOrder] = React.useState<RequestedOrderDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const [reloadPage, setReloadPage] = useState(false);
  const [selectedStatus, setSelectedStatus] =
    useState<RequestedOrderStatusEnum>(
      order?.orderStatus || RequestedOrderStatusEnum.PENDING
    );

  const fetchBuyerDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin-dashboard/POPUPwindows/POPUP-get-buyer-for-a-requested-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestedOrderID }),
          credentials: "include",
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        setBuyer(responseData);
      } else if (res.status === 403) {
        setBuyer(null);
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
        router.push("/seller-log-in");
      } else {
        const errorData = await res.json();
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description:
            "Please Try Again. There was a problem with your request. " +
            errorData.message,
        });
      }
    } catch (error) {
      console.error(
        "Error fetching buyer details for a requested order:",
        error
      );
      setError("Failed to load buyer data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReqOrderDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin-dashboard/POPUPwindows/POPUP-get-requested-order-details-by-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestedOrderID }),
          credentials: "include",
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        setOrder(responseData);
      } else if (res.status === 403) {
        setOrder(null);
        toast({
          variant: "destructive",
          title: "Sorry!",
          description: "Please Login again. Your Session has Expired!",
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
        router.push("/seller-log-in");
      } else {
        const errorData = await res.json();
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description:
            "Please Try Again. There was a problem with your request. " +
            errorData.message,
        });
      }
    } catch (error) {
      console.error("Error fetching requested order details:", error);
      setError("Failed to load requested order data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateRequestedOrderStatus = async () => {
    // Refresh the data after a product is suspended
    setReloadPage((prev) => !prev); // This will trigger a re-fetch of data
    toast({
      title: "Status updated Updated successfully",
      description: "The requested order status updated successfully!",
    });
  };

  //handle status update
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value as RequestedOrderStatusEnum);
  };

  useEffect(() => {
    if (requestedOrderID !== null && requestedOrderID !== 0) {
      fetchBuyerDetails();
      fetchReqOrderDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updated useEffect to include reloadPage as a dependency
  useEffect(() => {
    if (requestedOrderID !== null && requestedOrderID !== 0) {
      fetchReqOrderDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestedOrderID, reloadPage]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* this button is the on which visible to outside */}
        <Button
          variant="outline"
          className="bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black"
        >
          More
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-full h-full p-6">
        <DialogHeader className="">
          <DialogTitle className="text-xl font-bold text-black text-center rounded-md p-2">
            All Details About Requested Order
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-[60vh]">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">{error}</div>
        ) : (
          <div className="overflow-y-auto">
            {/* Buyer Details */}
            {buyer && (
              <div className="p-4   rounded-md m-1">
                <div className="text-3xl font-bold text-black p-1 ml-20">
                  Buyer Details For the Requested Order
                </div>

                <div className="flex items-center mt-4 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Name:</span>
                  {buyer.firstName} {buyer.lastName}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">ID:</span>
                  {buyer.id}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <MapPin className="mr-1" />
                  <span className="font-bold mr-2">Shipping Address:</span>
                  {buyer.shippingAddress}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <Phone className="mr-1" />
                  <span className="font-bold mr-2">Phone:</span>
                  {buyer.phoneNo}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <Mail className="mr-1" />
                  <span className="font-bold mr-2">Email:</span>
                  {buyer.email}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Country:</span>
                  {buyer.country}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">City:</span>
                  {buyer.city}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Gender:</span>
                  {buyer.gender}
                </div>
              </div>
            )}

            {/* Requested Order Details */}
            {order && (
              <div className="p-4  rounded-md m-1">
                <div className="text-3xl font-bold text-black p-1 ml-20">
                  Requested Order Details
                </div>

                <div className="flex mt-8 text-lg font-semi-bold text-black ml-10 p-1">
                  <span className="font-bold mr-2">Order Status: </span>
                  <Badge className="bg-green-300 text-black px-3 py-1 mt-1">
                    <p className="text-sm ">{order.orderStatus}</p>
                  </Badge>

                  <select
                    className="rounded-md border border-gray-300 focus:outline-none focus:ring-2 text-black bg-gray-400 ml-20"
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    {Object.values(RequestedOrderStatusEnum).map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {/* update req order status button */}
                  <div className="ml-4">
                    <UpdateRequestedOrderStatusPOPUPButton
                      requestedOrderID={order.requestOrderId}
                      orderStatus={selectedStatus}
                      onUpdateRequestedOrderStatus={
                        onUpdateRequestedOrderStatus
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Request Order ID:</span>
                  {order.requestOrderId}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Product Name:</span>
                  {order.productName}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Requested Date:</span>
                  {order.requestedDate}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Requested Time:</span>
                  {order.requestedTime}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Expected Price:</span>
                  {order.expectedPrice}
                </div>
                <div className="flex items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Requested Quantity:</span>
                  {order.requestedQuantity}
                </div>
                <div className="items-center mt-2 text-lg font-semi-bold text-black ml-10 ">
                  <span className="font-bold mr-2">Description:</span>
                  <div className="ml-4 bg-gray-300 rounded-md w-3/4">
                    {order.description}
                  </div>
                </div>
                <div className="items-center mt-2 text-lg font-semi-bold text-black ml-10 ">
                  <span className="font-bold mr-2">Supplier Response:</span>
                  <div className="ml-4 bg-gray-300 rounded-md w-3/4">
                    {order.supplierResponse}
                  </div>
                </div>

                <div className="items-center mt-2 text-lg font-semi-bold text-black ml-10">
                  <span className="font-bold mr-2">Note:</span>
                  <div className="ml-4 bg-gray-300 rounded-md w-3/4">
                    {order.comment}
                  </div>
                </div>
                <div className="ml-10 mt-4">
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-blue-600 w-1/6 hover:bg-blue-800 text-white hover:text-black"
                  >
                    {/* onclick handle popup window */}
                    Update Note
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MoreAboutRequestedOrderOPUPButton;
