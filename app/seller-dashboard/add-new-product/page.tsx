'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useToast } from '@/components/ui/use-toast';



export default function AddProductPage() {

    const router = useRouter()
    const { toast } = useToast()
    const BASE_URL = process.env.NEXT_PUBLIC_URL;

    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState<string | null>(null);
    // const [success, setSuccess] = useState(false);


    const handleFormSubmit = async (formData: FormData) => {

        try {
            const res = await fetch(`${BASE_URL}/api/seller-dashboard/list-new-product`, {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                const ResponseData = await res.text()
                console.log(ResponseData)
                console.log("add-new-product > successfully listed the product")
                toast({
                    title: "Success!",
                    description: "Your Product Has Added Successfully!",
                })
                router.push("/seller-dashboard/add-new-product/add-new-product-confirm-message");
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
                console.log("add-new-product > Redirectiong to login. RT error")
                router.push("/seller-log-in");
            }
            else {
                const ResponseData = await res.json()
                console.warn("add-new-product > " + ResponseData)
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
                title: "UnExpected Error",
                description: "Please Try again."
            })
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-8 p-4 bg-white">
            <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

            <form action={handleFormSubmit} className="space-y-2">
                <div>
                    <label htmlFor="productName" className="block mb-1">Product Name</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productAvailableStokes" className="block mb-1">Available Stock</label>
                    <input
                        type="number"
                        id="productAvailableStokes"
                        name="productAvailableStokes"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productDescription" className="block mb-1">Description</label>
                    <textarea
                        id="productDescription"
                        name="productDescription"
                        required
                        className="w-full border rounded px-3 py-2 h-32"
                    />
                </div>

                <div>
                    <label htmlFor="productPrice" className="block mb-1">Price</label>
                    <input
                        type="number"
                        id="productPrice"
                        name="productPrice"
                        step="0.01"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productWeight" className="block mb-1">Weight in Killo Grans (Kg))</label>
                    <input
                        type="number"
                        id="productWeight"
                        name="productWeight"
                        step="0.01"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productDimensions" className="block mb-1">Dimensions</label>
                    <input
                        type="text"
                        id="productDimensions"
                        name="productDimensions"
                        required
                        placeholder="e.g., 10x20x30 cm"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productKeyWords" className="block mb-1">Keywords</label>
                    <input
                        type="text"
                        id="productKeyWords"
                        name="productKeyWords"
                        placeholder="Comma-separated keywords"
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label htmlFor="productManufacture" className="block mb-1">Manufacturer</label>
                    <input
                        type="text"
                        id="productManufacture"
                        name="productManufacture"
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className='pb-4'>
                    <label htmlFor="productImage" className="block mb-1">Product Image</label>
                    <input
                        type="file"
                        id="productImage"
                        name="productImage"
                        required
                        accept="image/*"
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                >
                    {loading ? 'Adding Product...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}

