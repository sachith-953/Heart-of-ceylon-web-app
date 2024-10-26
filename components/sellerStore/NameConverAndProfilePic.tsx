'use client'


import Image from "next/image"
import MaxWidthLg from "../MaxWidthLg"
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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


const NameCoverAndProfilePic: React.FC<ChildProps> = ({ sellerId, }) => {

    const BASE_URL = process.env.NEXT_PUBLIC_URL;

    {/* https://ui.shadcn.com/docs/components/toast */ }
    const { toast } = useToast()

    const router = useRouter()

    const [loading, setLoading] = useState(true); // set default value to ture: so initially loading state

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
            }

            else {
                // show error notification in red color
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Plase Try Again. There was a problem with your request."
                })
            }

        }
        catch (error) {
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
                    <div className="relative ">

                        {/* Cover image container: 1280x320px recommended */}
                        <div className="w-full h-80 relative">
                            {sellerDetails !== undefined && sellerDetails.coverImage !== null ? (
                                // if cover image is avalilbe 
                                <Image
                                    src={sellerDetails?.coverImage}
                                    fill
                                    className="object-cover"
                                    alt="cover image"
                                    priority
                                />
                            ) : (
                                // if cover image is not availabe
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
                                    // if sellerDetails is availabel
                                    <Image
                                        src={sellerDetails?.profilePicture}
                                        fill
                                        className="object-cover"
                                        alt="profile image"
                                    />
                                ) : (
                                    // if sellerDetails not availabel
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



                {/* Spacer to account for overlapping profile picture */}
                {/* store details */}
                <div className="h-16 border-2 border-red-600">
                    {/* store name here  */}
                </div>
            </MaxWidthLg>
        </div>
    )
}

export default NameCoverAndProfilePic