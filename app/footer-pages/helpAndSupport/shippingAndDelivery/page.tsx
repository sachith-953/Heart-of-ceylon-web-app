
"use client"
import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ShippingDelivery: React.FC = () => {
  const [customerType, setCustomerType] = useState<'international' | 'local'>('international');

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Navbar />

      <MaxWidthWrapper>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping and Delivery 🚚</h1>
            <p className="text-xl text-gray-600">Find out about our delivery options, shipping times, and charges.</p>
          </div>

          <div className="flex justify-center mb-8">
            <button 
              className={`px-6 py-2 rounded-l-lg ${customerType === 'international' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} 
              onClick={() => setCustomerType('international')}
            >
              🌍 International
            </button>
            <button 
              className={`px-6 py-2 rounded-r-lg ${customerType === 'local' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`} 
              onClick={() => setCustomerType('local')}
            >
              🇱🇰 Local
            </button>
          </div>

          {customerType === 'international' ? (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">International Delivery 🌍</h2>
              <ul className="text-gray-600 mb-6 list-disc list-inside">
                <li>Standard Delivery (7-14 business days) - $15</li>
                <li>Express Delivery (3-5 business days) - $30</li>
              </ul>
            </section>
          ) : (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Local Delivery 🇱🇰</h2>
              <ul className="text-gray-600 mb-6 list-disc list-inside">
                <li>Standard Delivery (3-5 business days) - LKR 1500</li>
                <li>Express Delivery (1-2 business days) - LKR 3000</li>
                <li>Same-Day Delivery (selected areas) - LKR 5000</li>
              </ul>
            </section>
          )}

          <h2 className="text-2xl font-semibold mb-4">Shipping Times ⏰</h2>
          <p className="text-gray-600 mb-6">
            Orders placed before 12 PM will be processed the same day. Orders placed after 12 PM will be processed the next business day.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Shipping Charges 💸</h2>
          <p className="text-gray-600 mb-6">
            Shipping charges are calculated at checkout based on delivery location and selected shipping method. Charges may vary slightly due to real-time exchange rates.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Terms and Conditions 📜</h2>
          <p className="text-gray-600 mb-6">
            - Delivery times are estimates and may be subject to delays due to unforeseen circumstances.
            <br />- Orders may require additional processing time during peak seasons.
            <br />- Customers are responsible for providing accurate delivery information.
            <br />- International deliveries may incur additional customs fees and import duties.
          </p>

          <div className="text-center mt-8">
            <Link href="/app/footer-pages/helpAndSupport/orderTracking/page.tsx" legacyBehavior>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">Track Your Order 📦</Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>

      <Footer />
    </div>
  );
};

export default ShippingDelivery;
