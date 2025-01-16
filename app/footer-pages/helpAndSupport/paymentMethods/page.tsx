
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const PaymentMethods: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Navbar />

      <MaxWidthWrapper>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Methods</h1>
            <p className="text-xl text-gray-600">Choose the best payment method for your convenience.</p>
          </div>

          <section className="mb-12">
            <Card className="p-6 mb-6">
              <CardContent className="flex flex-col items-center">
                <Image 
                  src="/stripe-logo.png" 
                  alt="Stripe Logo" 
                  width={150} 
                  height={50} 
                  className="mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">Stripe</h3>
                <p className="text-gray-600 mb-4 text-center max-w-lg">
                  Stripe is a global payment gateway known for its security, speed, and reliability. It uses end-to-end encryption, PCI compliance, and fraud detection to ensure secure transactions.
                  International customers can use Stripe to pay seamlessly.
                </p>
                <Link href="https://stripe.com/" legacyBehavior>
                  <a target="_blank" className="text-blue-600 hover:underline">Learn more about Stripe</a>
                </Link>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="flex flex-col items-center">
                <Image 
                  src="/payhere-logo.png" 
                  alt="PayHere Logo" 
                  width={150} 
                  height={50} 
                  className="mb-4"
                />
                <h3 className="text-2xl font-semibold mb-2">PayHere</h3>
                <p className="text-gray-600 mb-4 text-center max-w-lg">
                  PayHere is a trusted Sri Lankan payment gateway, offering secure local payment solutions. It supports bank transfers, credit/debit cards, and mobile payments, providing a secure and easy checkout for local customers.
                </p>
                <Link href="https://www.payhere.lk/" legacyBehavior>
                  <a target="_blank" className="text-blue-600 hover:underline">Learn more about PayHere</a>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>
      </MaxWidthWrapper>

      <Footer />
    </div>
  );
};

export default PaymentMethods;
