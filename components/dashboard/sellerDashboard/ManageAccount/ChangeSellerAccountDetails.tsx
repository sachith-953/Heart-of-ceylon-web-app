'use client'

import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface sellerDetailsDataType {
    categories: string
    storeDescription: string
    phoneNo: string
    sellerAddress: string
    district: string
}

const ChangeSellerAccountDetails = () => {

    const BASE_URL = process.env.NEXT_PUBLIC_URL;

    {/* https://ui.shadcn.com/docs/components/toast */ }
    const { toast } = useToast()

    const router = useRouter()

    const [loading, setLoading] = useState(false);

    const [sellerDetails, setSellerDetails] = useState<sellerDetailsDataType>()

    const [categories, setCategories] = useState("");
    const [storeDescription, setStoreDescription] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [sellerAddress, setSellerAddress] = useState("");
    const [district, setDistrict] = useState("");

    const fetchSellerDetails = async () => {
        try {
            const res = await fetch(
                `${BASE_URL}/api/seller-dashboard/get-seller-private-details`,
                { cache: 'no-store' }
            );

            if (res.ok) {
                const ResponseData = await res.json()
                console.log(ResponseData)
                console.log("successfully changed acc info")
                setSellerDetails(ResponseData)
            }
            else if (res.status === 403) {    
                // this trigger when referesh token has issure. 
                // if token is expired this will trigger
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                })
                console.log("****403****************")
                console.log("Redirectiong to login. RT error")
                router.push("/seller-log-in"); 
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
        }
    }


    const handleSubmit = () => { }

    useEffect(() => {

        fetchSellerDetails()
        if(sellerDetails !== undefined){
            setCategories(sellerDetails.categories)
            setStoreDescription(sellerDetails.storeDescription)
            setPhoneNo(sellerDetails.phoneNo)
            setSellerAddress(sellerDetails.sellerAddress)
            setDistrict(sellerDetails.district)
        }

    }, []);

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto mt-8 p-4">
                    <p className="text-2xl font-bold mb-4">Update Store Details</p>
                    <hr className="py-3" />
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-row">

                        {/* <div className="">
                            <label htmlFor="productImage" className="block mb-1 font-semibold text-lg">Choose image</label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                required
                                accept="image/*"
                                className="w-full"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={` bg-blue-500 text-white py-2 px-5 rounded-3xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            {loading ? 'Updating Image...' : 'Update Store Cover Image'}
                        </button> */}
                    </form>

                    
                    <p>categories : {categories}</p>
                    <p>storeDescription : {storeDescription}</p>
                    <p>phoneNo : {phoneNo}</p>
                    <p>sellerAddress : {sellerAddress}</p>
                    <p>district : {district}</p>

                </div>
            </div>
        </>
    )
}
export default ChangeSellerAccountDetails

