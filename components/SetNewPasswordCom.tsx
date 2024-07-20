'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/navigation";
import { useToast } from './ui/use-toast';
import { DialogClose } from '@radix-ui/react-dialog';

interface ChildProps {
    verifiesPasswordFromParent: string;
}



const SetNewPasswordCom: React.FC<ChildProps> = ({ verifiesPasswordFromParent, }) => {

    const router = useRouter()

    // display messages
    const { toast } = useToast()

    const closeButtonRef = useRef<HTMLButtonElement>(null);

    // Rgex
    const eightCharRegex = /^.{8,}$/;
    const atleastOneDigitRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*?[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]+$/;
    const oneSimpleAndOneCapitalRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]+$/;

    const [password, setPassword] = useState("")
    const [confPassword, setConfPassword] = useState("")
    const [touched, setTouched] = useState(false)

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [shouldClose, setShouldClose] = useState(false);
    const [error, setError] = useState("")


    const validationItemStyle = 'flex items-center space-x-2 text-sm';
    const checkIcon = <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
    const crossIcon = <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;

    const buttonIsClicked = async () => {
        setIsSubmitted(true)
    }

    const handleFormSubmit = async (formData: FormData) => {

        try {
            const res = await fetch('http://localhost:3000/api/buyer/dashboard/change-password', {
                method: 'POST',
                body: formData
            })

            if (res.ok) {
                const ResponseData = await res.json()
                console.log(ResponseData)
                console.log("successfully changed password")
                setError("")
                // close dialog box
                setShouldClose(true)
                // trigger notification
                toast({
                    title: "Password Updated",
                    description: "Your password has been successfully changed.",
                })
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
                router.push("/log-in");
            }
            else {
                const ResponseData = await res.json()
                setIsSubmitted(false)
                console.log(ResponseData.message)
                console.warn(ResponseData.message)
                setError(ResponseData.message)
                // toast({
                //     variant: "destructive",
                //     title: "Something went wrong.",
                //     description: "Plase Try Again. There was a problem with your request."
                // })
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

    // validate useinput and show hide user guide menu
    useEffect(() => {

        if (eightCharRegex.test(password.trim()) &&
            atleastOneDigitRegex.test(password.trim()) &&
            specialCharRegex.test(password.trim()) &&
            oneSimpleAndOneCapitalRegex.test(password.trim())
        ) {
            setTouched(false)
        }

    }, [password,]);

    // to close dialog box
    useEffect(() => {
        if (shouldClose && closeButtonRef.current) {
            closeButtonRef.current.click();
        }
    }, [shouldClose]);

    return (
        <div className='flex items-center justify-center'>
            <div className='bg-white rounded-lg w-full px-5 sm:p-0'>

                <h1 className='text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800'>
                    Enter Your New Password
                </h1>

                {
                    error !== ""
                        ?
                        <p className='text-red-500 text-center text-sm'>{error}</p>
                        :
                        <p></p>
                }

                <form
                    action={handleFormSubmit}
                    onSubmit={buttonIsClicked}
                    className='space-y-4'>

                    <div className='flex flex-col items-center'>

                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="old Password"
                            className='hidden w-full sm:w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2'
                            value={verifiesPasswordFromParent}
                        />

                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="New Password"
                            className='w-full sm:w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setConfPassword(e.target.value)
                                setTouched(true)
                            }}
                        />

                        {touched ? (
                            <div className='w-full sm:w-3/4 bg-gray-100 p-4 rounded-md'>
                                <p className='font-semibold mb-2'>Password must have:</p>
                                <ul className='space-y-2'>
                                    <li className={validationItemStyle}>
                                        {eightCharRegex.test(password.trim()) ? checkIcon : crossIcon}
                                        <span className={eightCharRegex.test(password.trim()) ? 'text-green-600' : 'text-red-600'}>At least 8 characters</span>
                                    </li>
                                    <li className={validationItemStyle}>
                                        {atleastOneDigitRegex.test(password.trim()) ? checkIcon : crossIcon}
                                        <span className={atleastOneDigitRegex.test(password.trim()) ? 'text-green-600' : 'text-red-600'}>At least one number</span>
                                    </li>
                                    <li className={validationItemStyle}>
                                        {specialCharRegex.test(password.trim()) ? checkIcon : crossIcon}
                                        <span className={specialCharRegex.test(password.trim()) ? 'text-green-600' : 'text-red-600'}>At least one special character</span>
                                    </li>
                                    <li className={validationItemStyle}>
                                        {oneSimpleAndOneCapitalRegex.test(password.trim()) ? checkIcon : crossIcon}
                                        <span className={oneSimpleAndOneCapitalRegex.test(password.trim()) ? 'text-green-600' : 'text-red-600'}>At least one lowercase and one uppercase letter</span>
                                    </li>
                                </ul>
                            </div>
                        )
                            :
                            (
                                <div></div>
                            )
                        }

                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Comform Password"
                            className='w-full sm:w-3/4 px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            onChange={(e) => {
                                setConfPassword(e.target.value)
                            }}
                        />

                        {!(password === confPassword)
                            ?
                            <p className='text-sm text-red-600'>Passwords are not matching</p>
                            :
                            <p></p>
                        }

                    </div>

                    <div className='flex justify-between px-0 sm:px-14'>

                        {/* <button type="submit" className='bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition duration-300 ease-in-out w-full sm:w-3/4'>
                            Save
                        </button> */}
                        <DialogClose asChild>
                            <button
                                type="button"
                                ref={closeButtonRef}
                                className='bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition duration-300 ease-in-out'>
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
                                            strokeWidth="4">
                                        </circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    Please Wait...
                                </div>
                            ) : (
                                'Submit'
                            )}
                        </button>


                     </div>
                </form>
            </div>
        </div>
    )
}

export default SetNewPasswordCom