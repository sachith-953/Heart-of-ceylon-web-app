"use client"

import { ShoppingCart } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { Separator } from "./ui/separator"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

const Cart = () => {

    const itemCount = 1

    const fee = 8

    return (
        <Sheet >
            <SheetTrigger className="group -m-0 flex items-center p-2">
                <ShoppingCart
                    className="h6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                ></ShoppingCart>
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {/* amount of item */}
                    0
                </span>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-md">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle className="flex justify-center">Cart (0)</SheetTitle>
                    {/* <SheetDescription>
                        Make changes to your profile here. Click save whdone.
                    </SheetDescription> */}
                </SheetHeader>

                {/* if cart is not empty show details */}
                {/* if cart is empty : show image*/}
                {itemCount > 0 ? (
                    <>
                        <div className="flex w-full flex-col pr-6">
                            {/* TODO : cart logic */}
                            cart items
                        </div>
                        <div className="space-y-4 pr-6">
                            <Separator />
                            <div className="space-y-1.5 text-sm">
                                <div className="flex">
                                    <span className="flex-1">Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">Transaction Fee</span>
                                    <span>{formatPrice(fee)}</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">Total</span>
                                    <span>{formatPrice(fee)}</span>
                                </div>
                            </div>

                            <SheetFooter>
                                {/* without this asChild we cannot override styles */}
                                <SheetTrigger asChild>
                                    <Link href="/Buyer-cart" className={buttonVariants({
                                        className: "w-full",
                                    })}>
                                        Continue To Checkout
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>

                        </div>
                    </>

                ) : (

                    // what happen if nothing is in the cart
                    <div className="flex h-full flex-col items-center justify-center space-y-1" aria-hidden="true">
                        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                            <Image src="/hippo-empty-cart.png" alt="Empty shopping cart hippo" fill />
                        </div>
                        <div className="text-xl font-semibold">Your Cart is Empty</div>
                        <SheetTrigger asChild>
                            <Link href="/products" className={buttonVariants({
                                variant: "link",
                                size: "sm",
                                className: "text-sm text-muted-foreground"
                            })}>
                                Add Items to Your Cart To Checkout
                            </Link>
                        </SheetTrigger> 
                    </div>
                )}

            </SheetContent>
        </Sheet>
    )
}

export default Cart