"use client"

import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupSachith() {

  const router = useRouter()

  const [serverError, setServerError] = useState("")
  const [success, setSuccess] = useState("")

  // for form submit tracking 
  const [isSub, setIsSub] = useState(false);

  // for form data validation and guid user to input valid data
  const [firstName, setFirstName] = useState("sample data")
  const [lastName, setLastName] = useState("sample data")
  const [email, setEmail] = useState("sample@mail.com")
  const [password, setPassword] = useState("testData!12#")
  const [confPassword, setConfPassword] = useState("testData!12#")
  const [phoneNo, setPhoneNo] = useState("12345")



  //*************REGEX*************
  // Use for show errors 
  const nameRegex = /^[a-zA-Z\s]+$/; // Regular expression pattern for names (only letters and spaces allowed)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const atleastOneDigitRegex = /^(?=.*\d)/;  // password should contain atleas one digit 
  const specialCharRegex = /^(?=.*?[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]+$/;
  const oneSimpleAndOneCapitalRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]+$/; // password should contain atleas one simple and capital letters
  const eightCharRegex = /^.{8,}$/;
  const numericRegex = /^[0-9]+$/;


  const buttonIsClicked = async () => {
    // Set isSubmitting to true when the form is being submitted
    setIsSub(true)
    console.log("submitting :" + isSub)
  }

  const handleFormSubmit = async (formData: FormData) => {

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_URL;
      const res = await fetch(`${BASE_URL}/api/signup/seller`, {
        method: 'POST',
        body: formData
      })

      const ResponseData = await res.json()
      console.log(ResponseData)
      console.log(ResponseData.message)

      if (ResponseData.success === true) {
        router.push('/sign-up/email-verification-message')
      }
      else {
        // if not success, show the error message
        setSuccess(ResponseData.success)
        setServerError(ResponseData.message)
      }
    }
    catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      // Set isSubmitting back to false after form submission
      setIsSub(false);
      console.log("finally block line:50")
    }




  }

  return (
    <>

      <Navbar />

      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign-Up to your Seller Account
          </h2>
          <p className='text-center mt-3 text-red-600'>
            {/* {!success && serverError} */}
            {!serverError}
          </p>
          <p className='text-center mt-3 text-green-600'>
            {/* {!success && serverError} */}
            {!success}
          </p>

        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <form className="space-y-3" action={handleFormSubmit} onSubmit={buttonIsClicked}>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                  Store Name
                </label>
                <span className="text-xs text-amber-600 font-medium">
                  Cannot be changed later
                </span>
              </div>
              <div className="mt-1">
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  autoComplete="given-name"
                  required
                  placeholder="Pepper Store"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(data) => { setFirstName(data.target.value) }}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Choose carefully - this will be your permanent store identity
                </p>
                {!nameRegex.test(firstName.trim())
                  ?
                  <p className='text-sm text-red-600'>Name can only have Letters</p>
                  :
                  <p></p>
                }
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email Address
              </label>
              <div className="">
                <input
                  id="sellerEmail"
                  name="sellerEmail"
                  type="sellerEmail"
                  autoComplete="email"
                  required
                  placeholder="example@gmail.com"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(data) => { setEmail(data.target.value) }}
                />
                {!emailRegex.test(email.trim())
                  ?
                  <p className='text-sm text-red-600'>Plese Enter a valid Email</p>
                  :
                  <p></p>
                }
              </div>
            </div>

            <div>
              <label htmlFor="sellerPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="">
                <input
                  id="sellerPassword"
                  name="sellerPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(data) => { setPassword(data.target.value); setConfPassword(data.target.value) }}
                />
                {(!eightCharRegex.test(password.trim()))
                  ?
                  <p className='text-sm text-red-600'>Password must contain at least 8 Characters</p>
                  :
                  <p></p>
                }
                {(!atleastOneDigitRegex.test(password.trim())) || (!specialCharRegex.test(password.trim())) || !oneSimpleAndOneCapitalRegex.test(password.trim())
                  ?
                  <p className='text-sm text-red-600'>Please add at least:</p>
                  :
                  <p></p>
                }
                {!atleastOneDigitRegex.test(password.trim())
                  ?
                  <p className='text-sm text-red-600 ml-2'>One Number</p>
                  :
                  <p></p>
                }
                {!specialCharRegex.test(password.trim())
                  ?
                  <p className='text-sm text-red-600 ml-2'>One Special character</p>
                  :
                  <p></p>
                }
                {!oneSimpleAndOneCapitalRegex.test(password.trim())
                  ?
                  <p className='text-sm text-red-600 ml-2'>One Simple Letter and One Capital Letter</p>
                  :
                  <p></p>
                }
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
              </label>
              <div className="">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(data) => { setConfPassword(data.target.value) }}
                />
                {!(password === confPassword)
                  ?
                  <p className='text-sm text-red-600'>Passwords are not matching</p>
                  :
                  <p></p>
                }
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSub}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>
      </div>
    </>
  );
}

