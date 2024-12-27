
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Upload, Package, LayoutDashboard } from 'lucide-react';

const StartSelling: React.FC = () => {
  const steps = [
    {
      title: 'Create an Account',
      description: 'Sign up as a seller by providing basic details',
      icon: ShoppingBag,
      link: '/seller/signup' 
    },
    {
      title: 'List Your Products',
      description: 'Upload product images, descriptions, and prices',
      icon: Upload,
      link: '/seller/list-products' 
    },
    {
      title: 'Start Selling',
      description: 'Your products will be visible to millions of customers',
      icon: Package,
      link: '/seller/start-selling' 
    },
    {
      title: 'Manage Orders',
      description: 'Fulfill orders and track shipments through our dashboard',
      icon: LayoutDashboard,
      link: '/seller/manage-orders' 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Start Selling on Our Platform
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Join thousands of sellers and grow your business with us
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <Link href={step.link}>
                  <div className="flex items-start space-x-4 cursor-pointer">
                    <div className="flex-shrink-0">
                      <step.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="mt-2 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">Ready to get started?</p>
          <div className="space-x-4">
            <Link
              href="/seller/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/seller/login"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSelling;