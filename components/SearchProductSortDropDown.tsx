"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// UI library 
// https://ui.shadcn.com/docs/components/dropdown-menu

type Checked = DropdownMenuCheckboxItemProps["checked"]

interface DropDownPropsType {
    onChildDataChange: (newChildData: string) => void;
  }

const SearchProductSortDropDown : React.FC<DropDownPropsType> = ({onChildDataChange,}) => {

    const [showTopSelling, setTopSelling] = React.useState<Checked>(false)
    const [showRatings, setShowRatings] = React.useState<Checked>(false)
    const [showPrice, setShowPrice] = React.useState<Checked>(false)

    const [selectedMethod, setSelectedMethod] = React.useState("Select Sort Method")

    const handleCheckBoxes = (checked: boolean, item: string) => {
        if (item === "Top Selling") {
            setTopSelling(checked)
            setShowRatings(false)
            setShowPrice(false)
            setSelectedMethod("Top Selling")
            onChildDataChange("Top Selling")
        } 
        else if (item === "Ratings") {
            setShowRatings(checked)
            setTopSelling(false)
            setShowPrice(false)
            setSelectedMethod("Ratings")
            onChildDataChange("Ratings")
        } 
        else if (item === "Price") {
            setShowPrice(checked)
            setTopSelling(false)
            setShowRatings(false)
            setSelectedMethod("Price")
            onChildDataChange("Price")
        }
    }

    return (
        <DropdownMenu>
            {/* button */}
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-40 hover:font-bold ">{selectedMethod}</Button>
            </DropdownMenuTrigger>

            {/* drop down menu items */}
            <DropdownMenuContent className="w-40">
                {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel> */}
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                    checked={showTopSelling}
                    // onCheckedChange return a boolean variable
                    onCheckedChange={(checked) => handleCheckBoxes(checked, "Top Selling")}
                >
                    Top Selling
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showRatings}
                    onCheckedChange={(checked) => handleCheckBoxes(checked, "Ratings")}
                >
                    Ratings
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                    checked={showPrice}
                    onCheckedChange={(checked) => handleCheckBoxes(checked, "Price")}
                >
                    Price
                </DropdownMenuCheckboxItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )

}

export default SearchProductSortDropDown;