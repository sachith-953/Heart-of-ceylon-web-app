import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Product from "@/components/adminDashboard/ProductManagement/AdminTopSellingProductDetails/AdminTopSellingProductDetails"
import VerifyProduct from "@/components/adminDashboard/ProductManagement/ToBeVerifyProducts/ToBeVerifyProducts"

const ProductManagement = () => {
    return (
        <div>
            <Tabs defaultValue="account" className="w-full">
                <TabsList className=' ml-1'>
                    <TabsTrigger className="bg-gray-200 hover:bg-gray-400 font-medium text-black" value="account">products</TabsTrigger>
                    <TabsTrigger className="bg-gray-200 hover:bg-gray-400 font-medium text-black" value="password">varify products</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  {/* products componet here */}
                    <Product/>
                </TabsContent>
                <TabsContent value="password">
                    {/* verify products component */}
                    <VerifyProduct/>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default ProductManagement
