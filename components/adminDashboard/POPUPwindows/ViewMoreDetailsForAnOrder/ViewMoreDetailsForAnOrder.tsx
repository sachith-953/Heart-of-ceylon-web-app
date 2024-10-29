// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
// } from "@/components/ui/dialog";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/components/ui/use-toast";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import React from 'react';
// import { 
//     Loader2, 
//     Mail, 
//     Phone, 
//     MapPin, 
//     Store,
//     Star,
// } from "lucide-react";


// export enum sellerStatusEnum { 
//     ACTIVE = 'ACTIVE',
//     NOT_APPROVED = 'NOT_APPROVED',
//     SUSPEND = 'SUSPEND',
//     DELETED = 'DELETED',
   
// }

// export enum ProductVisibilityEnum{
//     PRIVATE = "PRIVATE",
//     PUBLIC = "PUBLIC"
// }

// export enum ProductVisibilityEnum{
//     PRODUCT_IS_ACTIVE = "PRODUCT_IS_ACTIVE",
//     SUSPEND = "SUSPEND",
//     DISCONTINUED = "DISCONTINUED",
//     VERIFIED = "VERIFIED",
//     TO_BE_VERIFIED = "TO_BE_VERIFIED",
//     DELETED ="DELETED"
// }

// export enum OrderStatusEnum{
//     PENDING ="PENDING",
//     PROCESSING ="PROCESSING",
//     SHIPPED ="SHIPPED",
//     DELIVERED ="DELIVERED",
//     CANCELLED ="CANCELLED"
// }

// interface SellerDetails{
// sellerID: number,
// storeName: string,
// sellerStatus: sellerStatusEnum,
// ratings: string,
// badges: string,
// accountCreatedDate: string,
// categories:string,
// storeDescription: string,
// totalSales: number,
// phoneNo:string,
// sellerAddress: string,
// sellerEmail: string,
// district: string,
// profilePicture: string

// }

// interface BuyertDetails {
//     id: number;
//     email: string;
//     firstName: string;
//     lastName: string;
//     gender: string;
//     phoneNo: string;
//     shippingAddress: string;
//     city: string;
//     country: string;
// }

// interface ProductDetails {
//     productID:number,
//     productName: string,
//     productAvailableStokes: number,
//     productDescription: string,
//     productPrice: number,
//     productMainImage: string,
//     productWeight: number,
//     productDimensions: string,
//     productCreatedDate:string,
//     productStatus: ProductVisibilityEnum,
//     productKeyWords:string,
//     productNoOfRatings: number,
//     productVisibility: ProductVisibilityEnum,
//     productRatings: number,
//     productTotalItemSold: number,
//     productNotes: string,
//     productProfitMarginPercentage: number,
//     productManufacture: string,
//     productDiscountPrice: number

// }

// interface OrderSummery{
//     orderDateTime: string,
//     orderStatus: OrderStatusEnum,
//     paymentMethod: string,
//     expectedDeliveryDate: string,
//     notes: string
// }

// interface AllDetailsModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     orderID: number;
// }


// const AllDetailsModal: React.FC<AllDetailsModalProps> = ({
//     isOpen,
//     onClose,
//     orderID,
// }) => {
//     const [seller, setSeller] = React.useState<SellerDetails | null>(null);
//     const [buyer, setBuyer] = React.useState<BuyertDetails | null>(null);
//     const [product, setProduct] = React.useState<ProductDetails | null>(null);
//     const [order, setOrder] = React.useState<OrderSummery | null>(null);
//     const [isLoading, setIsLoading] = React.useState(false);
//     const [error, setError] = React.useState<string | null>(null);
//     const { toast } = useToast();
//     const router = useRouter();

    // const fetchSellerDetails = async () => {
    //     try {
    //         setIsLoading(true);
    //         setError(null);
    //         const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUP-all-details-of-an-order-Seller-details', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ orderID }),
    //             credentials: 'include',
    //         });

    //         if (res.ok) {
    //             const responseData = await res.json();
    //             setSeller(responseData);
    //         } else if (res.status === 403) {
    //             setSeller(null);
    //             toast({
    //                 variant: "destructive",
    //                 title: "Sorry!",
    //                 description: "Please Login again. Your Session has Expired!",
    //             });
    //             await new Promise(resolve => setTimeout(resolve, 100));
    //             router.push("/seller-log-in");
    //         } else {
    //             const errorData = await res.json();
    //             toast({
    //                 variant: "destructive",
    //                 title: "Something went wrong.",
    //                 description: "Please Try Again. There was a problem with your request. " + errorData.message,
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error fetching seller details for a requested order:", error);
    //         setError("Failed to load seller data. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const fetchBuyerDetails = async () => {
    //     try {
    //         setIsLoading(true);
    //         setError(null);
    //         const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUP-all-details-of-an-order-Buyer-details', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ orderID }),
    //             credentials: 'include',
    //         });

    //         if (res.ok) {
    //             const responseData = await res.json();
    //             setBuyer(responseData);
    //         } else if (res.status === 403) {
    //             setBuyer(null);
    //             toast({
    //                 variant: "destructive",
    //                 title: "Sorry!",
    //                 description: "Please Login again. Your Session has Expired!",
    //             });
    //             await new Promise(resolve => setTimeout(resolve, 100));
    //             router.push("/seller-log-in");
    //         } else {
    //             const errorData = await res.json();
    //             toast({
    //                 variant: "destructive",
    //                 title: "Something went wrong.",
    //                 description: "Please Try Again. There was a problem with your request. " + errorData.message,
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error fetching buyer details for a requested order:", error);
    //         setError("Failed to load buyer data. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const fetchProductDetails = async () => {
    //     try {
    //         setIsLoading(true);
    //         setError(null);
    //         const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUP-all-details-of-an-order-Product-details', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ orderID }),
    //             credentials: 'include',
    //         });

    //         if (res.ok) {
    //             const responseData = await res.json();
    //             setProduct(responseData);
    //         } else if (res.status === 403) {
    //             setProduct(null);
    //             toast({
    //                 variant: "destructive",
    //                 title: "Sorry!",
    //                 description: "Please Login again. Your Session has Expired!",
    //             });
    //             await new Promise(resolve => setTimeout(resolve, 100));
    //             router.push("/seller-log-in");
    //         } else {
    //             const errorData = await res.json();
    //             toast({
    //                 variant: "destructive",
    //                 title: "Something went wrong.",
    //                 description: "Please Try Again. There was a problem with your request. " + errorData.message,
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error fetching product details for a requested order:", error);
    //         setError("Failed to load product data. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // const fetchOrderDetails = async () => {
    //     try {
    //         setIsLoading(true);
    //         setError(null);
    //         const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUP-all-details-of-an-order-Order-summery', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ orderID }),
    //             credentials: 'include',
    //         });

    //         if (res.ok) {
    //             const responseData = await res.json();
    //             setOrder(responseData);
    //         } else if (res.status === 403) {
    //             setOrder(null);
    //             toast({
    //                 variant: "destructive",
    //                 title: "Sorry!",
    //                 description: "Please Login again. Your Session has Expired!",
    //             });
    //             await new Promise(resolve => setTimeout(resolve, 100));
    //             router.push("/seller-log-in");
    //         } else {
    //             const errorData = await res.json();
    //             toast({
    //                 variant: "destructive",
    //                 title: "Something went wrong.",
    //                 description: "Please Try Again. There was a problem with your request. " + errorData.message,
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error fetching order summery details for a requested order:", error);
    //         setError("Failed to load order summery. Please try again.");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

//     React.useEffect(() => {
//         if (isOpen && orderID) {
//             fetchSellerDetails();
//             fetchBuyerDetails();
//             fetchProductDetails();
//             fetchOrderDetails();
//         }
//     }, [isOpen, orderID]);

//     React.useEffect(() => {
//         if (!isOpen) {
//             setSeller(null);
//             setBuyer(null);
//             setProduct(null);
//             setOrder(null)
//             setError(null);
//         }
//     }, [isOpen]);

//     return (
//         <Dialog open={isOpen} onOpenChange={onClose}>
//             <DialogContent className="w-3/4 max-w-[100vw] h-dvh p-1 bg-gray-200 flex flex-col rounded-md">
//                 <DialogHeader className="bg-gray-200">
//                     <DialogTitle className="text-xl font-bold text-black text-center rounded-md p-2">
//                         All Details About Requested Order
//                     </DialogTitle>
//                 </DialogHeader>

//                 {isLoading ? (
//                     <div className="flex justify-center items-center h-[60vh]">
//                         <Loader2 className="h-8 w-8 animate-spin" />
//                     </div>
//                 ) : error ? (
//                     <div className="text-center text-red-500 p-4">{error}</div>
//                 ) : (
//                     <div className="overflow-y-auto">
//                         {seller && ( )}
//                         {buyer && ( )}
//                         {product && ( )}
//                         {order && ( )}

//                 </div>
//                 )}
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default AllDetailsModal;
        

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from 'react';
import { 
    Loader2, 
    Mail, 
    Phone, 
    MapPin, 
    Store,
    Star,
} from "lucide-react";


export enum sellerStatusEnum { 
    ACTIVE = 'ACTIVE',
    NOT_APPROVED = 'NOT_APPROVED',
    SUSPEND = 'SUSPEND',
    DELETED = 'DELETED',
   
}

export enum ProductVisibilityEnum{
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC"
}

export enum ProductVisibilityEnum{
    PRODUCT_IS_ACTIVE = "PRODUCT_IS_ACTIVE",
    SUSPEND = "SUSPEND",
    DISCONTINUED = "DISCONTINUED",
    VERIFIED = "VERIFIED",
    TO_BE_VERIFIED = "TO_BE_VERIFIED",
    DELETED ="DELETED"
}

export enum OrderStatusEnum{
    PENDING ="PENDING",
    PROCESSING ="PROCESSING",
    SHIPPED ="SHIPPED",
    DELIVERED ="DELIVERED",
    CANCELLED ="CANCELLED"
}

interface SellerDetails{
sellerID: number,
storeName: string,
sellerStatus: sellerStatusEnum,
ratings: string,
badges: string,
accountCreatedDate: string,
categories:string,
storeDescription: string,
totalSales: number,
phoneNo:string,
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
    productID:number,
    productName: string,
    productAvailableStokes: number,
    productDescription: string,
    productPrice: number,
    productMainImage: string,
    productWeight: number,
    productDimensions: string,
    productCreatedDate:string,
    productStatus: ProductVisibilityEnum,
    productKeyWords:string,
    productNoOfRatings: number,
    productVisibility: ProductVisibilityEnum,
    productRatings: number,
    productTotalItemSold: number,
    productNotes: string,
    productProfitMarginPercentage: number,
    productManufacture: string,
    productDiscountPrice: number

}

interface OrderSummery{
    orderDateTime: string,
    orderStatus: OrderStatusEnum,
    paymentMethod: string,
    expectedDeliveryDate: string,
    notes: string
}

interface AllDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderID: number;
}


const AllDetailsModal: React.FC<AllDetailsModalProps> = ({
    isOpen,
    onClose,
    orderID,
}) => {
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
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUP-all-details-of-an-order-Seller-details', {
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
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUP-all-details-of-an-order-Buyer-details', {
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
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUP-all-details-of-an-order-Product-details', {
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
            const res = await fetch('http://localhost:3000/api/admin-dashboard/POPUP-all-details-of-an-order-Order-summery', {
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
            console.error("Error fetching order summery details for a requested order:", error);
            setError("Failed to load order summery. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        if (isOpen && orderID) {
            fetchSellerDetails();
            fetchBuyerDetails();
            fetchProductDetails();
            fetchOrderDetails();
        }
    }, [isOpen, orderID]);

    React.useEffect(() => {
        if (!isOpen) {
            setSeller(null);
            setBuyer(null);
            setProduct(null);
            setOrder(null);
            setError(null);
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-11/12 max-w-7xl h-[90vh] p-6 bg-gray-100">
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
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Store className="h-5 w-5" />
                                Seller Details
                            </h2>
                            {seller && (
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-4">
                                        <img 
                                            src={seller.profilePicture || "/api/placeholder/100/100"} 
                                            alt="Store" 
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{seller.storeName}</h3>
                                            <div className="flex items-center space-x-1">
                                                <Star className="h-4 w-4 text-yellow-400" />
                                                <span>{seller.ratings}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {seller.sellerEmail}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {seller.phoneNo}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            {seller.sellerAddress}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge variant="outline">{seller.sellerStatus}</Badge>
                                            {seller.badges.split(',').map((badge, index) => (
                                                <Badge key={index} variant="secondary">{badge.trim()}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
    
                        {/* buyer */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold mb-4">Buyer Details</h2>
                            {buyer && (
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-semibold">
                                            {buyer.firstName} {buyer.lastName}
                                        </h3>
                                        <p className="text-sm text-gray-500">{buyer.gender}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            {buyer.email}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {buyer.phoneNo}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            {buyer.shippingAddress}
                                        </p>
                                        <p className="text-sm">
                                            {buyer.city}, {buyer.country}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
    
                        {/* product */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold mb-4">Product Details</h2>
                            {product && (
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-4">
                                        <img 
                                            src={product.productMainImage || "/api/placeholder/100/100"} 
                                            alt={product.productName} 
                                            className="w-24 h-24 rounded-lg object-cover"
                                        />
                                        <div>
                                            <h3 className="font-semibold">{product.productName}</h3>
                                            <div className="flex items-center space-x-2">
                                                <Star className="h-4 w-4 text-yellow-400" />
                                                <span>{product.productRatings} ({product.productNoOfRatings} reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <p className="font-semibold">Price:</p>
                                            <p>${product.productPrice}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Discount:</p>
                                            <p>${product.productDiscountPrice}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Stock:</p>
                                            <p>{product.productAvailableStokes}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Total Sold:</p>
                                            <p>{product.productTotalItemSold}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Badge variant="outline">{product.productStatus}</Badge>
                                        <Badge variant="secondary">{product.productVisibility}</Badge>
                                    </div>
                                </div>
                            )}
                        </div>
    
                        {/* order summary */}
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                            {order && (
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-semibold">Order Date:</p>
                                            <p>{new Date(order.orderDateTime).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Expected Delivery:</p>
                                            <p>{new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Status:</p>
                                            <Badge variant="outline">{order.orderStatus}</Badge>
                                        </div>
                                        <div>
                                            <p className="font-semibold">Payment Method:</p>
                                            <p>{order.paymentMethod}</p>
                                        </div>
                                    </div>
                                    {order.notes && (
                                        <div className="mt-4">
                                            <p className="font-semibold">Notes:</p>
                                            <p className="text-sm text-gray-600">{order.notes}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default AllDetailsModal;