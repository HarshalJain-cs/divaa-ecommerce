/**
 * @component CaratLaneExpressions
 * @description User story sharing section with video background
 */
import { Camera } from 'lucide-react';

const CaratLaneExpressions = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-rose-gold/10 to-blush/10">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source
            src="https://www.caratlane.com/static/images/V4/2024/CL/11_NOV/Banner/Expressions/desktop.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            DIVA <span className="text-rose-gold-dark">Expressions</span>
          </h2>

          {/* Subtitle */}
          <h3 className="text-2xl md:text-3xl font-medium text-gray-700 mb-8">
            Share your <span className="text-rose-gold-dark font-semibold">#MyDIVAStory</span> and win jewellery worth up to ₹15,000
          </h3>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Every piece of jewelry tells a story. Share yours and inspire others!
            The best stories win exciting prizes.
          </p>

          {/* CTA Button */}
          <a
            href="/expressions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <button className="group bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-10 py-4 rounded-xl hover:shadow-2xl transition-all font-semibold text-lg flex items-center gap-3 mx-auto">
              <Camera className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              <span>SHARE YOUR STORY</span>
            </button>
          </a>

          {/* Additional Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">📸</div>
              <h4 className="font-semibold text-gray-800 mb-2">Share Photos</h4>
              <p className="text-sm text-gray-600">Upload your jewelry moments</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">❤️</div>
              <h4 className="font-semibold text-gray-800 mb-2">Tell Your Story</h4>
              <p className="text-sm text-gray-600">What makes it special?</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🎁</div>
              <h4 className="font-semibold text-gray-800 mb-2">Win Prizes</h4>
              <p className="text-sm text-gray-600">Up to ₹15,000 in jewelry</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaratLaneExpressions;
