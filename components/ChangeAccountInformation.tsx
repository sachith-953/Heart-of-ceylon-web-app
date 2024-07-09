'use client'
import React, { useState } from 'react';
import MaxWidthLg from './MaxWidthLg';
import { DialogClose } from '@radix-ui/react-dialog';

/**
 * This is use as a dialog box
 */

const ChangeAccountInformation = () => {

  // for form data validation and guid user to input valid data
  const [firstName, setFirstName] = useState("sample data")
  const [lastName, setLastName] = useState("sample data")
  const [email, setEmail] = useState("sample@mail.com")
  const [phoneNo, setPhoneNo] = useState("")
  const [phoneNoTouched, setPhoneNoTouched] = useState(false)

  // Use for show errors 
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numericRegex = /^\d+$/;
  const validationMessageStyle = 'text-sm text-red-600 mt-1 ml-3';

  // Function to check phone number validity
  const checkPhoneValidity = (phone: string) => {
    if (!numericRegex.test(phone)) {
      return "Please enter only numbers";
    }
    if (phone.length !== 10) {
      return "Please enter a valid 10-digit phone number";
    }
    return "";
  }


  return (
    <MaxWidthLg>
      <div className='bg-white'>
        <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center'>Change Account Information</h1>
        <div className='max-w-3xl mx-auto'>
          <form action="#" className='space-y-6'>

            {/* First Name */}
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <label htmlFor="firstname" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>First Name</label>
                <input type="text" id="firstname" name="firstname" className='w-full border-[#ccc] p-3 border rounded' placeholder='Your first name'
                  onChange={(data) => { setFirstName(data.target.value) }} required />
              </div>
              {!nameRegex.test(firstName.trim()) && firstName.trim() !== '' &&
                <p className={validationMessageStyle}>Name can only have letters</p>
              }
            </div>

            {/* Last Name */}
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <label htmlFor="lastName" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Last Name</label>
                <input type="text" id="lastName" name="lastName" className='w-full border-[#ccc] p-3 border rounded' placeholder='Your last name'
                  onChange={(data) => { setLastName(data.target.value) }} required />
              </div>
              {!nameRegex.test(lastName.trim()) && lastName.trim() !== '' &&
                <p className={validationMessageStyle}>Name can only have letters</p>
              }
            </div>

            {/* Email */}
            {/* <div className='flex flex-col'>
              <div className='flex flex-col'>
                <label htmlFor="email" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Email</label>
                <input type="email" id="email" name="email" className='w-full border-[#ccc] p-3 border rounded' placeholder='email'
                  onChange={(data) => { setEmail(data.target.value) }} required />
              </div>
              {!emailRegex.test(email.trim()) && email.trim() !== '' &&
                <p className={validationMessageStyle}>Please enter a valid email</p>
              }
            </div> */}

            {/* Phone number */}
            <div className='flex flex-col'>
              <div className='flex flex-col'>
                <label htmlFor="phoneNo" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Contact Number</label>
                <input type="text" id='phoneNo' name="phoneNo" className='w-full border-[#ccc] p-3 border rounded' placeholder='contact number'
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                    setPhoneNoTouched(true);
                  }}
                  onBlur={() => setPhoneNoTouched(true)} required />
              </div>
              {phoneNoTouched && phoneNo.trim() !== '' && checkPhoneValidity(phoneNo.trim()) &&
                <p className={validationMessageStyle}>{checkPhoneValidity(phoneNo.trim())}</p>
              }
            </div>

            {/* Shipping Address */}
            <div className='flex flex-col'>
              <label htmlFor="shippingAddress" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Shipping Address</label>
              <input type="text" id="shippingAddress" name="shippingAddress" className='w-full border-[#ccc] p-3 border rounded' placeholder='shipping address' required />
            </div>

            {/* buttons */}
            <div className='flex justify-end space-x-4'>
              <DialogClose asChild>
                <button type="button" className='bg-red-600 px-4 py-2 rounded text-white'>Cancel</button>
              </DialogClose>

              <button type="submit" className='bg-blue-600 px-4 py-2 rounded text-white'>Save</button>
            </div>

          </form>
        </div>
      </div>
    </MaxWidthLg>

  )
}

export default ChangeAccountInformation;

