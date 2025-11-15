import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Award, Users, Sparkles } from 'lucide-react';
import Header from '@/components/ui/Header';

const AboutPage = () => {
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
                <Heart className="w-12 h-12" />
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold animate-fade-in">
                  About DIVA Jewel Cart
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-cream mb-4 animate-fade-in-up">
                Crafting timeless elegance since 1998
              </p>
              <p className="text-gray-200 text-lg animate-fade-in-up">
                A legacy of exceptional craftsmanship, uncompromising quality, and customer delight
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">

                <h2 className="text-4xl font-serif font-bold text-charcoal mb-8 text-center">
                  Our Story
                </h2>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-6">
                    In 1998, DIVA Jewel Cart was born from a simple yet powerful vision: to make exquisite, authentic jewelry accessible to every woman who dreams of adorning herself with timeless elegance. What began as a small workshop in the heart of India has blossomed into a beloved jewelry destination, serving thousands of customers across the globe.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    For over two decades, we have remained steadfast in our commitment to exceptional craftsmanship. Each piece of DIVA jewelry tells a story—meticulously designed by our master artisans, crafted with premium materials, and finished with an attention to detail that honors centuries-old traditions while embracing contemporary aesthetics.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    Our journey has been guided by three unwavering principles: authenticity, quality, and customer satisfaction. We believe that jewelry is more than mere adornment; it's a celebration of life's precious moments, a symbol of love, and an heirloom to be cherished for generations.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    From our signature silver collections featuring 925 sterling silver to our radiant gold pieces in 14K, 18K, and 22K purity, every DIVA creation undergoes rigorous quality checks and comes with certified authenticity. We source our materials ethically, work with skilled craftsmen who pour their expertise into every design, and ensure that what reaches you is nothing short of perfection.
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    What sets DIVA apart is our deep understanding that jewelry shopping should be a delightful experience. Whether you're celebrating a milestone, expressing your unique style, or searching for the perfect gift, we're here to make your journey memorable. Our customer-first approach means hassle-free returns, transparent pricing, free shipping, and a support team that genuinely cares about your satisfaction.
                  </p>

                  <p className="text-gray-700 leading-relaxed">
                    As we look to the future, our mission remains unchanged: to continue creating jewelry that makes you feel beautiful, confident, and truly special. Thank you for being part of the DIVA family—your trust and love inspire us every single day.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="section pt-0">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-charcoal mb-12 text-center">
                What We Stand For
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Value 1 */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Award className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3 text-center">
                    Premium Quality
                  </h3>
                  <p className="text-gray-600 text-center">
                    Only the finest materials, authenticated and certified for your peace of mind
                  </p>
                </div>

                {/* Value 2 */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Sparkles className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3 text-center">
                    Exquisite Craftsmanship
                  </h3>
                  <p className="text-gray-600 text-center">
                    Every piece handcrafted by master artisans with decades of expertise
                  </p>
                </div>

                {/* Value 3 */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Users className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3 text-center">
                    Customer First
                  </h3>
                  <p className="text-gray-600 text-center">
                    Your satisfaction is our priority with easy returns and dedicated support
                  </p>
                </div>

                {/* Value 4 */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-rose-gold/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Heart className="w-8 h-8 text-rose-gold-dark" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3 text-center">
                    Timeless Designs
                  </h3>
                  <p className="text-gray-600 text-center">
                    Classic elegance meets modern trends for jewelry that never goes out of style
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section pt-0">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-serif font-bold text-charcoal mb-12 text-center">
                Our Journey
              </h2>

              <div className="space-y-8">
                {/* 1998 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-rose-gold-dark text-white rounded-full flex items-center justify-center font-bold text-lg">
                      1998
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 flex-1 border border-gray-100">
                    <h3 className="text-xl font-semibold text-charcoal mb-2">The Beginning</h3>
                    <p className="text-gray-600">
                      DIVA Jewel Cart was founded with a vision to bring authentic, high-quality jewelry to discerning customers. Our first workshop opened with a small team of passionate artisans.
                    </p>
                  </div>
                </div>

                {/* 2005 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-rose-gold text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2005
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 flex-1 border border-gray-100">
                    <h3 className="text-xl font-semibold text-charcoal mb-2">Expansion</h3>
                    <p className="text-gray-600">
                      Launched our signature silver collection and expanded to multiple retail locations across major cities, earning recognition for quality and design excellence.
                    </p>
                  </div>
                </div>

                {/* 2015 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-rose-gold text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2015
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 flex-1 border border-gray-100">
                    <h3 className="text-xl font-semibold text-charcoal mb-2">Going Digital</h3>
                    <p className="text-gray-600">
                      Embraced e-commerce, bringing our exquisite jewelry collections to customers nationwide through our online platform, making luxury accessible to all.
                    </p>
                  </div>
                </div>

                {/* 2025 */}
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-rose-gold-dark text-white rounded-full flex items-center justify-center font-bold text-lg">
                      2025
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6 flex-1 border border-gray-100">
                    <h3 className="text-xl font-semibold text-charcoal mb-2">Present Day</h3>
                    <p className="text-gray-600">
                      Serving thousands of happy customers globally with an expanded collection featuring gold, silver, diamond jewelry, and personalized pieces. Our commitment to quality and customer satisfaction remains stronger than ever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section pt-0">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-rose-gold-dark to-blush text-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Become Part of Our Story
              </h2>
              <p className="text-xl text-cream mb-8">
                Explore our collection and discover jewelry that celebrates your unique journey
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link
                  to="/products"
                  className="btn bg-white text-rose-gold-dark hover:bg-cream"
                >
                  Shop Now
                </Link>
                <Link
                  to="/contact"
                  className="btn btn-outline-rose border-white text-white hover:bg-white hover:text-rose-gold-dark"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default AboutPage;
