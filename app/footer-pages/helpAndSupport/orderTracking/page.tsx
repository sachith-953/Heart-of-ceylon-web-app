"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

// Define the type for order status
interface OrderStatus {
  orderId: string;
  status: string;
  estimatedDelivery: string;
  location: string;
}

const OrderTracking: React.FC = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [customerType, setCustomerType] = useState<'local' | 'international'>('local');

  const handleTrackOrder = () => {
    // Simulated order status
    const mockStatus: OrderStatus = {
      orderId: trackingNumber,
      status: 'Shipped',
      estimatedDelivery: customerType === 'local' ? '2025-01-05' : '2025-01-15',
      location: customerType === 'local' ? 'Colombo, Sri Lanka' : 'New York, USA',
    };
    setOrderStatus(mockStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Navbar />

      <MaxWidthWrapper>
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Track Your Order
            </h1>
            <p className="text-xl text-gray-600">
              Enter your tracking number to see the status of your order.
            </p>
          </div>

          <Card className="mb-12">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <label htmlFor="customerType" className="mr-2 text-lg font-semibold">
                  Select Customer Type:
                </label>
                <select
                  id="customerType"
                  value={customerType}
                  onChange={(e) => setCustomerType(e.target.value as 'local' | 'international')}
                  className="p-4 border border-gray-300 rounded-md"
                >
                  <option value="local">Local Customer</option>
                  <option value="international">International Customer</option>
                </select>
              </div>

              <input
                type="text"
                className="w-full p-4 border border-gray-300 rounded-md mb-6"
                placeholder="Enter Tracking Number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleTrackOrder}
              >
                Track Order
              </Button>
            </CardContent>
          </Card>

          {orderStatus && (
            <Card className="mb-12">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Order Status
                </h2>
                <p className="text-lg mb-2">
                  <strong>Order ID:</strong> {orderStatus.orderId}
                </p>
                <p className="text-lg mb-2">
                  <strong>Status:</strong> {orderStatus.status}
                </p>
                <p className="text-lg mb-2">
                  <strong>Estimated Delivery:</strong>{' '}
                  {orderStatus.estimatedDelivery}
                </p>
                <p className="text-lg">
                  <strong>Current Location:</strong>{' '}
                  {orderStatus.location}
                </p>
              </CardContent>
            </Card>
          )}

          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="mb-6">
              If you need assistance, feel free to contact our support team.
            </p>
            <Link href="/contact-support">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Support
              </Button>
            </Link>
          </section>
        </div>
      </MaxWidthWrapper>

      <Footer />
    </div>
  );
};

export default OrderTracking;