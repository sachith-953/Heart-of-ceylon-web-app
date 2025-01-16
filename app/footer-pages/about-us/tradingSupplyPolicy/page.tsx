import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Truck, ShieldCheck, RefreshCcw, AlertCircle, ChevronRight } from 'lucide-react';

const PolicyCard = ({ icon: Icon, title, description }) => (
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

const TradingSupplyPolicy: React.FC = () => {
  const policies = [
    {
      icon: FileText,
      title: "Order Processing",
      description: "All orders are processed within 1-3 business days. You will receive a confirmation email with your order details and estimated delivery time."
    },
    {
      icon: Truck,
      title: "Shipping and Delivery",
      description: "We offer worldwide shipping. Delivery times vary based on location, typically ranging from 7-21 business days. Free shipping is available for orders over $100."
    },
    {
      icon: ShieldCheck,
      title: "Product Quality Assurance",
      description: "All products are sourced and crafted in Sri Lanka, ensuring premium quality. If you encounter any issues, we offer a 30-day return or exchange policy."
    },
    {
      icon: RefreshCcw,
      title: "Returns and Exchanges",
      description: "You may return or exchange items within 30 days of receipt. Products must be unused, in original condition, and accompanied by proof of purchase."
    },
    {
      icon: AlertCircle,
      title: "Customer Responsibility",
      description: "Customers are responsible for providing accurate shipping details. Heart of Ceylon is not liable for orders delivered to incorrect addresses."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <MaxWidthWrapper>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Trading and Supply Policies
            </h1>
            <p className="text-xl text-gray-600">
              Our commitment to quality and service ensures a smooth experience for every customer.
            </p>
          </div>

          <div className="space-y-6">
            {policies.map((policy, index) => (
              <PolicyCard key={index} {...policy} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl mb-6">Need more information?</p>
            <Link href="/contact">
              <div 
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Contact Us
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

export default TradingSupplyPolicy;
