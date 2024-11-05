import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FindASellerCmp from './findASeller/FindASellerCmp'
import SellerVerificationCmp from './sellerVerification/SellerVerificationCmp'

const SellerManagementsTabs = () => {
    return (
        <div className='w-full'>
            <Tabs defaultValue="account" className="w-full">
                <TabsList>
                    <TabsTrigger value="account">Find a Seller</TabsTrigger>
                    <TabsTrigger value="password">Seller Verification</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                    <FindASellerCmp />
                </TabsContent>
                <TabsContent value="password">
                    <SellerVerificationCmp />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default SellerManagementsTabs
