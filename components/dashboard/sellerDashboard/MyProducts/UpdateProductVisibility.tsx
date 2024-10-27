"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import VisibilityUpdateDropdown from "./VisibilityUpdateDropdown";

const UpdateProductVisibility: React.FC<{
  productId: number;
  productVisibility: string;
  onVisibilityStatusUpdate: () => void;
}> = ({ productId, productVisibility, onVisibilityStatusUpdate }) => {
    
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const handleVisibilityStatusUpdate = async (productId: number, newStatus: string) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/seller-dashboard/update-product-visibility`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
            productVisibility: newStatus,  // Changed from newStatus to productVisibility
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: data.message || "Product visibility updated successfully",
        });
        onVisibilityStatusUpdate(); // Refresh the product list
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error?.message || "Failed to update product visibility",
        });
      }
    } catch (error) {
      console.error("Error updating product visibility:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating visibility",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusStyle = (status: string | undefined) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    return status.toLowerCase() === 'private' 
      ? "bg-green-200 text-green-800" 
      : "bg-yellow-200 text-yellow-800";
  };

  return (
    <div className="flex items-center justify-center h-full gap-2">
      <span
        className={`px-2 py-1 rounded-full text-sm ${getStatusStyle(productVisibility)}`}
      >
        {productVisibility || "Unknown"}
      </span>
      <VisibilityUpdateDropdown
        isLoading={isLoading}
        currentStatus={productVisibility}
        onStatusChange={(newStatus) =>
          handleVisibilityStatusUpdate(productId, newStatus)
        }
      />
    </div>
  );
};

export default UpdateProductVisibility;