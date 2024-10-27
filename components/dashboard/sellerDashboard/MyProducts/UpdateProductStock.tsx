import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PackageOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toast, ToastProvider } from "@/components/ui/toast";

const UpdateProductStock: React.FC<{
  productId: number;
  productAvailableStocks: number;
  onProductStockUpdate: () => void;
}> = ({ productId, productAvailableStocks, onProductStockUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newStockAmount, setNewStockAmount] = useState(productAvailableStocks);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const validateAndUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate input
    if (isNaN(newStockAmount)) {
      setError("Please enter a valid number");
      return;
    }

    if (newStockAmount < 0) {
      setError("Stock amount cannot be negative");
      return;
    }

    if (newStockAmount > 999999) {
      setError("Stock amount is too large");
      return;
    }

    handleProductStockUpdate(productId, newStockAmount);
  };

  const handleProductStockUpdate = async (productId: number, newStockAmount: number) => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/seller-dashboard/update-product-stocks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: productId,
            newStockAmount: newStockAmount,  
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: data.message || "Product stocks updated successfully",
        });
        onProductStockUpdate(); // Refresh the product list
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error?.message || "Failed to update product stocks",
        });
      }
    } catch (error) {
      console.error("Error updating product stocks:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred while updating stocks",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <PackageOpen className="w-4 h-4 mr-2" />
          Update Stock
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Product Stock</DialogTitle>
        </DialogHeader>
        <form onSubmit={validateAndUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentStock">Current Stock</Label>
            <Input
              id="currentStock"
              value={productAvailableStocks}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newStock">New Stock Amount</Label>
            <Input
              id="newStock"
              type="number"
              value={newStockAmount}
              onChange={(e) => setNewStockAmount(Number(e.target.value))}
              placeholder="Enter new stock amount"
              min="0"
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Stock"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProductStock;