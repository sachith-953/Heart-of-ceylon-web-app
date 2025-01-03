import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PopularCategories from "@/components/Popular-categories";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import TopSellingProducts from "@/components/TopSellingProducts";
import Navbar from "@/components/Navbar";
import { ArrowRight, ShoppingBag, Shield, Truck } from 'lucide-react';


const CustomerService = dynamic(() => import('@/components/CustomerService'), { ssr: false });

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
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <Head>
        <title>Heart of Ceylon | Authentic Sri Lankan Products</title>
        <meta name="description" content="Discover authentic Sri Lankan products with Heart of Ceylon. 100% genuine and high-quality items curated for you." />
      </Head>

      <Navbar />
      <MaxWidthWrapper>
        {/* Hero Section */}
        <section className="py-20 mx-auto text-center flex flex-col items-center">
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
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 my-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {React.createElement(feature.icon, { className: "h-12 w-12 text-blue-600 mb-4" })}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* Popular Categories */}
        <section className="my-20">
          <PopularCategories />
        </section>

        {/* Top Selling Products */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-center mb-12">Best Sellers</h2>
          <TopSellingProducts />
        </section>
      </MaxWidthWrapper>

      {/* Customer Service Section */}
      <section className="bg-blue-50 py-20">
        <MaxWidthWrapper>
          <CustomerService />
        </MaxWidthWrapper>
      </section>

      <Footer />
    </div>
  );
}
