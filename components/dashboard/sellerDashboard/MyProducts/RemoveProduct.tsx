import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const RemoveProduct: React.FC<{
  productId: number;
  onProductRemoved: () => void;
}> = ({ productId, onProductRemoved }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const handleRemoveProduct = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/seller-dashboard/remove-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: data.message || "Product removed successfully",
        });
        onProductRemoved(); // Refresh the product list
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error?.message || "Failed to remove product",
        });
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while removing the product",
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
          size="sm" 
          className="w-full border-red-500 hover:border-red-600 hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4 mr-2 text-red-500" />
          <span className="text-red-500">Remove Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">Remove Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to remove this product? This action cannot be undone.</p>
          <div className="flex justify-end space-x-2">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button 
              variant="destructive" 
              onClick={handleRemoveProduct}
              disabled={isLoading}
            >
              {isLoading ? "Removing..." : "Remove Product"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveProduct;