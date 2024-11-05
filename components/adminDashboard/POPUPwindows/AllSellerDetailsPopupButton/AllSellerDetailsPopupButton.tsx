import React, { useEffect } from 'react';
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
    Mail,
    Phone,
    MapPin,
    Store,
    Star,
} from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SellerDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    sellerID: number;
}

interface SellerDetails {
    sellerID: number;
    storeName: string;
    sellerStatus: string;
    ratings: number;
    noOfRatings: number;
    badges: string;
    accountCreatedDate: string;
    accountCreatedTime: string;
    categories: string;
    storeDescription: string;
    totalSales: number;
    phoneNo: string;
    sellerAddress: string;
    sellerEmail: string;
    profilePicture: string | null;
}

interface ChildProps {
    sellerID: number;
}


const AllSellerDetailsPopupButton: React.FC<ChildProps> = ({ sellerID, }) => {

    const [seller, setSeller] = React.useState<SellerDetails | null>(null);

    const [isLoading, setIsLoading] = React.useState(false);

    const [error, setError] = React.useState<string | null>(null);

    const { toast } = useToast();
    const router = useRouter();

    const fetchSellerDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUPwindows/POP-view-seller-details-by-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sellerID }),
            });

            if (res.ok) {
                const responseData = await res.json();
                setSeller(responseData);
            }
            else if (res.status === 403) {
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                router.push("/seller-log-in");
            }
            else {
                const errorData = await res.json();
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please Try Again. There was a problem with your request. " + errorData.message,
                });
            }
        }
        catch (error) {
            console.error("Error fetching products:", error);
            setError("Failed to load product data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        if (sellerID !== null && sellerID !== 0) {
            fetchSellerDetails()
        }
        console.log("seller ID : " + sellerID)
    }, [])

    return (
        <Dialog>

            <DialogTrigger asChild>
                {/* this button is the on which visible to outside */}
                <Button
                    variant="outline"
                    className='bg-blue-600 w-full hover:bg-blue-800 text-white hover:text-black'
                >
                    View Seller Details
                </Button>
            </DialogTrigger>

            <DialogContent className="w-11/12 max-w-full h-full p-6">
                <DialogHeader className="">
                    <DialogTitle className="text-xl font-bold text-black text-center rounded-md">Seller All Details</DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 p-4">{error}</div>
                ) : seller ? (
                    <div className="flex h-full">
                        {/* Left Sidebar - 1/4 width */}
                        <div className="w-1/4 border-r border-gray-300 flex flex-col bg-white rounded-md ml-1 mr-1 mb-1 mt-0 p-2">
                            {/* Profile Picture */}
                            <div className="flex justify-center">
                                {seller.profilePicture ? (
                                    <img
                                        src={seller.profilePicture}
                                        alt="Store Profile"
                                        className="w-40 h-40 rounded-full object-cover"
                                    />
                                ) : (
                                    // if the profile not there display ray round like a profile
                                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
                                        <Store className="h-20 w-20 text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Ratings */}
                            <div className="flex flex-col mt-4">
                                <div className="flex flex-row pr-1 justify-center">
                                    <p className="mr-1 text-black text-lg font-bold">Ratings :</p>
                                    <div className="flex flex-row mt-2">
                                        {Array.from({ length: seller.ratings }, (_, index) => (
                                            <Star key={index} fill="#FFD254" strokeWidth={0} className="w-4 h-4" />
                                        ))}
                                        {Array.from({ length: 5 - seller.ratings }, (_, index) => (
                                            <Star key={5 * seller.ratings + index} fill="#111" strokeWidth={0} className="w-4 h-4" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="mt-2 flex justify-center">
                                <p className='mr-2 text-lg font-bold mt-1'>Status :</p>
                                <Badge className="bg-green-300 text-black px-4 py-1 mt-2">
                                    <p className='text-xl '>{seller.sellerStatus}</p>
                                </Badge>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 mt-6 items-center justify-center p-1">


                                {/* <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-blue-600 hover:bg-blue-800 text-white hover:text-black"
                                    onClick={() => router.push(`/seller-store?sellerId=${seller.sellerID}`)}
                                >
                                    View Shop
                                </Button> */}
                                
                                {/* view shop btn */}
                                <div className='w-1/2 flex text-center'>
                                    <Link
                                        className="w-full px-4 py-2 mx-3 my-2 rounded-lg bg-blue-600 hover:bg-blue-800 text-white"
                                        href={{
                                            pathname: '/seller-store',
                                            query: { sellerId: `${seller.sellerID}` },
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View Store
                                    </Link>
                                </div>


                                <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 rounded w-1/2 px-4 hover:text-black">
                                    Assign badges
                                </button>
                            </div>


                            {/* Bottom Buttons */}
                            <div className="mt-auto flex flex-col gap-3 p-2 mb-4 items-center justify-center">
                                <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-2/3 hover:text-black">
                                    Suspend
                                </button>
                                <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded w-2/3 hover:text-black">
                                    Remove account
                                </button>

                            </div>
                        </div>

                        {/* Right Content - 3/4 width */}
                        <div className="w-3/4 p-2 bg-white mr-1 mb-1 rounded-md">
                            {/* Store Name and ID */}
                            <div className=' text-4xl font-bold text-black'>
                                {seller.storeName}
                            </div>
                            <div className=' mt-2 text-lg font-bold text-black'>
                                Seller ID: {seller.sellerID}
                            </div>
                            {/* Categories and Sales */}
                            <div className=" mt-2 text-lg font-semi-bold text-black">
                                Product Categories: {seller.categories}
                            </div>
                            <div className=' mt-2 text-lg font-semi-bold text-black'>
                                Sales: {seller.totalSales}
                            </div>

                            {/* Store Description */}
                            <div className=" mt-2 text-lg font-semi-bold text-black bg-gray-200">
                                Store description : {seller.storeDescription}
                            </div>

                            {/* Account created date */}
                            <div className=' mt-2 text-lg font-semi-bold text-black bg-gray-200'>
                                Account Created Date & Time : {new Date(seller.accountCreatedDate).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }).replace(/\//g, '.')} {new Date(seller.accountCreatedDate).toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                })}
                            </div>
                            {/* phone */}
                            <div className="flex items-center mt-2 text-lg font-semi-bold text-black bg-gray-200">
                                <Phone className="mr-1" />
                                <span> Phone numbers :{seller.phoneNo}</span>
                            </div>

                            {/* email */}
                            <div className="flex items-center mt-2 text-lg font-semi-bold text-black bg-gray-200">
                                <Mail className="mr-1" />
                                <span> email :{seller.sellerEmail}</span>
                            </div>
                            {/* address */}
                            <div className="flex items-center mt-2 text-lg font-semi-bold text-black bg-gray-200">
                                <MapPin className="mr-1" />
                                <span>Address :{seller.sellerAddress}</span>
                            </div>
                            {/* seller documents */}
                            <div className="mt-2 text-lg font-semi-bold text-black bg-gray-200">
                                <h3 className="">Documents :</h3>
                            </div>
                        </div>
                    </div>
                ) : null}
            </DialogContent>
        </Dialog>
    );
};

export default AllSellerDetailsPopupButton