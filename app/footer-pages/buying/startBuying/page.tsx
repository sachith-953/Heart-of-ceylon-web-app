import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ArrowRight, ShoppingBag, Upload, Package, LayoutDashboard } from 'lucide-react';

const StartBuying: React.FC = () => {
  const steps = [
    {
      title: 'Create an Account',
      description: 'Sign up and start shopping',
      icon: ShoppingBag,
      link: '/buyer/signup' 
    },
    {
      title: 'Browse Products',
      description: 'Discover a variety of products',
      icon: Package,
      link: '/buyer/products' 
    },
    {
      title: 'Place Orders',
      description: 'Add products to cart and checkout',
      icon: Upload,
      link: '/buyer/cart' 
    },
    {
      title: 'Track Orders',
      description: 'Manage and track your purchases',
      icon: LayoutDashboard,
      link: '/buyer/orders' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">

        <Navbar />

        <MaxWidthWrapper>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Start Buying on Our Platform
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Join thousands of buyers and discover amazing products
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Link key={index} href={step.link} className="block">
                  <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {index + 1}. {step.title}
                        </h3>
                        <p className="mt-2 text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">Ready to get started?</p>
          <div className="space-x-4">
            <Link
              href="/buyer/signup"
              aria-label="Create an account to start buying"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus-visible:ring-2"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/buyer/login"
              aria-label="Sign in to your buyer account"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus-visible:ring-2"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      </MaxWidthWrapper>

      <Footer />
    </div>
  );
};

export default StartBuying;
