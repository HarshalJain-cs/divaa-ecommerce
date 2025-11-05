/**
 * @component HeroVideo
 * @description Hero video section with overlay content
 */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function HeroVideo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Preload video
    const video = document.createElement('video');
    video.src = 'https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/8184067-hd_1920_1080_30fps.mp4';
    video.onloadeddata = () => setIsVideoLoaded(true);
  }, []);

  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onError={(e) => {
          console.error('Hero video failed to load:', e);
          // Fallback to gradient background
          const section = e.currentTarget.parentElement;
          if (section) {
            section.style.background = 'linear-gradient(135deg, #E0BFB8 0%, #DE5D83 100%)';
          }
        }}
      >
        <source
          src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/8184067-hd_1920_1080_30fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Discover Timeless Elegance
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Handcrafted jewelry that celebrates your unique style and grace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="px-8 py-3 bg-rose-pink text-white rounded-lg hover:bg-rose-pink-light transition-all transform hover:scale-105 shadow-lg font-medium text-lg"
            >
              Shop Collection
            </Link>
            <Link
              to="/categories"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg hover:bg-white/20 transition-all font-medium text-lg"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
