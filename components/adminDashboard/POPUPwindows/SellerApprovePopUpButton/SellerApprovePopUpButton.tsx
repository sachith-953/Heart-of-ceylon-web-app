import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Phone, MapPin, Store, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToBeVerifiedSellerStore {
  sellerId: number;
  storeName: string;
  sellerEmail: string;
  profilePicture: string;
  storeDescription: string;
  storeAddress: string;
  phoneNo: string;
  accountCreatedDate: string;
  sellerStatus: string;
  reason?: string;
  categories: string;
}

const SellerApprovePopUpButton: React.FC<{
  sellerId: number;
  onSellerApproval: () => void;
}> = ({ sellerId, onSellerApproval }) => {
  
  const [seller, setSeller] = React.useState<ToBeVerifiedSellerStore | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const BASE_URL = process.env.NEXT_PUBLIC_URL;
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const fetchSellerStore = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      setError(null);
      const res = await fetch(
        `${BASE_URL}api/admin-dashboard/seller-verification/get-not-verified-seller-store`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sellerId, }),
        }
      );

      console.log("sellerId >>>" + sellerId)

      if (res.ok) {
        const responseData = await res.json();
        setSeller(responseData);
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
          description:
            "Please Try Again. There was a problem with your request. " +
            errorData.message,
        });
      }
    } catch (error) {
      console.error("Error fetching seller details:", error);
      setError(
        "An unexpected error occurred while fetching seller details to approve"
      );
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An unexpected error occurred while fetching seller details to approve",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerStore();
  }, []);

  const updateSellerStatus = async (
    status: "ACTIVE" | "NOT_APPROVED",
    reason?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `${BASE_URL}/api/admin-dashboard/seller-verification/update-seller-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sellerId: seller?.sellerId,
            sellerStatus: status,
            ...(status === "NOT_APPROVED" && { reason }),
          }),
        }
      );

      if (res.ok) {
        toast({
          variant: "default",
          title: "Seller Status Updated",
          description: `Seller status has been set to ${status}`,
        });
        onSellerApproval();
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
      console.error("Error updating seller status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An unexpected error occurred while updating seller status.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black"
        >
          Proceed to Approve
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>Approve Seller Account</DialogHeader>

        {seller ? (
          <>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={`${BASE_URL}/${seller.profilePicture}`}
                alt={seller.storeName}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-medium">{seller.storeName}</h3>
                <div className="flex items-center space-x-2">
                  <Mail size={16} />
                  <span>{seller.sellerEmail}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <span>{seller.phoneNo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} />
                  <span>{seller.storeAddress}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Store Description</h4>
              <p>{seller.storeDescription}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {seller.categories.split(",").map((category, index) => (
                  <Badge key={index} className="bg-blue-500 text-white">
                    {category.trim()}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Account Created</h4>
              <p>{seller.accountCreatedDate}</p>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-medium mb-2">Seller Status</h4>
              <Badge
                className={`${seller.sellerStatus === "ACTIVE"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                  }`}
              >
                {seller.sellerStatus}
              </Badge>
              {seller.sellerStatus === "NOT_APPROVED" && (
                <p className="text-red-500 mt-2">Reason: {seller.reason}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  updateSellerStatus("ACTIVE");
                }}
                disabled={seller?.sellerStatus === "ACTIVE"}
              >
                Approve
              </Button>
              <div>
                <Button
                  variant="outline"
                  className="bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => {
                    const reason = prompt(
                      "Please enter the reason for rejecting the seller:"
                    );
                    if (reason) {
                      updateSellerStatus("NOT_APPROVED", reason);
                    }
                  }}
                  disabled={seller?.sellerStatus === "NOT_APPROVED"}
                >
                  Reject
                </Button>
                {seller?.sellerStatus === "NOT_APPROVED" && (
                  <p className="text-red-500 mt-2">Reason: {seller.reason}</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="animate-spin" size={32} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SellerApprovePopUpButton;
