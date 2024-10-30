import SellerManagementsTabs from "@/components/adminDashboard/sellerManagement/SellerManagementsTabs";
import ManageAdminAccounts from "@/components/adminDashboard/ManageAdminAccounts/ManageAccounts"
import Navbar from "@/components/Navbar";
import { TabsTriggerForSellerDashboard } from "@/components/ui/seller-tabs-trigger";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgeDollarSign, Box, Printer, ShoppingBasket, Text, UserCog, UserPlus, UserRound, Users } from "lucide-react"
import AllOrders from "@/components/adminDashboard/AllOrders/AllOrders";
import ProductManagement from "@/components/adminDashboard/ProductManagement/ProductManagement"



export default function SellerDashbard() {
    return (
        <>

            {/* add new navbar designed for the seller*/}
            <Navbar />

            <div className="bg-white w-full h-svh pt-1">

                {/* tabs */}
                <Tabs defaultValue="All Orders" className="flex flex-row mx-3 h-full ">
                    <TabsList className="w-1/4 h-full flex flex-col bg-[#314659] justify-start">

                        {/* <div className="bg-zinc-400 h-20 w-full mb-2">
                            user account details (if want uncommnet)
                        </div> */}

                        <TabsTriggerForSellerDashboard className="w-full my-1 flex flex-row" value="Seller Management">
                            <UserRound />
                            <span className="ml-1">Seller Management</span>
                        </TabsTriggerForSellerDashboard>

                        <TabsTriggerForSellerDashboard className="w-full my-1 flex flex-row" value="All Orders">
                            <Box />
                            <span className="ml-1">All Orders</span>
                        </TabsTriggerForSellerDashboard>

                        <TabsTriggerForSellerDashboard className="w-full my-1 flex flex-row" value="Product Management">
                            <ShoppingBasket />
                            <span className="ml-1">Product Management</span>
                        </TabsTriggerForSellerDashboard>

                        <TabsTriggerForSellerDashboard className="w-full my-1 flex flex-row" value="Logs">
                            <Text />
                            <span className="ml-1">Logs</span>
                        </TabsTriggerForSellerDashboard>

                        <TabsTriggerForSellerDashboard className="w-full my-1 flex flex-row" value="Manage Admin Accounts">
                            <UserCog />
                            <span className="ml-1">Manage Admin Accounts</span>
                        </TabsTriggerForSellerDashboard>

                    </TabsList>

                    <div className="w-3/4 max-h-lvh overflow-auto overscroll-auto">

                        <TabsContent value="Seller Management">
                            {/* <SellerManagementsTabs /> */}
                        </TabsContent>

                        <TabsContent value="All Orders">
                            {/* All Orders component here */}
                            {/* DEV : madushan */}
                            <AllOrders/>
                        </TabsContent>

                        <TabsContent value="Product Management">
                            {/*Product Management component here */}
                             {/* DEV : madushan */}
                            {/* <ProductManagement/> */}
                        </TabsContent>

                        <TabsContent value="Logs">
                            {/*Logs component here */}
                        </TabsContent>

                        <TabsContent value="Manage Admin Accounts">
                            {/*Manage Admin Accounts component here */}
                            {/* DEV -madushan */}
                            {/* <ManageAdminAccounts/> */}
                        </TabsContent>

                    </div>

                </Tabs>

            </div>

        </>
    );
}