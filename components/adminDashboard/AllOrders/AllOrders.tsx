import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminDetails from "@/components/adminDashboard/AllOrders/Orders/Orders"
import RequestedOrders from "@/components/adminDashboard/AllOrders/RequestedOrders/RequestedOrders"

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
                    <AdminDetails/>
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
