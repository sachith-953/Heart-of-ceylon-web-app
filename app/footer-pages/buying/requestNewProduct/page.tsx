import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, ShoppingCart, UserPlus, LogIn } from 'lucide-react';

const RequestCard = ({ title, description }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const RequestProduct: React.FC = () => {
  const requestDetails = [
    {
      title: "Product Name",
      description: "Provide the name of the product you are looking for."
    },
    {
      title: "Category",
      description: "Mention the category this product belongs to."
    },
    {
      title: "Preferred Price Range",
      description: "Enter the price range that fits your budget."
    },
    {
      title: "Additional Details",
      description: "Add any specific features or requirements you are looking for in this product."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />

        <MaxWidthWrapper>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Request a Product
          </h1>
          <p className="text-xl text-gray-600">
            Can't find what you're looking for? Let us know!
          </p>
        </div>

        <div className="space-y-6">
          {requestDetails.map((detail, index) => (
            <RequestCard key={index} {...detail} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xl mb-6">Submit your request by logging in or signing up.</p>
          <div className="space-x-4">
            <Link href="/buyer/signup">
              <div 
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign Up
                <UserPlus className="ml-2" size={20} />
              </div>
            </Link>
            <Link href="/buyer/login">
              <div 
                className="inline-flex items-center px-8 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Log In
                <LogIn className="ml-2" size={20} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      </MaxWidthWrapper>

      <Footer />
    </div>
  );
};

export default RequestProduct;
