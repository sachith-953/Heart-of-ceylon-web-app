'use client'

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';
import { ShoppingCart, Loader2, ShoppingBag } from 'lucide-react';
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

const BuyItNowButton: React.FC<ChildProps> = ({ pid, className }) => {
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
                    description: "Product successfully added to your cart. Please Wait",
                    className: "bg-green-100 border-green-200",
                });

                router.push("/buyer-cart"); // redirect to cart
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
                    description: `Unable to add to cart: ${responseData.message}. Please Wait...`,
                });
                router.push("/buyer-cart");
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
        <div className={`relative ${className}`}>
            <Button
                onClick={handleAddToCart}
                className={`
                w-full min-w-[140px] relative
                transition-all duration-300 ease-in-out
                ${isAdded
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-blue-400 hover:bg-blue-600 text-gray-800'
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
                    <ShoppingBag className={`h-4 w-4 
                  transition-all duration-300 
                  ${isAdded ? 'scale-110' : 'scale-100'}
                `} />
                )}
                <span className="font-medium">
                    {isLoading
                        ? 'Buying...'
                        : isAdded
                            ? 'Please Wait...!'
                            : 'Buy It Now'
                    }
                </span>
            </Button>
        </div>
    );
};

export default BuyItNowButton;