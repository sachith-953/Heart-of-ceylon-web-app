import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const ReturnExchangePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Navbar />

      <MaxWidthWrapper>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Return and Exchange Policy</h1>
            <p className="text-xl text-gray-600">We are committed to ensuring your satisfaction with our products. Please review our policy below.</p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Returns</h2>
            <p className="text-gray-600 mb-6">
              If you are not satisfied with your purchase, you can return the item within 30 days of receiving it. The item must be unused and in its original packaging.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
            <p className="text-gray-600 mb-6">
              We accept exchanges within 30 days of purchase. Please ensure the item is in its original condition. Contact our support team to initiate an exchange.
            </p>
            <h2 className="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
            <p className="text-gray-600 mb-6">
              Some items such as perishable goods, custom products, and gift cards are non-returnable. Please contact us if you have questions about specific items.
            </p>
            <h2 className="text-2xl font-semibold mb-4">How to Initiate a Return or Exchange</h2>
            <p className="text-gray-600 mb-6">
              To start a return or exchange, please contact our support team with your order number and details. We will guide you through the process.
            </p>
          </section>
        </div>
      </MaxWidthWrapper>

      <Footer />
    </div>
  );
};

export default ReturnExchangePolicy;