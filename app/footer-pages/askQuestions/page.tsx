
import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

const FAQItem = ({ question, answer }) => (
  <Card className="mb-4 hover:shadow-md transition-all">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-2">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </CardContent>
  </Card>
);

const AskQuestions: React.FC = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the sign-up button and fill out the required details to get started."
    },
    {
      question: "How do I list my products?",
      answer: "Navigate to the product dashboard, click 'Add Product' and fill in the necessary information."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions or contact our admin team
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">General Questions</h2>
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Contact Admin</h2>
          <p className="mb-6">If you can't find the answer you're looking for, reach out to our admin team:</p>
          <Link href="/contact-admin">
            <Button className="bg-blue-600 hover:bg-blue-700 inline-flex items-center">
              <MessageSquare className="mr-2" size={18} />
              Contact Admin
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AskQuestions;
