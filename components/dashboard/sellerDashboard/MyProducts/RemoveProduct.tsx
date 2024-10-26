"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react"; // Import trash icon

const RemoveProduct: React.FC<{
  productId: number;
  onProductRemoved: () => void;
}> = ({ productId, onProductRemoved }) => {

  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const handleRemoveProduct = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/seller-dashboard/remove-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }), // Send productId in request body
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData);
        console.log("successfully removed");
        onProductRemoved(); // Call the refresh function
      } else {
        const responseData = await res.json();
        console.error("Error removing product:", responseData);
      }
    } catch (error) {
      console.error("Error removing product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <button
        onClick={handleRemoveProduct}
        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
        title="Remove Product"
        disabled={isLoading}
      >
        <Trash2 size={20} />
        {isLoading ? "Removing..." : "Remove Product"}
      </button>
    </div>
  );
};

export default RemoveProduct;
