import { Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import Header from '@/components/ui/Header';

const ShippingPage = () => {
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
                <Package className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold animate-fade-in">
                  Shipping & Handling
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-cream mb-4 animate-fade-in-up">
                Fast, secure, and free shipping on orders over Rs. 449
              </p>
              <p className="text-gray-200 text-lg animate-fade-in-up">
                Learn about our shipping policies, delivery times, and tracking options
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Information Section */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">

                {/* Shipping Section */}
                <div className="mb-8">
                  <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">
                    Shipping
                  </h2>

                  <ul className="space-y-6">
                    <li>
                      <h3 className="text-xl font-semibold text-charcoal mb-2">
                        Shipping Time
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        Orders are usually processed and shipped within 48 hours. Please note personalized items will take longer to process. If your order has both personalized and non-personalized items, the order will be split, and the non-personalized items will be delivered beforehand.
                      </p>
                    </li>

                    <li>
                      <h3 className="text-xl font-semibold text-charcoal mb-2">
                        Shipping Charges
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        We offer <strong className="text-rose-gold-dark">free shipping on all orders over Rs. 449</strong>. Please note that we do not offer free shipping on international orders and returns.
                      </p>
                    </li>

                    <li>
                      <h3 className="text-xl font-semibold text-charcoal mb-2">
                        Tracking
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        You will receive tracking details over WhatsApp, email and SMS, once the order is shipped.
                      </p>
                    </li>

                    <li>
                      <p className="text-gray-700 leading-relaxed">
                        In case you're ordering other items along with personalized or Gold jewelry, your order might arrive in parts.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Additional Information */}
                <div className="mt-12 p-6 bg-cream/20 rounded-xl border border-rose-gold/20">
                  <h3 className="text-lg font-semibold text-charcoal mb-3">
                    Need Help?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about shipping or need assistance with your order, please don't hesitate to contact our customer support team.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link
                      to="/faq"
                      className="btn btn-outline-rose text-sm"
                    >
                      View FAQ
                    </Link>
                    <Link
                      to="/contact"
                      className="btn btn-rose-gold text-sm"
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShippingPage;
