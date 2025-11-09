/**
 * @page DigitalGoldPage
 * @description Comprehensive Digital Gold page with Buy/Sell/Exchange/FAQ sections
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Award, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/ui/Header';

type Section = 'buy' | 'gift' | 'gift-claim' | 'sell' | 'faqs' | 'redeem' | 'know-more';

const DigitalGoldPage = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('buy');
  const [activeFaqCategory, setActiveFaqCategory] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [isSubmittingCallback, setIsSubmittingCallback] = useState(false);

  const toggleFaq = (category: string) => {
    setActiveFaqCategory(activeFaqCategory === category ? null : category);
  };

  const handleRequestCallback = async () => {
    // Validate phone number
    if (mobileNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmittingCallback(true);

    try {
      // Insert callback request into Supabase
      const { error } = await supabase
        .from('callback_requests')
        .insert({
          phone_number: mobileNumber,
          user_id: user?.id || null,
          status: 'pending',
        });

      if (error) {
        console.error('Error submitting callback request:', error);
        toast.error('Failed to submit callback request. Please try again.');
        return;
      }

      // Success
      toast.success('Callback request submitted! We will call you back within 5 minutes.');
      setMobileNumber('');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmittingCallback(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Navigation Bar */}
        <div className="sticky top-16 z-40 bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              {/* Mobile Menu (Hamburger) */}
              <div className="md:hidden">
                <button className="p-2">
                  <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
                  <div className="w-6 h-0.5 bg-gray-700 mb-1"></div>
                  <div className="w-6 h-0.5 bg-gray-700"></div>
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  to="/coming-soon"
                  className="font-medium transition-colors text-gray-700 hover:text-amber-600"
                >
                  Buy Gold
                </Link>
                <Link
                  to="/coming-soon"
                  className="font-medium transition-colors text-amber-600 border-b-2 border-amber-600"
                >
                  Gift Card
                </Link>
                <Link
                  to="/coming-soon"
                  className="font-medium transition-colors text-gray-700 hover:text-amber-600"
                >
                  Gift Card Claim
                </Link>
                <Link
                  to="/coming-soon"
                  className="font-medium transition-colors text-gray-700 hover:text-amber-600"
                >
                  Sell Gold
                </Link>
                <Link
                  to="/coming-soon"
                  className="font-medium transition-colors text-gray-700 hover:text-amber-600"
                >
                  FAQs
                </Link>
                <Link
                  to="/coming-soon"
                  className="font-medium transition-colors text-gray-700 hover:text-amber-600"
                >
                  Exchange / Redeem
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Buy Gold Section */}
        {activeSection === 'buy' && (
          <div className="digigoldContainer">
            {/* Hero Banner */}
            <div className="relative overflow-hidden">
              <img
                src="https://placehold.co/1132x466/d4af37/ffffff?text=Digital+Gold+Banner+%28Coming+Soon%29"
                alt="Digital Gold Banner"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl text-white">
                    <p className="text-2xl md:text-3xl font-bold mb-4">
                      DIVA Digital Gold
                    </p>
                    <p className="text-xl mb-6">
                      Invest in Pure 24K Gold Online - 100% Safe & Trustworthy
                    </p>
                    <div className="flex gap-4">
                      <Link
                        to="/coming-soon"
                        className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg hover:shadow-xl transition-all font-semibold"
                      >
                        Buy Now
                      </Link>
                      <Link
                        to="/coming-soon"
                        className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all font-semibold"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Unparalleled convenience</h3>
                    <p className="text-gray-600 text-sm">
                      Buy in-store or online 24x7. Purchase gold online or offline through one of our jewellery stores.
                    </p>
                  </div>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                      <Shield className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">What you buy is what you get</h3>
                    <p className="text-gray-600 text-sm">
                      No carrying cost or hidden charges. Every gram of DIVA eGold you buy online is backed by real gold deposits worth the same.
                    </p>
                  </div>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">100% guaranteed buyback</h3>
                    <p className="text-gray-600 text-sm">
                      Redeem your DIVA eGold balance across our stores and online outlets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Know More Section */}
        {activeSection === 'know-more' && (
          <div className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold mb-4">Know More</h2>
              <p className="text-gray-700 mb-6">
                Invest in a high-payoff digital gold. Buy, sell, or redeem your DIVA eGold in exchange for beautiful jewellery.
              </p>
              <div className="flex gap-4 mb-12">
                <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg hover:shadow-xl transition-all font-semibold">
                  Buy eGold Now
                </button>
                <button
                  onClick={() => setActiveSection('redeem')}
                  className="px-8 py-3 border-2 border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-all font-semibold"
                >
                  How to redeem?
                </button>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-6 bg-amber-50 rounded-xl">
                  <TrendingUp className="w-12 h-12 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">Unparalleled convenience</h4>
                    <p className="text-sm text-gray-600">
                      Buy in-store or online 24x7. Purchase gold online or offline through one of our jewellery stores.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-amber-50 rounded-xl">
                  <Shield className="w-12 h-12 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">What you buy is what you get</h4>
                    <p className="text-sm text-gray-600">
                      No carrying cost or hidden charges. Every gram of DIVA eGold you buy online is backed by real gold deposits worth the same.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-amber-50 rounded-xl">
                  <Award className="w-12 h-12 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold mb-2">100% guaranteed buyback</h4>
                    <p className="text-sm text-gray-600">
                      Redeem your DIVA eGold balance across our stores and physical outlets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Redeem Section */}
        {activeSection === 'redeem' && (
          <div className="py-16 bg-gradient-to-br from-amber-50 to-white">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-3xl font-bold mb-4">Redeem</h2>
              <p className="text-xl text-amber-700 font-semibold mb-2">eGold to jewellery, in a blink!</p>
              <p className="text-gray-700 mb-12">
                You can redeem DIVA eGold online or offline through one of our many jewellery stores across India.
              </p>

              {/* Steps */}
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                  <p className="font-semibold mb-2">Choose your favorite jewellery from DIVA</p>
                  <ArrowRight className="w-6 h-6 mx-auto text-amber-600 mt-4" />
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                  <p className="font-semibold mb-2">Redeem your DIVA eGold at checkout</p>
                  <ArrowRight className="w-6 h-6 mx-auto text-amber-600 mt-4" />
                </div>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                  <p className="font-semibold mb-2">Get your jewellery delivered for free at your doorstep</p>
                </div>
              </div>

              {/* Vault Card */}
              <div className="bg-gradient-to-br from-amber-100 to-yellow-100 p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-2">Visit Vault</h3>
                <p className="text-gray-700 mb-4">Check your gold Balance</p>
                <Link
                  to={user ? '/coming-soon' : '/login'}
                  className="inline-block px-8 py-3 bg-white text-amber-900 rounded-lg hover:shadow-lg transition-all font-semibold"
                >
                  Login to view
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* FAQs Section */}
        {activeSection === 'faqs' && (
          <div className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              {/* Request Callback Section */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white p-8 rounded-2xl mb-12">
                <div className="max-w-2xl mx-auto text-center">
                  <h3 className="text-2xl font-bold mb-4">Got questions? We have all the answers!</h3>
                  <p className="mb-6">Have questions about DIVA eGold? Share your number and we will call you back!</p>
                  <div className="flex items-center gap-4 max-w-md mx-auto">
                    <div className="flex-1">
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full px-4 py-3 rounded-lg text-gray-900"
                        placeholder="Mobile Number"
                        maxLength={10}
                      />
                    </div>
                    <button
                      onClick={handleRequestCallback}
                      disabled={isSubmittingCallback}
                      className="px-6 py-3 bg-white text-amber-900 rounded-lg hover:shadow-lg transition-all font-semibold whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmittingCallback ? 'Submitting...' : 'Request Call Back'}
                    </button>
                  </div>
                </div>
              </div>

              {/* FAQ Categories */}
              <div className="space-y-8">
                {/* General FAQs */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">General</h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'What is digital gold?',
                        a: 'Digital Gold is an organised and transparent method of buying 24-Carat gold in compliance with all applicable laws and regulations. Digital Gold is neither a financial product nor a deposit but a method of purchasing gold for your personal needs. Digital Gold gives the flexibility for customers to accumulate gold in any denomination, say as low as Rs. 10. Physical gold will be bought by service providers and stored in very safe vaults for the customer.'
                      },
                      {
                        q: 'What is DIVA Digital Gold?',
                        a: 'DIVA Digital Gold is a service offered by DIVA to enable customers to accumulate digital gold, sell at any time, or exchange for physical Jewellery on the DIVA website or at DIVA outlets. DIVA takes care of selling gold to the customers, storing, and buyback from customers, while providing a seamless experience for customers to buy any jewellery from DIVA through the sale proceeds of customers\' gold balance.'
                      },
                      {
                        q: 'Why should I buy DIVA Digital Gold?',
                        a: 'DIVA Digital Gold has the DIVA Seal of Trust and guarantees purity. Our digital gold is easily redeemable for Jewellery anytime, on the DIVA website or across any of our jewellery outlets. We offer the flexibility of redemption across all our stores and online stores as well. Customers have the option to choose from our unique and exclusive 8000+ designs and purchase using the accumulated DIVA Digital Gold value.'
                      },
                    ].map((faq, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleFaq(`general-${idx}`)}
                          className="w-full px-6 py-4 text-left font-semibold hover:bg-gray-50 transition-colors flex justify-between items-center"
                        >
                          {faq.q}
                          <span className="text-amber-600">{activeFaqCategory === `general-${idx}` ? '−' : '+'}</span>
                        </button>
                        {activeFaqCategory === `general-${idx}` && (
                          <div className="px-6 py-4 bg-gray-50 border-t">
                            <p className="text-gray-700">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buy FAQs */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">Buy</h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'How do I buy DIVA Digital Gold?',
                        a: 'Just go to DIVA website and enter the grams/amount that you want to buy. First-time buyers will have to register by providing the email, mobile number, address, and PAN details. For an existing customer, just logging in is enough. After confirming the value of the gold you want to buy, pay the amount and the gold will get credited to your DIVA Digital Gold balance.'
                      },
                      {
                        q: 'What is the minimum and maximum gold amount I can purchase?',
                        a: 'Minimum is Rs. 10. Maximum is Rs. 50,000 per transaction.'
                      },
                      {
                        q: 'Does the price include GST?',
                        a: 'Yes, our buy price is inclusive of 3% GST, the break-up of which can be seen on your invoice.'
                      },
                    ].map((faq, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleFaq(`buy-${idx}`)}
                          className="w-full px-6 py-4 text-left font-semibold hover:bg-gray-50 transition-colors flex justify-between items-center"
                        >
                          {faq.q}
                          <span className="text-amber-600">{activeFaqCategory === `buy-${idx}` ? '−' : '+'}</span>
                        </button>
                        {activeFaqCategory === `buy-${idx}` && (
                          <div className="px-6 py-4 bg-gray-50 border-t">
                            <p className="text-gray-700">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sell FAQs */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">Sell</h3>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'How do I sell my gold?',
                        a: 'You can sell gold by clicking on the sell option on the top after logging in to your account. DIVA Digital Gold provides a live sell price. You can choose to sell any amount of eGold starting with a minimum of ₹100 to upto ₹50,000 per transaction. The money will be credited to your bank account.'
                      },
                      {
                        q: 'Is there any lock-in period to sell gold?',
                        a: 'Same-day selling is restricted, so you can sell the gold 72 hours after its purchase.'
                      },
                      {
                        q: 'How long will it take to get the money in my bank account?',
                        a: 'The money will be transferred instantly within the next two hours. However, it can take a maximum of 72 hours in case of delays.'
                      },
                    ].map((faq, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleFaq(`sell-${idx}`)}
                          className="w-full px-6 py-4 text-left font-semibold hover:bg-gray-50 transition-colors flex justify-between items-center"
                        >
                          {faq.q}
                          <span className="text-amber-600">{activeFaqCategory === `sell-${idx}` ? '−' : '+'}</span>
                        </button>
                        {activeFaqCategory === `sell-${idx}` && (
                          <div className="px-6 py-4 bg-gray-50 border-t">
                            <p className="text-gray-700">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DigitalGoldPage;
