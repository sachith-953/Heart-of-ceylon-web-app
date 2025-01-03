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

    const [isReload, setIsReload] = useState(false); // use to reload the component when details updated

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
                setIsReload(true)
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

    const handleDetailsUpdateForm = async (formData: FormData) => {

        //buttonIsClicked function update useState to track whether 
        //form is submitted or not. action method cannot use for such things

        try {
            const res = await fetch(`${BASE_URL}/api/seller-dashboard/update-seller-private-details`, {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                const ResponseData = await res.json()
                console.log(ResponseData)
                console.log("successfully changed acc info")
                toast({
                    title: "Success!",
                    description: "Successfully changed Your Account Infomation",
                })
                setIsReload(!isReload)
            }
            else if (res.status === 403) {
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
                const ResponseData = await res.json()
                console.log(ResponseData)
                // show error notification in red color
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Plase Try Again. There was a problem with your request." + ResponseData.message
                })
            }
        }
        catch (error) {
            console.error('Error submitting form:', error);
            toast({
                variant: "destructive",
                title: "UnExpected Error!!",
                description: "Error While Update Seller Account details. Please Try again."
            })
        }

    }


    const handleSubmit = () => { }

    useEffect(() => {

        fetchSellerDetails()
        if (sellerDetails !== undefined) {
            setCategories(sellerDetails.categories)
            setStoreDescription(sellerDetails.storeDescription)
            setPhoneNo(sellerDetails.phoneNo)
            setSellerAddress(sellerDetails.sellerAddress)
            setDistrict(sellerDetails.district)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReload]);

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto mt-8 p-4">
                    <p className="text-2xl font-bold mb-4">Update Store Details</p>
                    <hr className="py-3" />

                    <form action={handleDetailsUpdateForm} className="space-y-4 flex flex-col">

                        <div className="flex flex-col space-y-2">

                            <div className="w-full">
                                <label className="w-1/3 text-right mr-4 text-gray-700">categories:</label>
                                <input
                                    type="text"
                                    name="categories"
                                    value={categories}
                                    onChange={(e) => setCategories(e.target.value)}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="w-full">
                                <label className="w-1/3 text-right mr-4 text-gray-700">Store Description:</label>
                                <textarea
                                    name="storeDescription"
                                    value={storeDescription}
                                    onChange={(e) => setStoreDescription(e.target.value)}
                                    rows={4}  // You can adjust this number to control initial height
                                    className="w-full resize-y px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="w-full">
                                <label className="w-1/3 text-right mr-4 text-gray-700">Phone Number:</label>
                                <input
                                    type="text"
                                    name="phoneNo"
                                    value={phoneNo}
                                    onChange={(e) => setPhoneNo(e.target.value)}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="w-full">
                                <label className="w-1/3 text-right mr-4 text-gray-700">Seller Address:</label>
                                <input
                                    type="text"
                                    name="sellerAddress"
                                    value={sellerAddress}
                                    onChange={(e) => setSellerAddress(e.target.value)}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="w-full">
                                <label className="w-1/3 text-right mr-4 text-gray-700">District:</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-1/2 bg-blue-500 text-white py-2 px-5 rounded-3xl ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            {loading ? 'Updating Details...' : 'Update Store Details'}
                        </button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default ChangeSellerAccountDetails