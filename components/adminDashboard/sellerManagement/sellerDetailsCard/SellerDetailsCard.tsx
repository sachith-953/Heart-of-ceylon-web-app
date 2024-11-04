import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import AllSellerDetailsPopupButton from "../../POPUPwindows/AllSellerDetailsPopupButton/AllSellerDetailsPopupButton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import SuspendSellerPOPUPButton from "../../POPUPwindows/SuspendSellerPOPUPButton/SuspendSellerPOPUPButton";
import UnSuspendSellerButtton from "../../POPUPwindows/UnSuspendSellerButtton/UnSuspendSellerButtton";

interface SellerDataType {
  profilePicture: string;
  storeName: string;
  sellerID: number;
  categories: string;
  sellerStatus: string;
  badges: string;
  ratings: number;
}

interface SellerCardProps {
  seller: SellerDataType;
}

const SellerDetailsCard: React.FC<SellerCardProps> = ({ seller }) => {
  const [reloadPage, setReloadPage] = useState(false);
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter

  const onSellerSuspend = async () => {
    setReloadPage((prev) => !prev);
    toast({
      title: "Seller List Updated",
      description: "The seller list has been refreshed after suspension",
    });
    router.refresh(); // Trigger page refresh
  };

  const onSellerUnSuspend = async () => {
    setReloadPage((prev) => !prev);
    toast({
      title: "Seller List Updated",
      description: "The seller list has been refreshed after Unsuspension",
    });
    router.refresh(); // Trigger page refresh
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 transition-shadow flex flex-col sm:flex-row gap-2 sm:gap-6 w-full mx-auto max-w-screen-lg">
      {/* Profile Image */}
      <div className="w-1/6">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 m-2">
          {seller.profilePicture ? (
            <Image
              src={seller.profilePicture}
              alt="seller profile image"
              className="object-cover"
              fill
            />
          ) : (
            <Image
              src="my_prof_img.svg"
              alt="Default profile image"
              width={128}
              height={128}
              className="object-cover bg-gray-100"
            />
          )}
        </div>
      </div>

      {/* Seller Information */}
      <div className="w-3/6 space-y-3 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
          {seller.storeName}
        </h1>
        <p className="text-gray-600">
          <span className="font-semibold">Seller ID:</span> {seller.sellerID}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Categories:</span> {seller.categories}
        </p>
        <div className="flex items-center justify-center sm:justify-start gap-1">
          <span className="font-semibold text-gray-600">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              seller.sellerStatus.toLowerCase() === "active"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-red-700"
            }`}
          >
            {seller.sellerStatus}
          </span>
        </div>
        <div className="flex flex-row bg-white pr-1 mb-2">
          <p className="mr-1 hidden sm:flex min-w-16 sm:text-sm">Ratings :</p>
          <div className="flex flex-row">
            {Array.from({ length: seller.ratings }, (_, index) => (
              <Star key={index} fill="#FFD254" strokeWidth={0} />
            ))}
            {Array.from({ length: 5 - seller.ratings }, (_, index) => (
              <Star
                key={5 * seller.ratings + index}
                fill="#111"
                strokeWidth={0}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-2/6 flex">
        <div className="flex flex-col justify-evenly w-1/2">
          <Link
            className="w-9/10 px-4 py-2 mx-3 my-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white hover:text-black m-1"
            href={{
              pathname: "/seller-store",
              query: { sellerId: `${seller.sellerID}` },
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Store
          </Link>
          <Button
            disabled={true}
            className="w-9/10 mx-3 bg-blue-600 hover:bg-blue-800 text-white"
          >
            Assign Badges
          </Button>
        </div>
        <div className="flex flex-col justify-evenly w-1/2 mr-3 p-2">
          <AllSellerDetailsPopupButton sellerID={seller.sellerID} />
          <div className="w-full flex justify-center">
            {seller.sellerStatus === "SUSPEND" ? (
              <UnSuspendSellerButtton
                sellerID={seller.sellerID}
                onSellerUnSuspend={onSellerUnSuspend}
              />
            ) : (
              <SuspendSellerPOPUPButton
                sellerID={seller.sellerID}
                onSellerSuspend={onSellerSuspend}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDetailsCard;
