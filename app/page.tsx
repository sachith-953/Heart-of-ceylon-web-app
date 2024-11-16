import React from 'react';
import CustomerService from "@/components/CustomerService";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PopularCategories from "@/components/Popular-categories";
import SearchBar from "@/components/SearchBar";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import TopSellingProducts from "@/components/TopSellingProducts";
import Navbar from "@/components/Navbar";
import { ArrowRight, ShoppingBag, Shield, Truck } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog';
import { DialogHeader } from '@/components/ui/dialog';

export default function Home() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Authentic Products",
      description: "100% genuine Sri Lankan products"
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Verified by our expert team"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Worldwide shipping available"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <MaxWidthWrapper>
        {/* Hero Section */}
        <div className="py-20 mx-auto text-center flex flex-col items-center">
        <SearchBar />
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
          Seal the Deal with Authentic Made in Ceylon Products – Heart of Ceylon at Its Finest!
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Discover Authentic
            <br />
            <span className="text-blue-600 bg-clip-text">Sri Lankan Treasures</span>
          </h1>

          <p className="mt-6 text-lg max-w-2xl text-gray-600">
            Welcome to Heart Of Ceylon - Your premier destination for authentic Sri Lankan products. 
            Each item is carefully curated and verified for exceptional quality.
          </p>

          {/* Search Bar with enhanced styling */}
          <div className="w-full max-w-2xl mt-8 mb-12">
           
        </div>

        {/* Dialog Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {/* Product Stories Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Authentic Products Stories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-4">Product Stories</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Discover the rich heritage behind our carefully curated collection of Sri Lankan products. 
                    Each item tells a unique story of craftsmanship, tradition, and cultural significance.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Our Selection Process</h3>
                    <p className="text-gray-600">
                      Every product in our collection goes through a rigorous authentication process, 
                      ensuring we bring you only the finest genuine Sri Lankan craftsmanship.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Artisan Partnerships</h4>
                      <p className="text-sm text-gray-600">
                        We work directly with local artisans to bring their unique creations to the global market.
                      </p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Quality Guarantee</h4>
                      <p className="text-sm text-gray-600">
                        Each product meets our strict quality standards before reaching your doorstep.
                      </p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
              {/* Our Story Dialog */}
              <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                  Our Story - Heart of Ceylon
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold mb-4">Our Story - Heart of Ceylon</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Heart of Ceylon was born from a passion to share the authentic treasures of Sri Lanka 
                    with the world. Our journey began with a simple mission: to create a bridge between 
                    traditional Sri Lankan craftsmanship and global appreciation.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      To preserve and promote Sri Lankan heritage while empowering local artisans 
                      and creating sustainable economic opportunities.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Our Values</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>Authenticity</li>
                        <li>Quality</li>
                        <li>Sustainability</li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Our Impact</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li>Supporting local communities</li>
                        <li>Preserving traditions</li>
                        <li>Global recognition</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 my-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Popular Categories with enhanced styling */}
        <div className="my-20">
          <PopularCategories />
        </div>

        {/* Top Selling Products */}
        <div className="my-20">
          <h2 className="text-3xl font-bold text-center mb-12">Best Sellers</h2>
          <TopSellingProducts />
        </div>
      </MaxWidthWrapper>

      {/* Customer Service with enhanced styling */}
      <div className="bg-blue-50 py-20">
        <MaxWidthWrapper>
          <CustomerService />
        </MaxWidthWrapper>
      </div>

      <Footer />
    </div>
  );
}
