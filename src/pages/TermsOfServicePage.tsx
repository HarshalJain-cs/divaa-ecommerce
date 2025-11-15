import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import Header from '@/components/ui/Header';

const TermsOfServicePage = () => {
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
                <FileText className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold animate-fade-in">
                  Terms of Service
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-cream mb-4 animate-fade-in-up">
                Your agreement with DIVA Jewel Cart
              </p>
              <p className="text-gray-200 text-lg animate-fade-in-up">
                Please read these terms carefully before using our services
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content Section */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">

                {/* Last Updated */}
                <p className="text-sm text-gray-500 mb-8">
                  Last Updated: January 2025
                </p>

                <div className="space-y-8">

                  {/* Introduction */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      1. Introduction
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Welcome to DIVA Jewel Cart. These Terms of Service ("Terms") govern your access to and use of our website, mobile application, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
                    </p>
                  </div>

                  {/* Definitions */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      2. Definitions
                    </h2>
                    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                      <li><strong>"DIVA"</strong> refers to DIVA Jewel Cart and its affiliates</li>
                      <li><strong>"Services"</strong> refers to our website, mobile app, and e-commerce platform</li>
                      <li><strong>"User," "you,"</strong> or <strong>"your"</strong> refers to the person accessing our Services</li>
                      <li><strong>"Products"</strong> refers to jewelry and related items sold on our platform</li>
                    </ul>
                  </div>

                  {/* Account Registration */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      3. Account Registration
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      To access certain features of our Services, you may be required to create an account. When creating an account, you agree to:
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                      <li>Provide accurate, current, and complete information</li>
                      <li>Maintain and update your information to keep it accurate</li>
                      <li>Maintain the security of your account credentials</li>
                      <li>Accept responsibility for all activities under your account</li>
                      <li>Notify us immediately of any unauthorized use of your account</li>
                    </ul>
                  </div>

                  {/* Product Information */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      4. Product Information & Pricing
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      We strive to provide accurate product descriptions and pricing. However:
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                      <li>Product images are for illustration purposes and may vary slightly from actual items</li>
                      <li>Prices are subject to change without notice</li>
                      <li>We reserve the right to correct pricing errors</li>
                      <li>All prices are listed in Indian Rupees (INR) unless otherwise stated</li>
                      <li>Product availability is not guaranteed until order confirmation</li>
                    </ul>
                  </div>

                  {/* Orders & Payment */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      5. Orders & Payment
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      When you place an order with DIVA:
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                      <li>You are making an offer to purchase products at the stated price</li>
                      <li>We reserve the right to accept or reject your order</li>
                      <li>Payment must be completed before order processing</li>
                      <li>All payments are processed through secure, PCI-compliant gateways</li>
                      <li>We accept credit cards, debit cards, UPI, net banking, and other listed payment methods</li>
                      <li>Failed transactions may result in order cancellation</li>
                    </ul>
                  </div>

                  {/* Shipping & Delivery */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      6. Shipping & Delivery
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Please refer to our <Link to="/shipping" className="text-rose-gold-dark hover:text-rose-gold underline">Shipping Policy</Link> for detailed information. Key points include:
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                      <li>Orders are typically processed within 48 hours</li>
                      <li>Free shipping on orders over Rs. 449 (India only)</li>
                      <li>Delivery timelines vary by location and product type</li>
                      <li>DIVA is not responsible for delays caused by courier services or unforeseen circumstances</li>
                      <li>Risk of loss passes to you upon delivery</li>
                    </ul>
                  </div>

                  {/* Returns & Refunds */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      7. Returns & Refunds
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      Please refer to our <Link to="/returns" className="text-rose-gold-dark hover:text-rose-gold underline">Returns Policy</Link> for detailed information. Key points include:
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                      <li>30-day return policy for most products</li>
                      <li>Items must be unused, unworn, and in original condition</li>
                      <li>Personalized items cannot be returned except for defects</li>
                      <li>Refunds processed within 5-7 business days of receiving returned items</li>
                      <li>Return shipping is free for domestic returns</li>
                    </ul>
                  </div>

                  {/* Intellectual Property */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      8. Intellectual Property
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      All content on our Services, including but not limited to text, graphics, logos, images, and software, is the property of DIVA or its licensors and is protected by intellectual property laws. You may not:
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                      <li>Copy, reproduce, or distribute our content without permission</li>
                      <li>Use our trademarks, logos, or brand names without authorization</li>
                      <li>Modify or create derivative works from our content</li>
                      <li>Use automated systems to scrape or collect data from our Services</li>
                    </ul>
                  </div>

                  {/* User Conduct */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      9. User Conduct
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-3">
                      When using our Services, you agree not to:
                    </p>
                    <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe on the rights of others</li>
                      <li>Post or transmit harmful, offensive, or inappropriate content</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Interfere with the proper functioning of our Services</li>
                      <li>Use our Services for fraudulent purposes</li>
                    </ul>
                  </div>

                  {/* Limitation of Liability */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      10. Limitation of Liability
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      To the maximum extent permitted by law, DIVA shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our Services. Our total liability shall not exceed the amount you paid for the product or service in question.
                    </p>
                  </div>

                  {/* Privacy */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      11. Privacy
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy. By using our Services, you consent to our collection and use of your information as described in the Privacy Policy.
                    </p>
                  </div>

                  {/* Modifications */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      12. Modifications to Terms
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our Services after changes are posted constitutes your acceptance of the modified Terms.
                    </p>
                  </div>

                  {/* Governing Law */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      13. Governing Law
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our Services shall be subject to the exclusive jurisdiction of the courts located in [Your City], India.
                    </p>
                  </div>

                  {/* Contact */}
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">
                      14. Contact Information
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about these Terms of Service, please contact us at:
                    </p>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-700"><strong>Email:</strong> legal@diva.com</p>
                      <p className="text-gray-700"><strong>Phone:</strong> +91-XXXX-XXXXXX</p>
                      <p className="text-gray-700"><strong>Address:</strong> DIVA Jewel Cart, [Your Address]</p>
                    </div>
                  </div>

                </div>

                {/* Acceptance */}
                <div className="mt-12 p-6 bg-rose-gold/10 rounded-xl border border-rose-gold/30">
                  <p className="text-gray-700 leading-relaxed text-center">
                    By using DIVA Jewel Cart's Services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfServicePage;
