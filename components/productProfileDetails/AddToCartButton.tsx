'use client'

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { ShoppingCart, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface ChildProps {
  pid: number;
  className?: string;
}

const AddToCartButton: React.FC<ChildProps> = ({ pid, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const BASE_URL = process.env.NEXT_PUBLIC_URL;

  const handleAddToCart = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/buyer/add-to-cart`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pid }),
      });

      if (res.ok) {
        const responseData = await res.json();
        console.log(responseData);
        setIsAdded(true);
        
        // Reset the "Added" state after 2 seconds
        //setTimeout(() => setIsAdded(false), 2000);
        
        toast({
          title: "Added to Cart",
          description: "Product successfully added to your cart",
          className: "bg-green-50 border-green-200",
        });
      } else if (res.status === 403) {
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please log in to add products to your cart",
        });
        router.push("/log-in");
      } else {
        const responseData = await res.json();
        console.log(responseData);
        toast({
          variant: "destructive",
          title: "Error",
          description: `Unable to add to cart: ${responseData.message}`,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        variant: "destructive",
        title: "Unexpected Error",
        description: "Failed to add item to cart. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      {/* tooltip from shadcn >> https://ui.shadcn.com/docs/components/tooltip */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`relative ${className}`}>
            <Button
              onClick={handleAddToCart}
              className={`
                w-full min-w-[140px] relative
                transition-all duration-300 ease-in-out
                ${isAdded 
                  ? 'bg-green-500 hover:bg-green-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
                group flex items-center justify-center gap-2
              `}
              disabled={isLoading || isAdded}
              variant="outline"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingCart className={`h-4 w-4 
                  transition-all duration-300 
                  ${isAdded ? 'scale-110' : 'scale-100'}
                `} />
              )}
              <span className="font-medium">
                {isLoading 
                  ? 'Adding...' 
                  : isAdded 
                    ? 'Added!' 
                    : 'Add to Cart'
                }
              </span>
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isAdded 
            ? 'Product added to cart!' 
            : 'Click to add this product to your cart'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AddToCartButton;