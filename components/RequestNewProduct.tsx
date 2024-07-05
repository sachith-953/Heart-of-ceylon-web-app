'use client'
import React, { useState } from 'react';

const RequestNewProduct = () => {
  // for form data validation and guid user to input valid data
  const [productName, setProductName] = useState("sample data")
  const [productdescription, setProductdescription] = useState("sample@mail.com")
  const [phoneNo, setPhoneNo] = useState("")
  const [phoneNoTouched, setPhoneNoTouched] = useState(false)

  // Use for show errors 
  const nameRegex = /^[a-zA-Z\s]+$/;
  const productdescriptionRegex = /^.{0,500}$/;
  const numericRegex = /^\d+$/;
  const validationMessageStyle = 'text-sm text-red-600 mt-1 ml-[33.33%]';

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
    <div className='bg-[#f2f2f2] p-4 sm:p-8 md:p-16 lg:p-32'>
      <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center'>Change Account Information</h1>
      <div className='max-w-3xl mx-auto'>
        <form action="#" className='space-y-6'>

          {/* select catogary */}
          {/* <div className='flex flex-col'>
            <div className='flex flex-col sm:flex-row sm:items-center'>
              <label htmlFor="firstname" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>First Name</label>
              <input type="text" id="firstname" name="firstname" className='w-full sm:w-2/3 border-[#ccc] p-3 border rounded' placeholder='Your first name'
                onChange={(data) => { setFirstName(data.target.value) }} />
            </div>
            {!nameRegex.test(firstName.trim()) && firstName.trim() !== '' &&
              <p className={validationMessageStyle}>Name can only have letters</p>
            }
          </div> */}
          <div className='flex flex-col'>
            <div className='flex flex-col sm:flex-row sm:items-center'>
              <label htmlFor="catogary" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Select catogary</label>
              <select name="catogary" id="catogary" className='w-full sm:w-2/3 border-[#ccc] p-3 border rounded'>
                <option value="catogary">Catogary 1</option>
                <option value="catogary">Catogary 2</option>
                <option value="catogary">Catogary 3</option>
                <option value="catogary">Catogary 4</option>
                <option value="catogary">Catogary 5</option>
              </select>
            </div>
          </div>

          {/* product name */}
          <div  >
            <div className='flex flex-col sm:flex-row sm:items-center'>
              <label htmlFor="productname" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Product Name</label>
              <input type="text" id="productname" name="productname" className='w-full sm:w-2/3 border-[#ccc] p-3 border rounded' placeholder='Your last name'
                onChange={(data) => { setProductName(data.target.value) }} required/>
            </div>
            {!nameRegex.test(productName.trim()) && productName.trim() !== '' &&
              <p className={validationMessageStyle}>Product name can only have letters</p>
            }
          </div>

          {/* Description on product */}
          <div className='flex flex-col'>
            <div className='flex flex-col sm:flex-row sm:items-center'>
              <label htmlFor="productdescription" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Description on product</label>
              <textarea id="productdescription" name="productdescription" className='w-full sm:w-2/3 border-[#ccc] p-3 border rounded' placeholder='Write somthing'
                onChange={(data) => { setProductdescription(data.target.value) }} required />
            </div>
            {!productdescriptionRegex.test(productdescription.trim()) && productdescription.trim() !== '' &&
              <p className={validationMessageStyle}>Maximum 500 characters</p>
            }
          </div>

          {/* Required Quantity */}
          <div className='flex flex-col'>
            <div className='flex flex-col sm:flex-row sm:items-center'>
              <label htmlFor="requiredquantity" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Required Quantity</label>
              <div>
              <input type="number" id='requiredquantity' name="requiredquantity" className='w-full sm:w-2/3 border-[#ccc] p-3 border rounded' placeholder='0' min="0" step="1" required/>
              </div>
            </div>
          </div>

          {/* Expected price */}
          <div className='flex flex-col sm:flex-row sm:items-center'>
            <label htmlFor="address" className='text-lg font-semibold mb-2 sm:mb-0 sm:w-1/3'>Expected price</label>
            <div>
              <span className='mr-1'>USD</span>
              <input type="text" id="address" name="shippingaddress" className='w-full sm:w-2/3 border-[#ccc] p-3 border rounded' placeholder='0 $' required/>
            </div>
          </div>

          {/* buttons */}
          <div className='flex justify-end space-x-4'>
            <button type="submit" className='bg-blue-600 px-4 py-2 rounded text-white'>Submit</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default RequestNewProduct
