
import MaxWidthLg from "@/components/MaxWidthLg";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/Navbar";
import AboutProduct from "@/components/ProductProfileTabs/AboutProduct";
import Reviews from "@/components/ProductProfileTabs/Reviews";
import ShippingReturnPayment from "@/components/ProductProfileTabs/ShippingReturnPayment";
import SearchBar from "@/components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <>
      <Navbar />
      <SearchBar />
      {/* Sachith's content */}

      <MaxWidthLg>
        <Tabs defaultValue="account" className="flex flex-col justify-center">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">About this Product</TabsTrigger>
            <TabsTrigger value="shipping">
              Shipping, Return and Payments
            </TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <AboutProduct />
          </TabsContent>

          <TabsContent value="shipping">
            <ShippingReturnPayment />
          </TabsContent>

          <TabsContent value="reviews">
            <Reviews />
          </TabsContent>
        </Tabs>
      </MaxWidthLg>
    </>
  );
}
