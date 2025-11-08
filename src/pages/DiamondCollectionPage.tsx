/**
 * @page DiamondCollectionPage
 * @description Diamond jewelry collection page - Coming Soon
 */
import { Link } from 'react-router-dom';
import { Sparkles, Crown, Star, ArrowRight } from 'lucide-react';
import Header from '@/components/ui/Header';

const DiamondCollectionPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Sparkle Effects */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles className="w-4 h-4 text-white opacity-50" />
              </div>
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="mb-8 animate-fade-in">
                <span className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full shadow-2xl text-sm font-medium text-white border border-white/20">
                  <Crown className="w-5 h-5 text-yellow-300" />
                  Premium Diamond Collection
                  <Crown className="w-5 h-5 text-yellow-300" />
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl md:text-8xl font-serif font-bold mb-8 text-white drop-shadow-2xl animate-fade-in-up">
                Diamond
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 animate-gradient">
                  Elegance
                </span>
              </h1>

              {/* Coming Soon */}
              <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="inline-block px-12 py-6 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20">
                  <p className="text-5xl md:text-6xl font-bold text-white mb-3">
                    ✨ COMING SOON ✨
                  </p>
                  <p className="text-xl text-white/90">
                    Launching our exclusive lab-grown diamond collection
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed animate-fade-in-up max-w-3xl mx-auto" style={{ animationDelay: '0.3s' }}>
                Experience the brilliance of ethically sourced, lab-grown diamonds.
                <br />
                Sustainable luxury, exceptional quality, unmatched value.
              </p>

              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">IGI Certified</h3>
                  <p className="text-white/80 text-sm">
                    Every diamond comes with international certification
                  </p>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Lab-Grown</h3>
                  <p className="text-white/80 text-sm">
                    Ethically sourced and environmentally responsible
                  </p>
                </div>

                <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/15 transition-all">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Lifetime Value</h3>
                  <p className="text-white/80 text-sm">
                    Premium quality at exceptional prices
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Link
                  to="/collections/gold"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-2xl transition-all font-semibold text-lg group"
                >
                  Shop Gold Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/collections/silver"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl hover:bg-white/20 transition-all font-semibold text-lg group"
                >
                  Shop Silver Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Be the First to Know
              </h2>
              <p className="text-white/80 mb-8">
                Subscribe to get notified when our diamond collection launches
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all font-semibold whitespace-nowrap"
                >
                  Notify Me
                </button>
              </form>
              <p className="text-white/60 text-sm mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Why Lab-Grown Diamonds?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Same as Natural', desc: 'Chemically & physically identical to mined diamonds' },
                { title: '30-40% More Value', desc: 'Better quality at significantly lower prices' },
                { title: 'Eco-Friendly', desc: 'Minimal environmental impact, conflict-free' },
                { title: 'Certified Quality', desc: 'IGI & GIA certified with detailed reports' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                >
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Explore Our Current Collections
            </h2>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to="/collections/gold"
                className="text-amber-300 hover:text-amber-200 font-semibold underline"
              >
                Gold Jewelry
              </Link>
              <span className="text-white/50">•</span>
              <Link
                to="/collections/silver"
                className="text-slate-300 hover:text-slate-200 font-semibold underline"
              >
                Silver Jewelry
              </Link>
              <span className="text-white/50">•</span>
              <Link
                to="/wedding"
                className="text-pink-300 hover:text-pink-200 font-semibold underline"
              >
                Wedding Collection
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default DiamondCollectionPage;
