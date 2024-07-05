'use client'
import React, { useState } from 'react'

const ChangePassword1Compo = () => {

    // Rgex
    const eightCharRegex = /^.{8,}$/;
    const atleastOneDigitRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*?[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?])[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]+$/;
    const oneSimpleAndOneCapitalRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]+$/;

    const [password, setPassword] = useState("")
    const [touched, setTouched] = useState(false)
    

    const validationItemStyle = 'flex items-center space-x-2 text-sm';
    const checkIcon = <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>;
    const crossIcon = <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;

    return (
        <div className='bg-[#f2f2f2] min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-16'>
            <div className='bg-white rounded-lg shadow-md p-6 sm:p-8 w-full max-w-sm'>
                <h1 className='text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800'>Enter your current password</h1>
                <form action="#" className='space-y-4'>
                    <div className='flex flex-col items-center'>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Enter current password"
                            className='w-full sm:w-3/4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                            onChange={(e) => { 
                                setPassword(e.target.value)
                                setTouched(true)
                            }}
                        />

                        {touched && (
                            <div className='mt-4 w-full sm:w-3/4 bg-gray-100 p-4 rounded-md'>
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
                        )}
                    </div>
                    <div className='flex justify-between items-center pt-4'>
                        <button type="button" className='bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 transition duration-300 ease-in-out'>Cancel</button>
                        <button type="submit" className='bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition duration-300 ease-in-out'>Done</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword1Compo