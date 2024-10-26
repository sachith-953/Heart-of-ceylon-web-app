import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountSettings from "@/components/adminDashboard/ManageAdminAccounts/ManageAdminAccounts/ManageAdminAccounts"

const ManageAccounts = () => {
    return (
        <div>
            <Tabs defaultValue="account" className="w-full">
                <TabsList className=' ml-1'>
                    <TabsTrigger className="bg-gray-200 hover:bg-gray-400 font-medium text-black" value="account">New admin</TabsTrigger>
                    <TabsTrigger className="bg-gray-200 hover:bg-gray-400 font-medium text-black" value="password">acc. settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account">
                  {/* new admin componet here */}
                   <h1 className='ml-10 bg-red-600'>NOt yet implemented</h1>
                </TabsContent>
                <TabsContent value="password">
                    {/* acc.settings component */}
                    <AccountSettings/>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default ManageAccounts
