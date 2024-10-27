'use client'

import Image from "next/image"
import MaxWidthLg from "../MaxWidthLg"
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MapPin, Phone, Mail, Badge, ShieldCheck } from "lucide-react";

interface sellerDetailsDataType {
    profilePicture: string
    coverImage: string
    phoneNo: string
    sellerEmail: string
    storeName: string
}

interface ChildProps {
    sellerId: number;
}

const NameCoverAndProfilePic: React.FC<ChildProps> = ({ sellerId }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_URL;
    const { toast } = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [sellerDetails, setSellerDetails] = useState<sellerDetailsDataType>()

    const fetchSellerDetails = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/seller-store/get-seller-details`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sellerId: sellerId,
                })
            });

            if (res.ok) {
                const ResponseData = await res.json()
                console.log(ResponseData)
                console.log("successfully fetched seller info")
                setSellerDetails(ResponseData)
            } else {
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Plase Try Again. There was a problem with your request."
                })
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                variant: "destructive",
                title: "Oh! Something Unexpected Happend.",
                description: "There was a problem with your request. Please Check the internet Connection",
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSellerDetails();
    }, []);

    return (
        <div className="bg-white">
            <MaxWidthLg>
                {loading ? (
                    <div className="bg-muted animate-pulse rounded-2xl w-full h-80"></div>
                ) : (
                    <div className="relative">
                        {/* Cover image container: 1280x320px recommended */}
                        <div className="w-full h-80 relative">
                            {sellerDetails !== undefined && sellerDetails.coverImage !== null ? (
                                <Image
                                    src={sellerDetails?.coverImage}
                                    fill
                                    className="object-cover"
                                    alt="cover image"
                                    priority
                                />
                            ) : (
                                <Image
                                    src="https://www.srilankabusiness.com/images/products/banners/logistic.jpg"
                                    fill
                                    className="object-cover"
                                    alt="cover image"
                                    priority
                                />
                            )}
                        </div>

                        {/* Profile picture container: 128x128px recommended */}
                        <div className="absolute -bottom-16 left-8">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-white ring-offset-0">
                                {sellerDetails !== undefined && sellerDetails.profilePicture !== null ? (
                                    <Image
                                        src={sellerDetails?.profilePicture}
                                        fill
                                        className="object-cover"
                                        alt="profile image"
                                    />
                                ) : (
                                    <Image
                                        src="my_prof_img.svg"
                                        fill
                                        className="object-cover"
                                        alt="profile image"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Store details section */}
                <div className="pt-20 pb-6 px-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {sellerDetails?.storeName || "Loading..."}
                            </h1>
                            <div className="flex items-center gap-2 text-gray-600">
                                <span className="text-sm">Verified Seller</span>
                                <ShieldCheck className="ml-2" color="#3e9392"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {sellerDetails?.phoneNo && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span>{sellerDetails.phoneNo}</span>
                                </div>
                            )}
                            {sellerDetails?.sellerEmail && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Mail className="w-4 h-4" />
                                    <span>{sellerDetails.sellerEmail}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </MaxWidthLg>
        </div>
    )
}

export default NameCoverAndProfilePic