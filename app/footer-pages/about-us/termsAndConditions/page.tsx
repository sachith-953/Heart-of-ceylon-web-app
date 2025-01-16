import React from 'react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MaxWidthWrapper>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-xl text-gray-600">
              Welcome to Heart of Ceylon. Please read our terms carefully.
            </p>
          </div>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p>
                By accessing and using our website, you agree to comply with and be bound by the following terms and conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. General Conditions</h2>
              <p>
                We reserve the right to refuse service to anyone at any time. You understand that your content (excluding credit card information) may be transferred unencrypted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Products and Pricing</h2>
              <p>
                All products listed are made in Sri Lanka. Prices are subject to change without notice. We do our best to ensure product descriptions and images are accurate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Payment and Security</h2>
              <p>
                We offer secure payment gateways. Your payment details are processed securely. We do not store your credit card details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
              <p>
                Orders are processed within 3-5 business days. Delivery times may vary depending on your location. International shipping is available.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Returns and Refunds</h2>
              <p>
                We accept returns within 14 days of delivery. Items must be unused and in original packaging. Refunds are processed within 7-10 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
              <p>
                These terms are governed by the laws of Sri Lanka. Any disputes will be resolved in Sri Lankan courts.
              </p>
            </section>
          </div>

          <div className="text-center mt-12">
            <Link href="/">
              <div className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Return to Home
              </div>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
