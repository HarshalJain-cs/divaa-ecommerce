/**
 * @component OfferBanner
 * @description CaratLane Treasure Chest offer banner
 */
import { Gift, ArrowRight } from 'lucide-react';

const OfferBanner = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-amber-50 to-yellow-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="order-2 md:order-1">
              <img
                className="w-full h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-shadow animated fadeIn"
                src="https://cdn.caratlane.com/media/static/images/V4/2025/CL/09_SEP/Banner/TreasureChest/02/Square_Desktop.jpg"
                alt="Treasure Chest Offer"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full">
                <Gift className="w-5 h-5 text-amber-700" />
                <span className="text-sm font-semibold text-amber-900">LIMITED TIME OFFER</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
                Treasure Chest Plan
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Pay for 9 Months</h3>
                    <p className="text-gray-600">Make easy monthly payments</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">10th Month FREE</h3>
                    <p className="text-gray-600">We pay the 10th month for you!</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Shop Your Dream Jewelry</h3>
                    <p className="text-gray-600">Redeem your savings for beautiful pieces</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="/offers/treasure-chest"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-xl transition-all font-semibold text-lg group"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="text-sm text-gray-500">
                *Terms and conditions apply. Visit website for complete details.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;
