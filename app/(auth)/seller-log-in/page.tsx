"use client"

import ErrorForCatch from "@/components/ErrorForCatch"
import Navbar from "@/components/Navbar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function SellerLoginPage() {
    const router = useRouter()
    const [serverError, setServerError] = useState("")
    const [success, setSuccess] = useState("")
    const [isSub, setIsSub] = useState(false);

    const buttonIsClicked = async () => {
        setIsSub(true)
        console.log("submitting :" + isSub)
    }

    const handleFormSubmit = async (formData: FormData) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/login`, {
                method: 'POST',
                body: formData
            })

            const ResponseData = await res.json()

            console.log(ResponseData)

            if (ResponseData.success === true && ResponseData.role == "ROLE_BUYER") {
                setServerError("Logged in. Please Wait...")
                router.push(`${process.env.NEXT_PUBLIC_URL}/`)
            }
            else if(ResponseData.success === true && ResponseData.role == "ROLE_SELLER"){
                setServerError("Logged in. Please Wait...")
                router.push(`${process.env.NEXT_PUBLIC_URL}/seller-dashboard`)
            }
            else {
                setSuccess(ResponseData.success)
                setServerError("Seller Email or Password is not Correct")
            }
        }
        catch (error) {
            console.error('Error submitting form:', error);
            return(
                <ErrorForCatch />
            )
        } finally {
            setIsSub(false);
        }
    }

    const deleteCookies = async () => {
        console.log("!!!!!! Cookies Deleted !!!!!!")
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cookies/delete-cookies`, {
            cache: 'no-store'
        });
    };

    useEffect(() => {
        deleteCookies()
    }, [])

    return (
        <>
            <Navbar />

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Log-in to your Seller account
                    </h2>
                    <p className='text-center mt-3 text-red-600'>
                        {!success && serverError}
                    </p>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-3" action={handleFormSubmit} onSubmit={buttonIsClicked}>
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                Seller Email
                            </label>
                            <div className="">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    placeholder="yourEmail@abc.com"
                                    className="pl-3 block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:text-red-600
                                    focus:invalid:border-red-500 focus:invalid:ring-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    minLength={8}
                                    required
                                    placeholder="your password"
                                    className="pl-3 block w-full rounded-md py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white border border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 invalid:text-red-600
                                    focus:invalid:border-red-500 focus:invalid:ring-red-500"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isSub}
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSub ? (
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
                                        Submitting...
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>

                    {/* New Sign-up Section */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">Don{"'"}t have a seller account?</p>
                        <Link 
                            href="/seller-sign-up" 
                            className="mt-3 inline-block px-6 py-2 text-sm font-medium leading-6 text-white transition-colors duration-1000 transform bg-gradient-to-r from-purple-600 to-indigo-600 rounded-md hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
                        >
                            Create Seller Account
                        </Link>
                        <div className="mt-2 text-xs text-gray-400">
                            Start selling your products today!
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}