import { Link } from 'react-router-dom';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Header from '@/components/ui/Header';

const ReturnsPage = () => {
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
                <RotateCcw className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold animate-fade-in">
                  Returns & Exchanges
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-cream mb-4 animate-fade-in-up">
                30-day no questions asked return policy
              </p>
              <p className="text-gray-200 text-lg animate-fade-in-up">
                Your satisfaction is our priority - easy returns and exchanges
              </p>
            </div>
          </div>
        </section>

        {/* Returns Information Section */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">

                {/* Returns Section */}
                <div className="space-y-8">

                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-3">
                      Return Policy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      We offer a <strong className="text-rose-gold-dark">30-day return policy</strong> for all unused and unworn items, no questions asked. However, please note that the 30-day return does not apply to personalized jewelry, perfumes, candles, coins, utensils, and God idols other than in cases of defective/spurious products. DIVA reserves the right to process refunds after checking the returned items. In case you have purchased a DIVA product from anywhere other than the DIVA Website, DIVA App or DIVA Exclusive Stores, the return policies of your source of purchase shall apply. Any shipping charges (if paid) at the time of placing the order are non-refundable in case of returns.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-3">
                      Missing Items Policy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      In case of missing items in return orders, i.e., where the customer claims to have returned multiple products but actual pickup doesn't include all said items, the company has a right to deduct an amount up to the full MRP of the missing product from the refund amount. This shall extend to promotional products, including but not limited to free gifts and silver coins.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-3">
                      Refund Policy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      In case you have requested the return of any of your products, the refund of the same shall be initiated once we receive the product back in our warehouse.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-3">
                      Replacement & Exchange
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      You can also avail replacement or exchange of your order as per your requirements. The conditions remain the same as those applicable to returns. The replacement will only be shipped after the initial return has been picked up or delivered (in the case of Gold items).
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-3">
                      Return Process
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      You can initiate a return request from our website or app. Alternatively, you can reach out to our Customer Support team, and they'll guide you through the process. Once you have booked the return request, we request you to be available for the reverse pick-up, and we request you to answer calls from the delivery partner. In the absence of your availability or inability to answer the calls, the delivery partner may, at their discretion, cancel the reverse pick-up. In all such cases, the process will have to be re-initiated again, and the overall timeline will increase.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-3">
                      Non-Serviceable Pin Codes
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      Further, please note that while most pin codes are forward and reverse serviceable, in rare cases, some pin codes may only be forward serviceable and not reverse serviceable. In all such cases, we may request you to return the product via an alternate courier service, such as India Post and reimburse all reasonable shipping costs (up to Rs 70) incurred by you for processing such returns.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      In case the charges exceed Rs. 70, all charges (return shipping, duties, taxes, fees, etc.) in excess of Rs. 70 will be adjusted against the customer's refund. In case of non-serviceable pin codes, the customer is responsible for returning the jewelry to our warehouse and will receive Rs. 70 towards shipping charges with their refund.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-3">
                      Empty Parcel or Missing Product
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      In the unlikely event that you receive an empty parcel or a missing product, we would request you to reach out to our customer support team for assistance within 48 hours of the package being delivered. We will be requiring a 360-degree unpacking video of the parcel for us to process the request further. Please note that insufficient evidence or visible signs of tampering with the packet may result in your claim not being honored. In all such cases, the brand reserves the right to take the final decision.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-3">
                      Terms & Conditions
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      For more detailed Terms & Conditions, please refer to our{' '}
                      <Link
                        to="/terms-of-service"
                        className="text-rose-gold-dark hover:text-rose-gold underline font-medium"
                      >
                        Terms of Service page
                      </Link>
                      .
                    </p>
                  </div>

                </div>

                {/* Additional Information */}
                <div className="mt-12 p-6 bg-cream/20 rounded-xl border border-rose-gold/20">
                  <h3 className="text-lg font-semibold text-charcoal mb-3">
                    Need to Initiate a Return?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    You can initiate a return directly from your account or contact our customer support team for assistance.
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link
                      to="/profile"
                      className="btn btn-rose-gold text-sm"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/contact"
                      className="btn btn-outline-rose text-sm"
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

export default ReturnsPage;
