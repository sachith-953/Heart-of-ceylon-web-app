
'use client';

import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useToast } from "../../../ui/use-toast";


const UploadCoverImage = () => {

    const router = useRouter()

    // display messages
    const { toast } = useToast()

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const formElement = event.currentTarget;
            const formData = new FormData(formElement);

            const response = await fetch('http://localhost:3000/api/seller-dashboard/upload-cover-image', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                formElement.reset();
                toast({
                    title: "Successfully Updated!",
                    description: "Your Store Cover Image Upload Complete",
                })
            }
            else if (response.status === 403) {
                // this trigger when referesh token has issure. 
                // if token is expired this will trigger
                toast({
                    variant: "destructive",
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                })
                console.log("**** UploadCoverImage >> 403 ****************")
                console.log("Redirectiong to login. RT error")
                router.push("/seller-log-in");
            }
            else {
                const data = await response.json(); // route returns a response object
                // show error notification in red color
                toast({
                    variant: "destructive",
                    title: "Something went wrong.",
                    description: "Plase Try Again. There was a problem with your request." + data.message,
                })
                console.error('Error submitting form uploadCoverImage:', response.status);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast({
                variant: "destructive",
                title: "UnExpected Error",
                description: "Please Try again."
            })
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto mt-8 p-4">
                    <p className="text-2xl font-bold mb-4">Store Cover Image</p>
                    <hr className="py-3" />
                    <form onSubmit={handleSubmit} className="space-y-4 flex flex-row">

                        
                        <div className="">
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
                        </button>
                    </form>
                    <p className="mt-8 text-gray-500 text-sm text-justify">
                        Image must be xxxx px wide by xxx px high and in JPEG or PNG format. (maximum image size : 5Mb)
                    </p>

                </div>
            </div>
        </>
    )
}
export default UploadCoverImage
