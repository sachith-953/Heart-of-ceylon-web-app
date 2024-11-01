import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React, { useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Loader2,
    Mail,
    Phone,
    MapPin,
    Store,
    Star,
} from "lucide-react";
import AllSellerDetailsPopupButton from "../AllSellerDetailsPopupButton/AllSellerDetailsPopupButton";
import Link from "next/link";

interface MoreDetailsOfAnOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderID: number;
}

export enum sellerStatusEnum {
    ACTIVE = 'ACTIVE',
    NOT_APPROVED = 'NOT_APPROVED',
    SUSPEND = 'SUSPEND',
    DELETED = 'DELETED',

}

export enum ProductVisibilityEnum {
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC"
}

export enum ProductVisibilityEnum {
    PRODUCT_IS_ACTIVE = "PRODUCT_IS_ACTIVE",
    SUSPEND = "SUSPEND",
    DISCONTINUED = "DISCONTINUED",
    VERIFIED = "VERIFIED",
    TO_BE_VERIFIED = "TO_BE_VERIFIED",
    DELETED = "DELETED"
}

export enum OrderStatusEnum {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

interface SellerDetails {
    sellerID: number,
    storeName: string,
    sellerStatus: sellerStatusEnum,
    ratings: number,
    badges: string,
    accountCreatedDate: string,
    categories: string,
    storeDescription: string,
    totalSales: number,
    phoneNo: string,
    sellerAddress: string,
    sellerEmail: string,
    district: string,
    profilePicture: string

}

interface BuyertDetails {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    phoneNo: string;
    shippingAddress: string;
    city: string;
    country: string;
}

interface ProductDetails {
    productID: number,
    productName: string,
    productAvailableStokes: number,
    productDescription: string,
    productPrice: number,
    productMainImage: string,
    productWeight: number,
    productDimensions: string,
    productCreatedDate: string,
    productStatus: ProductVisibilityEnum,
    productKeyWords: string,
    productNoOfRatings: number,
    productVisibility: ProductVisibilityEnum,
    productRatings: number,
    productTotalItemSold: number,
    productNotes: string,
    productProfitMarginPercentage: number,
    productManufacture: string,
    productDiscountPrice: number

}

interface OrderSummery {
    orderDateTime: string,
    orderStatus: OrderStatusEnum,
    paymentMethod: string,
    expectedDeliveryDate: string,
    notes: string,
    shippingCost: number
}
interface AllDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderID: number;
    OrderQuantity: number;
}

interface ChildProps {
    orderID: number;
    OrderQuantity: number;
}


const MoreAboutAnOrderPOPUPButton: React.FC<ChildProps> = ({ orderID, OrderQuantity }) => {

    const [seller, setSeller] = React.useState<SellerDetails | null>(null);
    const [buyer, setBuyer] = React.useState<BuyertDetails | null>(null);
    const [product, setProduct] = React.useState<ProductDetails | null>(null);
    const [order, setOrder] = React.useState<OrderSummery | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    const fetchSellerDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUPwindows/MoreDetailsOfAnOrder/POPUP-all-details-of-an-order-Seller-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderID }),
                credentials: 'include',
            });

            if (res.ok) {
                const responseData = await res.json();
                setSeller(responseData);
            } else if (res.status === 403) {
                setSeller(null);
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push("/log-in");
            } else {
                const errorData = await res.json();
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please Try Again. There was a problem with your request. " + errorData.message,
                });
            }
        } catch (error) {
            console.error("Error fetching seller details for a requested order:", error);
            setError("Failed to load seller data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBuyerDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUPwindows/MoreDetailsOfAnOrder/POPUP-all-details-of-an-order-Buyer-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderID }),
                credentials: 'include',
            });

            if (res.ok) {
                const responseData = await res.json();
                setBuyer(responseData);
            } else if (res.status === 403) {
                setBuyer(null);
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push("/log-in");
            } else {
                const errorData = await res.json();
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please Try Again. There was a problem with your request. " + errorData.message,
                });
            }
        } catch (error) {
            console.error("Error fetching buyer details for a requested order:", error);
            setError("Failed to load buyer data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProductDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUPwindows/MoreDetailsOfAnOrder/POPUP-all-details-of-an-order-Product-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderID }),
                credentials: 'include',
            });

            if (res.ok) {
                const responseData = await res.json();
                setProduct(responseData);
            } else if (res.status === 403) {
                setProduct(null);
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push("/log-in");
            } else {
                const errorData = await res.json();
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please Try Again. There was a problem with your request. " + errorData.message,
                });
            }
        } catch (error) {
            console.error("Error fetching product details for a requested order:", error);
            setError("Failed to load product data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOrderDetails = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUPwindows/MoreDetailsOfAnOrder/POPUP-all-details-of-an-order-Order-summery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderID }),
                credentials: 'include',
            });

            if (res.ok) {
                const responseData = await res.json();
                setOrder(responseData);
            } else if (res.status === 403) {
                setOrder(null);
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                });
                await new Promise(resolve => setTimeout(resolve, 100));
                router.push("/log-in");
            } else {
                const errorData = await res.json();
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Please Try Again. There was a problem with your request. " + errorData.message,
                });
            }
        } catch (error) {
            console.error("Error fetching order summery details for a requested order:", error);
            setError("Failed to load order summery. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (orderID !== null && orderID !== 0) {
            fetchSellerDetails();
            fetchBuyerDetails();
            fetchProductDetails();
            fetchOrderDetails();
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
                    More
                </Button>
            </DialogTrigger>
            <DialogContent className="w-11/12 max-w-full h-full p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                        All Details About Order
                    </DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex justify-center items-center h-[60vh]">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 p-4">{error}</div>
                ) : (
                    // main div
                    <div className="overflow-y-auto grid grid-cols-2 gap-6 p-4">
                        {/* seller */}
                        <div className="  p-4 rounded-md border-2">
                            <div className="  flex items-center justify-center text-lg font-bold rounded-md">
                                <Store className="h-5 w-5 mr-4" />
                                Seller Details
                            </div>
                            {seller && (
                                <div className="">

                                    <div className="flex space-x-4">
                                        <div className=" w-32 h-32 mt-1 rounded-md">
                                            <img
                                                src={seller.profilePicture || "/api/placeholder/100/100"}
                                                alt="Store"
                                                className="w-full h-full rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className=" h-32 mt-1 rounded-md">
                                            <p className="text-2xl font-bold">{seller.storeName}</p>

                                            <p className="text-lg font-semibold">Seller ID :{seller.sellerID}</p>
                                            <p className="text-lg font-semibold">Total Sales :{seller.totalSales}</p>
                                            <p className="text-lg font-semibold">Category :{seller.categories}</p>
                                        </div>
                                    </div>

                                    <div className="mt-1   rounded-md p-1">
                                        {/* ratings */}
                                        <div className="rounded-md">
                                            <div className="flex flex-row pr-1">
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
                                        <div className=" flex ">
                                            <p className='mr-2 text-lg font-bold mt-1'>Status :</p>
                                            <Badge className="bg-green-300 text-black px-4 py-1 mt-2">
                                                <p className='text-xl '>{seller.sellerStatus}</p>
                                            </Badge>
                                        </div>
                                        {/* location */}
                                        <div className="rounded-md mt-2">
                                            <p className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />Location :
                                                {seller.sellerAddress}
                                            </p>
                                        </div>

                                        {/* phone no */}
                                        <div className="rounded-md">
                                            <p className="flex items-center gap-2">
                                                <Phone className="h-4 w-4" />Mobile No :
                                                {seller.phoneNo}
                                            </p>
                                        </div>
                                        <p className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />email :
                                            {seller.sellerEmail}
                                        </p>
                                        {/* buttons */}
                                        <div className="flex items-center justify-center mt-5">
                                            
                                            {/* View Seller Store : open in new tab */}
                                            <div className='w-40 flex text-center'>
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


                                            {/* this is the button view seller details */}
                                            <div className="w-40 mx-5">
                                                <AllSellerDetailsPopupButton sellerID={seller.sellerID} />
                                            </div>


                                        </div>

                                        {/* <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline">{seller.sellerStatus}</Badge>
                                            {seller.badges.split(',').map((badge, index) => (
                                                <Badge key={index} variant="secondary">{badge.trim()}</Badge>
                                            ))}
                                        </div> */}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* buyer */}
                        <div className=" p-4 rounded-lg shadow-md border-2">
                            <div className="  flex items-center justify-center text-lg font-bold rounded-md">
                                Buyer Details
                            </div>

                            {buyer && (
                                <div className="space-y-3">
                                    {/* name */}
                                    <div className=" rounded-md">
                                        <h3 className="font-semibold text-lg">Name :
                                            {buyer.firstName} {buyer.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-500"></p>
                                    </div>
                                    {/* gender */}
                                    <div className=" rounded-md">
                                        <h2 className="font-semibold">Gender : {buyer.gender}</h2>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="flex items-center gap-2 font-semibold">
                                            <Phone className="h-4 w-4" />Moble No :
                                            {buyer.phoneNo}
                                        </p>
                                        <p className="flex items-center gap-2 font-semibold">
                                            <Mail className="h-4 w-4" /> email :
                                            {buyer.email}
                                        </p>

                                        <p className="flex items-center gap-2 font-semibold">
                                            <MapPin className="h-4 w-4" /> Shipping Address :
                                            {buyer.shippingAddress}
                                        </p>
                                        <p className="text-sm font-semibold">City :
                                            {buyer.city}, {buyer.country}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* product */}
                        <div className=" p-4 rounded-lg border-2">
                            <div className="  flex items-center justify-center text-lg font-bold rounded-md">
                                Product Details
                            </div>
                            {product && (
                                <div className=" bg-r  ">
                                    <div className="flex items-center space-x-4  p-1 rounded-md">
                                        {/* prodcut image */}
                                        <div className="w-32 h-32 mt-1 rounded-md">
                                            <img
                                                src={product.productMainImage}
                                                alt={product.productName}
                                                className="w-full h-full rounded-lg object-cover"
                                            />
                                        </div>
                                        {/* right side of the image */}
                                        <div>
                                            <p className="text-2xl font-bold">{product.productName}</p>
                                            <p className="text-red-700">categories not fetched consider about it</p>
                                            <div className="">
                                                <p className="">Unit Price :{product.productPrice}</p>
                                                <p className="">Quantity :{OrderQuantity}</p>
                                                <p className="">Profit Margin :{product.productProfitMarginPercentage} %</p>
                                            </div>

                                        </div>
                                    </div>
                                    {/* below image */}
                                    <div className="rounded-md flex ">
                                        {/* left */}
                                        <div className=" rounded-md w-1/2">
                                            <p>Weight : {product.productWeight}</p>
                                            <p>Available Stokes : {product.productAvailableStokes}</p>
                                            <p>Total Items Sold :{product.productTotalItemSold}</p>
                                            <div className="flex mt-1">
                                                <p className='mr-6'>Status :</p>
                                                <Badge className="bg-green-300 text-black px-4 py-1 mt-1">
                                                    <p className=''>{product.productStatus}</p>
                                                </Badge>
                                            </div>
                                            <div className="flex mt-1">
                                                <p className='mr-2'>Visibility :</p>
                                                <Badge className="bg-orange-300 text-black px-4 py-1 mt-1">
                                                    <p className=''>{product.productVisibility}</p>
                                                </Badge>
                                            </div>
                                            {/* ratings */}
                                            <div className="flex items-center">
                                                <span className="mr-2">Ratings:</span>
                                                <div className="flex mt-1">
                                                    {Array.from({ length: product.productRatings }, (_, index) => (
                                                        <Star key={index} fill="#FFD254" strokeWidth={0} className="w-4 h-4" />
                                                    ))}
                                                    {Array.from({ length: 5 - product.productRatings }, (_, index) => (
                                                        <Star key={5 * product.productRatings + index} fill="#111" strokeWidth={0} className="w-4 h-4" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/* right */}
                                        <div className="rounded-md ml-10">
                                            <p className="font-semibold">Product Price: {product.productPrice}</p>
                                            <p className="font-semibold">Shipping Fee: {order?.shippingCost || 0}</p>
                                            <p className="font-semibold">Total Price: {
                                                order && product ? (
                                                    (product.productPrice * OrderQuantity) +
                                                    ((product.productPrice * OrderQuantity) * (product.productProfitMarginPercentage / 100)) +
                                                    (order.shippingCost || 0)
                                                ).toFixed(2) : 0
                                            }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* order summary */}
                        <div className="p-4 rounded-md">
                            <div className="  flex items-center justify-center text-lg font-bold rounded-md">
                                Order Summary
                            </div>

                            {order && (
                                <div className="space-y-3 mt-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-semibold">Order Placed ON :</p>
                                            <p>{new Date(order.orderDateTime).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Expected Delivery Date :</p>
                                            <p>{new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex">
                                            <p className="font-semibold ">Status :</p>
                                            <span className={`px-4 py-1 ml-1 rounded-full pb-3 mb-3 h-6 ${order.orderStatus === 'PENDING' ? 'bg-blue-100 text-blue-800' :
                                                order.orderStatus === 'PROCESSING' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.orderStatus === 'SHIPPED' ? 'bg-purple-100 text-purple-800' :
                                                        order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                                                            order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Payment Method:</p>
                                            <p>{order.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p className="font-semibold">Special Notes :</p>
                                        <div className="rounded-md bg-gray-300 p-1">
                                            {order.notes}
                                        </div>
                                    </div>
                                    {/* button */}
                                    <div className="">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            className="bg-blue-600 hover:bg-blue-800 text-white hover:text-black">
                                            Update Summery
                                        </Button>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MoreAboutAnOrderPOPUPButton;