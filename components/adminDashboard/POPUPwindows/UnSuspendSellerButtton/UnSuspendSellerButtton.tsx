import React, { useState } from "react";
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
import { useRouter } from "next/navigation";

interface ChildProps {
  sellerID: number;
  onSellerUnSuspend: () => void;
}

const UnSuspendSellerButtton: React.FC<ChildProps> = ({
  sellerID,
  onSellerUnSuspend,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Added to control dialog state
  const { toast } = useToast();
  
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleUnSuspend = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin-dashboard/POPUPwindows/POPUP-unsuspend-seller-button`,
        {
          // Fixed template literal
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sellerID }),
          credentials: "include",
        }
      );

      if (res.ok) {
        const responseData = await res.json();
        toast({
          title: "Success",
          description:
            responseData.message || "seller Unsuspended successfully",
        });
        onSellerUnSuspend(); // Refresh the product list
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
      console.error("Error unsuspending seller:", error);
      setError("Failed to UnSuspend. Please try again.");
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to UnSuspend seller. Please try again.",
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
          className="bg-green-600 w-full hover:bg-green-800 text-white hover:text-black"
        >
          <span>Unsuspend</span>{" "}
          {/* Removed text-red-500 since button is already red */}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">Unsuspend Product</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Are you sure you want to Unsuspend this seller?</p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleUnSuspend}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">⏳</span>
                  Unsuspending...
                </span>
              ) : (
                "Unsuspend seller"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UnSuspendSellerButtton;
