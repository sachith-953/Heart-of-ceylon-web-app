import ManageAccount from "@/components/dashboard/sellerDashboard/ManageAccount";
import MyProducts from "@/components/dashboard/sellerDashboard/MyProducts";
import MySales from "@/components/dashboard/sellerDashboard/MySales";
import MaxWidthLg from "@/components/MaxWidthLg";
import Navbar from "@/components/Navbar";
import { TabsTriggerForSellerDashboard } from "@/components/ui/seller-tabs-trigger";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgeDollarSign, Box, Printer, UserCog, UserPlus, Users } from "lucide-react"


export default function SellerDashbard() {
    return (
        <>

            {/* add new navbar designed for the seller*/}
            <Navbar />
            
            <div className="bg-white w-full h-svh pt-1">
                
                {/* tabs */}
                <Tabs defaultValue="My Products" className="flex flex-row mx-3 h-full ">
                    <TabsList className="w-1/4 h-full flex flex-col bg-[#314659] justify-start">

                        {/* <div className="bg-zinc-400 h-20 w-full mb-2">
                            user account details (if want uncommnet)
                        </div> */}

                        <TabsTriggerForSellerDashboard className="w-full my-1 flex flex-row" value="My Products">
                            <Box />
                            <span className="ml-1">My Products</span>
                        </TabsTriggerForSellerDashboard>

                        <TabsTriggerForSellerDashboard className="w-full my-1 flex flex-row" value="My Sales">
                            <BadgeDollarSign />
                            <span className="ml-1">My Sales</span>
                        </TabsTriggerForSellerDashboard>

                        <TabsTriggerForSellerDashboard className="w-full my-1 flex flex-row" value="Manage Account">
                            <UserCog />
                            <span className="ml-1">Manage Account</span>
                        </TabsTriggerForSellerDashboard>

                    </TabsList>

                    <div className="w-3/4 max-h-lvh overflow-auto overscroll-auto">

                        <TabsContent value="My Products">
                            <MyProducts />
                        </TabsContent>

                        <TabsContent value="My Sales">
                            <MySales />
                        </TabsContent>

                        <TabsContent value="Manage Account">
                            <ManageAccount />
                        </TabsContent>

                    </div>

                </Tabs>

            </div>

        </>
    );
}


