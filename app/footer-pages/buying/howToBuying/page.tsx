import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, ShoppingCart, PackageSearch, CreditCard, PackageCheck, Headphones, LucideIcon } from 'lucide-react';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon: Icon, title, description }) => (
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

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const HowToBuy: React.FC = () => {
  const steps: Step[] = [
    {
      icon: ShoppingCart,
      title: "Browse and Select Products",
      description: "Explore a wide range of products and add your favorites to the cart for checkout."
    },
    {
      icon: PackageSearch,
      title: "Review and Confirm Order",
      description: "Double-check your selections, apply promo codes, and proceed to confirm your purchase."
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Choose from various secure payment options and complete your transaction safely."
    },
    {
      icon: PackageCheck,
      title: "Track Your Order",
      description: "Monitor the status of your order in real-time and stay updated on delivery times."
    },
    {
      icon: Headphones,
      title: "Receive Support",
      description: "Reach out to customer service for any inquiries or assistance post-purchase."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <MaxWidthWrapper>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Learn How to Buy on Our Platform
            </h1>
            <p className="text-xl text-gray-600">
              Follow these simple steps to enjoy a smooth shopping experience
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <StepCard key={index} {...step} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl mb-6">Ready to start shopping?</p>
            <Link href="/buyer/signup">
              <div 
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Start Shopping Now
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

export default HowToBuy;