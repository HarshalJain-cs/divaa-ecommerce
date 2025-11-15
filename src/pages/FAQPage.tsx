import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import Header from '@/components/ui/Header';
import FAQCategory from '@/components/faq/FAQCategory';
import { faqCategories } from '@/data/faqData';

const FAQPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-off-white to-light-gray">
        {/* Hero Section */}
        <section className="hero-gradient py-16 md:py-20">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              {/* Back Button */}
              <div className="mb-6">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-white hover:text-cream transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Home</span>
                </Link>
              </div>

              {/* Page Title */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <HelpCircle className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold animate-fade-in">
                  Frequently Asked Questions
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-cream mb-4 animate-fade-in-up">
                Find answers to common questions about DIVA Jewel Cart
              </p>
              <p className="text-gray-200 text-lg animate-fade-in-up">
                Have a question? Browse through our FAQ categories below or contact our support team
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Categories Section */}
        <section className="section">
          <div className="container-custom">
            {/* Statistics */}
            <div className="text-center mb-12">
              <p className="text-gray-600">
                <span className="font-semibold text-charcoal text-xl">{faqCategories.length}</span> categories,{' '}
                <span className="font-semibold text-charcoal text-xl">
                  {faqCategories.reduce((sum, cat) => sum + cat.totalQuestions, 0)}
                </span>{' '}
                questions answered
              </p>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 animate-fade-in-up">
              {faqCategories.map((category) => (
                <FAQCategory key={category.id} category={category} />
              ))}
            </div>

            {/* Contact Support Section */}
            <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our customer support team is here to help you.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/contact"
                  className="btn btn-rose-gold"
                >
                  Contact Support
                </Link>
                <a
                  href="mailto:support@diva.com"
                  className="btn btn-outline-rose"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer can be added here if needed */}
      </div>
    </>
  );
};

export default FAQPage;
