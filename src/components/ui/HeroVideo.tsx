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
    export default function HeroVideo() {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/7308098-hd_1920_1080_24fps.mp4"
      />
      
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
        <div className="container mx-auto h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Timeless Elegance Crafted for You
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Discover our exquisite collection of handcrafted jewelry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
  );
}
