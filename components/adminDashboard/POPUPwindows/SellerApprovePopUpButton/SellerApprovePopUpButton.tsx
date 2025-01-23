"use client";

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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Phone, MapPin, Store, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CircleUser } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
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

interface ChildProps {
  sellerId: number;
  onSellerApproval: () => void;
}

const SellerApprovePopUpButton: React.FC<ChildProps> = ({
  sellerId,
  onSellerApproval,
}) => {
  const [seller, setSeller] = React.useState<ToBeVerifiedSellerStore | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<"ACTIVE" | "NOT_APPROVED" | "">("");
  const [reason, setReason] = useState("");
  const BASE_URL = process.env.NEXT_PUBLIC_URL;
  const [error, setError] = React.useState<string | null>(null);
  const router = useRouter();

  const fetchSellerStore = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(
        `${BASE_URL}/api/admin-dashboard/seller-verification/get-not-verified-seller-store`,
        {
          // Fixed template literal
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sellerId }),
          credentials: "include",
        }
      );

      console.log("sellerId >>>" + sellerId);

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
      console.error("Error fetching seller details to approve seller:", error);
      setError(
        "An unexpected error occurred while fetching seller details to approve"
      );
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An unexpected error occurred while fetching seller details to approve-JANATH",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerStore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSellerStatus = async (
    status: "ACTIVE" | "NOT_APPROVED",
    reason?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `${BASE_URL}/api/admin-dashboard/seller-verification/update-seller-verification`,
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
        onSellerApproval(); //refresh the to be verified sellers list
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

  const handleStatusSubmit = () => {
    if (!selectedStatus) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a status",
      });
      return;
    }

    if (selectedStatus === "NOT_APPROVED" && !reason.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a reason for not approving",
      });
      return;
    }

    updateSellerStatus(
      selectedStatus as "ACTIVE" | "NOT_APPROVED",
      selectedStatus === "NOT_APPROVED" ? reason : undefined
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-red-500 w-full hover:bg-red-700 text-white hover:text-white"
          size="default"
        >
          Proceed to Approve
        </Button>
      </DialogTrigger>

      {/*Pop up */}
      <DialogContent className="max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Approve Seller Account</DialogTitle>
        </DialogHeader>

        {seller ? (
          <>
            <ScrollArea className="max-h-[calc(90vh-150px)] px-6">
              <div className="pr-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={seller.profilePicture}
                      alt={seller.storeName}
                      fill
                      sizes="80px"
                      className="rounded-full object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{seller.storeName}</h3>
                    <div className="flex items-center space-x-2">
                      <CircleUser className="shrink-0" size={16} />
                      <span className="break-all">{seller.sellerId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="shrink-0" size={16} />
                      <span className="break-all">{seller.sellerEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="shrink-0" size={16} />
                      <span>{seller.phoneNo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="shrink-0" size={16} />
                      <span className="break-all">{seller.storeAddress}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Store Description</h4>
                  <p className="whitespace-pre-wrap">{seller.storeDescription}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {seller.categories?.split(",").map((category, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-500 text-white">
                        {category.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-lg font-medium mb-2">Account Created</h4>
                  <p>
                    {new Date(seller.accountCreatedDate).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {" at "}
                    {new Date(seller.accountCreatedDate).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium">Update Seller Status</h4>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value as "ACTIVE" | "NOT_APPROVED" | "")}
                      className="w-full p-2 border rounded-md bg-white"
                      aria-label="Select seller status"
                    >
                      <option value="">Select status</option>
                      <option value="ACTIVE">Approve</option>
                      <option value="NOT_APPROVED">Not Approve</option>
                    </select>
                  </div>

                  {selectedStatus === "NOT_APPROVED" && (
                    <div className="space-y-2">
                      <label htmlFor="rejection-reason" className="text-sm font-medium">
                        Reason for not approving
                      </label>
                      <textarea
                        id="rejection-reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter reason..."
                        className="w-full min-h-[100px] p-2 border rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
            
            <div className="border-t p-6">
              <div className="flex justify-end">
                <Button
                  onClick={handleStatusSubmit}
                  disabled={
                    !selectedStatus ||
                    (selectedStatus === "NOT_APPROVED" && !reason.trim()) ||
                    isLoading
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Done
                </Button>
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
