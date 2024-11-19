import React, { useState } from "react";
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

const UpdateProfitMarginPOPUPButton: React.FC<{
  productID: number;
  ProfitMarginPercentage: number;
  onProductUpdateProfitMargin: () => void;
}> = ({ productID, ProfitMarginPercentage, onProductUpdateProfitMargin }) => {
  const [isLoading, setIsLoading] = useState(false);
  // Initialize with parsed float value
  const [newPercentage, setNewPercentage] = useState(
    parseFloat(ProfitMarginPercentage.toFixed(2))
  );
  const [error, setError] = useState("");
  const { toast } = useToast();

  const validateAndUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate input with decimal support
    if (isNaN(newPercentage)) {
      setError("Please enter a valid Percentage");
      return;
    }

    // Convert to 2 decimal places for validation
    const roundedPercentage = parseFloat(newPercentage.toFixed(2));

    if (roundedPercentage < 0) {
      setError("Profit margin cannot be negative");
      return;
    }

    if (roundedPercentage > 99) {
      setError("Profit margin is too large");
      return;
    }

    handleUpdateProfitMargin(productID, roundedPercentage);
  };

  const handleUpdateProfitMargin = async (
    productID: number,
    newPercentage: number
  ) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin-dashboard/POPUPwindows/POPUP-update-profit-margin-for-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productID: productID,
            newPercentage: parseFloat(newPercentage.toFixed(2)), // Ensure 2 decimal places
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Success",
          description: data.message || "Profit margin updated successfully",
        });
        onProductUpdateProfitMargin();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error?.message || "Failed to update Profit margin!",
        });
      }
    } catch (error) {
      console.error("Error updating Profit margin:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "An unexpected error occurred while updating Profit margin",
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
          className="bg-blue-600 w-1/4 hover:bg-blue-800 text-white hover:text-black"
        >
          <PackageOpen className="w-4 h-4 mr-2" />
          Update Profit Margin
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profit Margin</DialogTitle>
        </DialogHeader>
        <form onSubmit={validateAndUpdate} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentStock">Current Profit Margin</Label>
            <Input
              id="currentStock"
              value={ProfitMarginPercentage}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newStock">New Profit Margin</Label>
            <Input
              id="newStock"
              type="number"
              value={newPercentage}
              onChange={(e) =>
                setNewPercentage(parseFloat(e.target.value) || 0)
              }
              placeholder="Enter new Profit Margin"
              min="0"
              step="0.01" // Added this to allow decimal input
              className={error ? "border-red-500" : ""}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Profit Margin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfitMarginPOPUPButton;
