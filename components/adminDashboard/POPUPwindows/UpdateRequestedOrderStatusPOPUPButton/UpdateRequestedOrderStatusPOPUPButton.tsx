import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Loader2,
    Mail,
    Phone,
    MapPin,
    Store,
    Star,
} from "lucide-react";


interface ChildProps {
    requestedOrderID: number;
    orderStatus: string; 
    onUpdateRequestedOrderStatus: () => void;
}


const UpdateRequestedOrderStatusPOPUPButton: React.FC<ChildProps> = ({ requestedOrderID,orderStatus, onUpdateRequestedOrderStatus }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); 
    const { toast } = useToast();
    const BASE_URL = process.env.NEXT_PUBLIC_URL;
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    
  const handleUpdateRequestedOrderStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `${BASE_URL}/api/admin-dashboard/POPUPwindows/POPUP-update-requested-order-status`,
        {
          // Fixed template literal
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ requestedOrderID, orderStatus}),
          credentials: "include",
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        toast({
          title: "Success",
          description:
            responseData.message || "Update--> requested order status successfully",
        });
        onUpdateRequestedOrderStatus(); // Refresh the product list
        setIsOpen(false); // Close the dialog after successful suspension
      } else if (res.status === 403) {
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
      console.error("Error Update--> requested order status:", error);
      setError("Failed to Update--> requested order status. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to Update--> requested order status. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black"
        >
          <span>Update</span>{" "}
          {/* Removed text-red-500 since button is already red */}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">Update requested order Status</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to Update this order status?</p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleUpdateRequestedOrderStatus}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Updating...
                </span>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRequestedOrderStatusPOPUPButton;