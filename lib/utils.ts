import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price : number | string,
  options : {
    currency? : "USD" | "EUR" | "GBP" | "BDT",
    notation? : Intl.NumberFormatOptions["notation"]
  } = {}
){
  // set default values
   const {currency = "USD" , notation = "compact"} = options

   // if price is string type, then parse it, else assign price to variable
   const numericPrice = typeof price === "string" ? parseFloat(price) : price

  return new Intl.NumberFormat("en-US", {
    style : "currency",
    currency,
    notation,
    maximumFractionDigits : 2,
  }).format(numericPrice)

}

export const authFormSchema = (type: string) => z.object({
  // sign-up
  firstName:type === 'sign-in'? z.string().optional(): z.string().min(3),
  lastName:type === 'sign-in'? z.string().optional(): z.string().min(3),
  address1:type === 'sign-in'? z.string().optional(): z.string().max(50),
  state:type === 'sign-in'? z.string().optional(): z.string().min(2).max(2),
  postalCode:type === 'sign-in'? z.string().optional(): z.string().min(3).max(6),
  dateOfBirth:type === 'sign-in'? z.string().optional(): z.string().min(3),
  nic:type === 'sign-in'? z.string().optional(): z.string().min(10),
  phoneNumber:type === 'sign-in'? z.string().optional(): z.string().min(10).max(15), // phone number
  city:type === 'sign-in'? z.string().optional(): z.string().max(50), // city max char 15
  // sign-in
  email:type === 'sign-out'? z.string().optional(): z.string().email(),
  password:type === 'sign-out'? z.string().optional(): z.string().min(8),
})