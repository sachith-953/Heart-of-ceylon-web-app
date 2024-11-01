import MaxWidthLg from "@/components/MaxWidthLg";
import Navbar from "@/components/Navbar";
import AboutProduct from "@/components/ProductProfileTabs/AboutProduct";
import Reviews from "@/components/ProductProfileTabs/Reviews";
import ShippingReturnPayment from "@/components/ProductProfileTabs/ShippingReturnPayment";
import SearchBar from "@/components/SearchBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";
import ProductDetails from "@/components/productProfileDetails/ProductDetails";

export default function Page() {
  return (
    <>
      <Navbar />
      <SearchBar />

      <MaxWidthLg>
        {/* Sachith's content */}
        <ProductDetails />
        <div className="my-8">
          <Tabs defaultValue="about" className="flex flex-col justify-center">
            <TabsList className="flex flex-col sm:flex-row w-full mt-4 sm:mt-0 mb-10 sm:mb-2">
              <TabsTrigger className="basis-1/3 my-2" value="about">About this Product</TabsTrigger>
              <TabsTrigger className="basis-1/3 my-2" value="shipping">
                Shipping, Return and Payments
              </TabsTrigger>
              <TabsTrigger className="basis-1/3 my-2" value="reviews">Reviews</TabsTrigger>
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
        </div>
      </MaxWidthLg>
      <Footer />
    </>
  );
}
