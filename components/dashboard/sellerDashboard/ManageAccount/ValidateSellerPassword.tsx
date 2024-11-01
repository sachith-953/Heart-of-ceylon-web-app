'use client'


import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { DialogClose } from '@radix-ui/react-dialog';
import { useToast } from '@/components/ui/use-toast';


interface ChildProps {
    onChildDataChange: (newChildData: string) => void;
}

const ValidateSellerPassword: React.FC<ChildProps> = ({ onChildDataChange, }) => {

    const router = useRouter()

    // display messages
    const { toast } = useToast()

    const [password, setPassword] = useState("")
    const [touched, setTouched] = useState(false)

    const [isPasswordVerified, setIsPasswordVerified] = useState(false)

    const [error, setError] = useState("")

    const [isSubmitted, setIsSubmitted] = useState(false)


    const buttonIsClicked = async () => {
        setIsSubmitted(true)
    }


    const handleFormSubmit = async (formData: FormData) => {

        try {
            const res = await fetch('http://localhost:3000/api/buyer/dashboard/verify-password', {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                const ResponseData = await res.json()
                console.log(ResponseData)
                console.log("successfully changed acc info")
                setIsPasswordVerified(true)
                setError("")
                setIsSubmitted(false)
                onChildDataChange(password)
            }
            else if (res.status === 403) {
                // this trigger when referesh token has issure. 
                // if token is expired this will trigger
                toast({
                    title: "Sorry!",
                    description: "Please Login again. Your Session has Expired!",
                })
                console.log("****403****************")
                console.log("Redirectiong to login. RT error")
                router.push("/seller-log-in");
            }
            else {
                const resError = await res.json()
                console.log(resError)
                setError(resError.message)
                setIsSubmitted(false)
            }
        }
        catch (error) {
            console.error('Error submitting form:', error);
            toast({
                variant: "destructive",
                title: "UnExpected Error",
                description: "Please Try again."
            })
        } finally {

        }
    }

    useEffect(() => {
        if (isPasswordVerified) {
            onChildDataChange(password)
        }
    }, [isPasswordVerified, password, onChildDataChange]);


    return (
        <div className='bg-white flex items-center justify-center '>
            <div className='rounded-lg w-full p-4'>

                <h1 className='text-xl sm:text-2xl font-bold mb-3 text-center text-gray-800'>
                    Enter your current password
                </h1>

                {
                    error !== ""
                        ?
                        <p className='text-red-500 text-center text-sm'>{error}</p>
                        :
                        <p></p>
                }

                <div className=''>

                    <form
                        action={handleFormSubmit}
                        onSubmit={buttonIsClicked}
                        className='space-y-4'>
                        <div className='flex flex-col items-center'>

                            <input
                                type="password"
                                id="oldPassword"
                                name="oldPassword"
                                placeholder="Enter current password"
                                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setTouched(true)
                                }}
                            />

                        </div>

                        <div className='flex justify-between items-center pt-2 px-4 gap-5'>

                            <DialogClose asChild>
                                <button type="button" className='bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition duration-300 ease-in-out'>
                                    Cancel
                                </button>
                            </DialogClose>


                            <button
                                type="submit"
                                disabled={isSubmitted}
                                className="rounded bg-blue-600 px-4 py-2 leading-6 text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out"
                            >
                                {isSubmitted ? (
                                    <div className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Please Wait...
                                    </div>
                                ) : (
                                    'Done'
                                )}
                            </button>
                        </div>


                    </form>



                </div>
            </div>

        </div>
    )
}

export default ValidateSellerPassword