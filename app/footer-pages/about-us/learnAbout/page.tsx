import React from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Link } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MaxWidthWrapper>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About Heart of Ceylon
            </h1>
            <p className="text-xl text-gray-600">
              Embracing the rich heritage of Sri Lanka, we bring you products crafted with passion and authenticity.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Heart of Ceylon was founded with the mission to showcase the beauty and craftsmanship of Sri Lankan products to the world. From handwoven textiles to unique artisanal goods, our platform is dedicated to promoting the spirit of local artisans and connecting them with global customers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
              <p className="text-gray-700 leading-relaxed">
                We take pride in sustainability, ethical sourcing, and supporting small businesses across Sri Lanka. Every item you purchase from Heart of Ceylon carries the essence of our island's heritage, contributing to the livelihood of local communities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed">
                To be the leading global platform representing authentic Sri Lankan craftsmanship and culture, inspiring pride and appreciation for our island's unique heritage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to empower Sri Lankan artisans by providing them with a platform to reach global markets while preserving traditional crafts and promoting sustainable business practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
              <p className="text-gray-700 leading-relaxed">
                By shopping with us, you not only receive high-quality, authentic products but also become part of a movement that values tradition, craftsmanship, and community empowerment.
              </p>
            </section>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl mb-6">Explore the heart of Sri Lanka today!</p>
            <Link href="/shop">
              <div 
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Discover Our Products
              </div>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default About;
