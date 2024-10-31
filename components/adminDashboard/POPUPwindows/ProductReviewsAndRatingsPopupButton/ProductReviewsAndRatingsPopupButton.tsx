
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { 
    Loader2, 
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useEffect } from 'react';

interface ReviewsAndRatingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    productID: number;
}

interface ReviewsAndRatings {  
    reviewId: number;
    reviewDateTime: string;
    rating: number;
    reviewText: string;
    reported: boolean;
}

interface ChildProps {
    productID: number;
}

const AllReviewsAndRatingsPopupButton: React.FC<ChildProps> = ({ productID, }) => {

    const [reviews, setReviews] = React.useState<ReviewsAndRatings[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const fetchReviewsAndRatings = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUPwindows/POPUP-reviews-and-ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productID }),
                credentials: 'include',
            });
      
            if (res.ok) {
                const responseData = await res.json();
                setReviews(responseData);
            } else if (res.status === 403) {
                setReviews([]);
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push("/seller-log-in");
            } else {
                const errorData = await res.json();
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please Try Again. There was a problem with your request. " + errorData.message,
                });
            }
        } catch (error) {
            console.error("Error fetching Reviews and Ratings:", error);
            setError("Failed to load product data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Format date and time from datetime string
    const formatDateTime = (dateTimeStr: string) => {
        const date = new Date(dateTimeStr);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString()
        };
    };

    useEffect(() => {
        if(productID !== null && productID !== 0){
            fetchReviewsAndRatings()
        }
    }, [])

    return (
        <Dialog>

            <DialogTrigger asChild>
                {/* this button is the on which visible to outside */}
                <Button
                    variant="outline"
                    className='bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black'
                >
                    Ratings
                </Button>
            </DialogTrigger>

            <DialogContent className="w-11/12 max-w-full h-full p-6">
                <DialogHeader className=' rounded-md h-12 p-2'>
                    <DialogTitle className="text-xl font-semibold text-center">
                        Product Reviews and Ratings
                    </DialogTitle>
                </DialogHeader>
                
                <div className="overflow-y-auto bg-gray-200 rounded-md mt-1 ">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-4">
                            <Loader2 className="w-6 h-6 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-center p-4">{error}</div>
                    ) : (
                        <Table className='hover:bg-transparent'>
                            <TableHeader className='bg-gray-400'>
                                <TableRow className='hover:bg-transparent'>
                                    <TableHead className="text-black text-lg ">Review ID</TableHead>
                                    <TableHead className="text-black text-lg ">Date</TableHead>
                                    <TableHead className="text-black text-lg ">Time</TableHead>
                                    <TableHead className="text-black text-lg ">Reported</TableHead>
                                    <TableHead className="text-black text-lg ">Rating</TableHead>
                                    <TableHead className="text-black text-lg ">Comment</TableHead>
                                    <TableHead className="text-black text-lg ">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {reviews.map((review) => {
                                    const { date, time } = formatDateTime(review.reviewDateTime);
                                    return (
                                        <TableRow  key={review.reviewId}>
                                            <TableCell className="font-medium text-black">{review.reviewId}</TableCell>
                                            <TableCell className="font-medium text-black">{date}</TableCell>
                                            <TableCell className="font-medium text-black">{time}</TableCell>
                                            <TableCell className="font-lg text-black">
                                                <Badge variant={review.reported ? "destructive" : "secondary"} className='bg-orange-200 px-4 py-2'>
                                                    {review.reported ? "Yes" : "No"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium text-black">
                                                 {review.rating}
        
                                            </TableCell>
                                            <TableCell className="max-w-md truncate font-medium text-black">
                                                    {review.reviewText.length > 20
                                                ? `${review.reviewText.slice(0, 20)}...`
                                                : review.reviewText}
                                            </TableCell>
                                            <TableCell>
                                                <Button className="bg-red-600 hover:bg-red-800 text-white font-bold rounded h-8 hover:text-black"
                                            
                                                    
                                                    // onClick={() => handleDeleteReview(review.reviewId)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AllReviewsAndRatingsPopupButton;