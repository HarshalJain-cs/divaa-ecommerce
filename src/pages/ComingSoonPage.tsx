/**
 * @component ComingSoonPage
 * @description Generic coming soon page for features under development
 */
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Sparkles } from 'lucide-react';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Icon */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-gold-dark rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-amber-100 to-rose-gold/20 p-8 rounded-full">
            <Clock className="w-24 h-24 text-amber-600 animate-pulse" />
          </div>
          <Sparkles className="absolute top-0 right-0 w-8 h-8 text-amber-500 animate-bounce" />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-rose-gold-dark to-rose-600 mb-4">
          Coming Soon
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-700 font-medium mb-6">
          We're crafting something special for you
        </p>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-12 max-w-xl mx-auto">
          This feature is currently under development. Our team is working hard to bring you an amazing experience.
          Stay tuned for updates!
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg hover:shadow-xl transition-all font-semibold text-lg group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-amber-500 text-amber-700 rounded-lg hover:bg-amber-50 transition-all font-semibold text-lg"
          >
            Browse Products
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-rose-gold-dark rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-rose-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
