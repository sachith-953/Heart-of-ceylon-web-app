import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminDetails from "@/components/adminDashboard/AllOrders/Orders/AllOrderDetails"
import RequestedOrders from "@/components/adminDashboard/AllOrders/RequestedOrders/RequestedOrders"
import AllOrderDetails from '@/components/adminDashboard/AllOrders/Orders/AllOrderDetails'

const AllOrders = () => {
    return (
        <div>
            <Tabs defaultValue="account" className="w-full">
                <TabsList className=' ml-1'>
                    <TabsTrigger className="bg-gray-200 hover:bg-gray-400 font-medium text-black" value="account">orders</TabsTrigger>
                    <TabsTrigger className="bg-gray-200 hover:bg-gray-400 font-medium text-black" value="password">requested orders</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  {/* all orders componet here */}
                    <AllOrderDetails />
                </TabsContent>
                <TabsContent value="password">
                    {/* requested orders component */}
                    <RequestedOrders/>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default AllOrders
