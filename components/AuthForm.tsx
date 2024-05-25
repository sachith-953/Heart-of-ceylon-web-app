'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
    email: z.string().email(),
})

const AuthForm = ({ type }: { type: string }) => {
    const [user, setUser] = useState(null)

    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        setIsLoading(true)
        console.log(values)
        setIsLoading(false)
    }

    return (
        <div className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-8'>
                <Link href='/' className='cursor-pointer items-center gap-1 flex'>
                    <Image
                        src="/icons/logo.svg"
                        width={34}
                        height={34}
                        alt="Heart of Ceylon logo"
                    />
                    <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Heart of Ceylon</h1>
                </Link>
                <div className='flex flex-col gap-1 md:gap-3'>
                    <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>{user
                        ? 'Link Account'
                        : type === 'sign-in'
                            ? 'Sign In'
                            : 'Sign Up'
                    }</h1>
                    <p className='text-16 font-normal text-gray-600'>
                        {user
                            ? 'Link your account to get started'
                            : 'Please enter your details.'}
                    </p>
                </div>
            </header>
            
            {user ? (
                <div className='flex flex-col gap-4'>
                    {/* PlaidLink */}
                </div>
            ) : (
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {type === 'sign-up' && (
                                <>
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name='firstName' label='First Name'
                                            placeholder='Enter your first name' type={''} />

                                        <CustomInput control={form.control} name='lastName' label='Last Name'
                                            placeholder='Enter your lsat name' type={''} />
                                    </div>

                                    <CustomInput control={form.control} name='address1' label='Address'
                                        placeholder='Enter your specific address' type={''} />

                                    {/* City */}
                                    <CustomInput control={form.control} name='city' label='City'
                                        placeholder='Enter your specific city' type={''} />

                                    {/* Phone no */}
                                    <CustomInput control={form.control} name='phoneNumber' label='Phone number'
                                        placeholder='011-1234567' type={''} />

                                    {/* state/province and Postal Code */}
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name='state' label='State/Province'
                                            placeholder='Example: WP' type={''} />

                                        <CustomInput control={form.control} name='postalCode' label='Postal Code'
                                            placeholder='Example: 11101' type={''} />
                                    </div>

                                    {/* DOB and NIC */}
                                    <div className='flex gap-4'>
                                        <CustomInput control={form.control} name='dateOfBirth' label='Date of Birth'
                                            placeholder='YYYY-MM-DD' type={''} />
                                        <CustomInput control={form.control} name='nic' label='NIC'
                                            placeholder='000000000V' type={''} />
                                    </div>

                                </>
                            )}
                            <CustomInput control={form.control} name='email' label='Email' placeholder='Enter your user email' type={''} />
                            <CustomInput control={form.control} name='password' label='Password' placeholder='Enter your user password' type={''} />
                            <div className='flex flex-col gap-4'>
                                <Button type="submit" className='form-btn' disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' /> &nbsp;
                                            Loading ...
                                        </>
                                    ) : type === 'sign-in'
                                        ? 'Sign In' : 'Sign up'}
                                </Button>
                            </div>
                        </form>
                    </Form>

                    <footer className='flex justify-center gap-1'>
                        <p className='text-14 font-normal text-gray-600'>
                            {type === 'sign-in'
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </p>
                        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                            {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                        </Link>
                    </footer>
                </>
            )}
        </div>
    )
}

export default AuthForm
