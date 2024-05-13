import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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