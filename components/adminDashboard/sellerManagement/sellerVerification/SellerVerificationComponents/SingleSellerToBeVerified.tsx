"use client";

import AllSellerDetailsPopupButton from "@/components/adminDashboard/POPUPwindows/AllSellerDetailsPopupButton/AllSellerDetailsPopupButton";
import Link from "next/link";
import Image from "next/image";
import SellerApprovePopUpButton from "@/components/adminDashboard/POPUPwindows/SellerApprovePopUpButton/SellerApprovePopUpButton";
import { Button } from "@/components/ui/button";

interface ToBeVerifySellerData {
  sellerId: number;
  profilePicture: string;
  storeName: string;
  categories: string;
  accountCreatedDate: string;
}

const SingleSellerToBeVerified: React.FC<{
  parentData: ToBeVerifySellerData;
  onSellerApproval: () => void;
}> = ({ parentData, onSellerApproval }) => {
  return (
    <div className="bg-gray-100 flex flex-row my-1 rounded">
      {/* Image */}
      <div className="w-1/6 flex justify-center items-center">
        <div className="relative w-32 h-32 overflow-hidden rounded">
          <Image
            src={parentData.profilePicture}
            alt="Seller profile image"
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-3/6 py-1 px-3">
        <p className="text-xl font-bold">{parentData.storeName}</p>
        <div className="flex flex-col ms:flex-row mt-0 md:mt-1">
          {/* Seller details */}
          <div>
            <p>Seller ID: {parentData.sellerId}</p>
            <p>Product Categories: {parentData.categories}</p>
          </div>
          {/* Submitted date and time */}
          <div className="flex flex-row w-8/12 bg-white ">
            <p>
              Submitted Date:{" "}
              {new Date(parentData.accountCreatedDate)
                .toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .replace(/\//g, ".")}{" "}
              {new Date(parentData.accountCreatedDate).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="w-2/6 flex flex-col">
        {/* View Seller Details*/}
        <div className="basis-1/3 mx-2">
          <AllSellerDetailsPopupButton sellerID={parentData.sellerId} />
        </div>

        {/* View Store */}
        <div className="basis-1/3 mx-2">
          <Button
            asChild
            variant="outline" // Adjust variant if needed (e.g., secondary, outline)
            className="bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black"
            size="default" // Adjust size if needed (e.g., sm, lg)
          >
            <a
              href={`/seller-store?sellerId=${parentData.sellerId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Store
            </a>
          </Button>
        </div>
        {/* Proceed to approval */}
        <div>
          <SellerApprovePopUpButton
            sellerId={parentData.sellerId}
            onSellerApproval={onSellerApproval}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleSellerToBeVerified;
