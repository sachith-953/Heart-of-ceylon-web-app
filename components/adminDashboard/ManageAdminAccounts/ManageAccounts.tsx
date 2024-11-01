import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AccountSettings from "@/components/adminDashboard/ManageAdminAccounts/AdminDetails/AdminDetails"
import AdminDetails from '@/components/adminDashboard/ManageAdminAccounts/AdminDetails/AdminDetails'
import AddNewAdminAccounts from './AdminDetails/AddNewAdminAccounts'

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
                   <AddNewAdminAccounts />
                </TabsContent>
                <TabsContent value="password">
                    {/* acc.settings component */}
                    <AdminDetails />
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default ManageAccounts
