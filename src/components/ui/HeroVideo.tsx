/**
 * @component HeroVideo
 * @description Hero section with background video and elegant overlay
 */
import { useState, useEffect, useRef } from 'react';

export default function HeroVideo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Preload the video
    video.load();

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      // Try to play the video
      video.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error: unknown) => {
          console.warn('Video autoplay was prevented:', error);
          // Retry playback on user interaction
          const handleUserInteraction = () => {
            video.play()
              .then(() => {
                setIsPlaying(true);
                document.removeEventListener('click', handleUserInteraction);
              })
              .catch(console.warn);
          };
          document.addEventListener('click', handleUserInteraction);
        });
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = (e: ErrorEvent) => console.error('Video error:', e);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Video Background with Fallback */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/20 to-cream/20">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className={`w-full h-full object-cover transition-all duration-1000 ${
            isVideoLoaded && isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          poster="/assets/images/hero-placeholder.jpg"
        >
          <source 
            src="https://ceytiwiuidapmlzghlzo.supabase.co/storage/v1/object/public/videos/7308098-hd_1920_1080_24fps.mp4" 
            type="video/mp4" 
          />
        </video>
      </div>

      {/* Loading State */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/30 to-cream animate-pulse">
          <div className="h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-rose-gold border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Content Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent backdrop-blur-[2px]">
        <div className="container mx-auto h-full flex items-center px-4">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-fade-in-up">
              Timeless Elegance Crafted for You
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Discover our exquisite collection of handcrafted jewelry
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
