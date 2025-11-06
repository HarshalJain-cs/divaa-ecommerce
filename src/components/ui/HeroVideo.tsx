/**
 * @component HeroVideo
 * @description Hero video section with overlay content and smooth playback
 */
import { useState, useEffect, useRef } from 'react';

export default function HeroVideo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure smooth playback when video loads
    const video = videoRef.current;
    if (video) {
      video.onloadeddata = () => {
        setIsVideoLoaded(true);
        video.play().catch((error) => {
          console.log('Video autoplay was prevented:', error);
        });
      };
    }
  }, []);

  return (
    <div className="relative h-[60vh] overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/7308098-hd_1920_1080_24fps.mp4"
      />

      {/* Loading Placeholder */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-rose-gold/10 animate-pulse" />
      )}

      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
        <div className="container mx-auto h-full flex items-center px-4">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-fade-in-up">
              Timeless Elegance Crafted for You
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Discover our exquisite collection of handcrafted jewelry
            </p>

            {/* Optional CTA Button */}
            {/* <button className="bg-gradient-to-r from-rose-gold to-rose-gold-dark text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Shop Collection
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
