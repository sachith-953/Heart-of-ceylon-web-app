
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ChevronRight, Store, Image, Search, Package, MessageSquare } from 'lucide-react';

const StepCard = ({ icon: Icon, title, description }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow">
    <CardContent className="flex items-start p-6">
      <div className="mr-4">
        <Icon size={24} className="text-blue-500" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const LearnToSell: React.FC = () => {
  const steps = [
    {
      icon: Store,
      title: "Create Your Seller Account",
      description: "Start your journey by setting up your professional seller profile with business details and payment information."
    },
    {
      icon: Image,
      title: "List Your Products",
      description: "Upload high-quality images, write compelling descriptions, and set competitive prices to attract customers."
    },
    {
      icon: Search,
      title: "Optimize Your Listings",
      description: "Boost visibility with strategic keywords, seasonal promotions, and targeted advertising campaigns."
    },
    {
      icon: Package,
      title: "Manage Orders Efficiently",
      description: "Track orders, maintain inventory, and ensure quick shipping to keep customers satisfied."
    },
    {
      icon: MessageSquare,
      title: "Deliver Outstanding Service",
      description: "Build your reputation through prompt customer support and maintaining excellent seller ratings."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <MaxWidthWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn How to Sell on Our Platform
          </h1>
          <p className="text-xl text-gray-600">
            Follow these proven steps to launch your successful online business
          </p>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xl mb-6">Ready to start your seller journey?</p>
          <Link href="/seller/signup">
            <div className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
              Start Selling Today
              <ChevronRight className="ml-2" size={20} />
            </div>
          </Link>
        </div>
      </div>
       </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default LearnToSell;

