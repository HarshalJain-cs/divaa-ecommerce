/**
 * @page WeddingPage
 * @description Wedding jewelry collection page with golden & blue theme
 */
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, Volume2, VolumeX } from 'lucide-react';
import Header from '@/components/ui/Header';

const WeddingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Wedding collection slides - inspired by Novel Jewels
  const weddingCollections = [
    {
      id: 1,
      title: 'The Polki Bride',
      description: 'Where deep magenta meets timeless polki',
      mainImage: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Polkimain',
      secondaryImage: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/BridalPolki',
      link: '/wedding/polki-bride',
    },
    {
      id: 2,
      title: 'The Gold Bride',
      description: 'Featuring intricately layered gold silhouettes perfect for a regal look',
      mainImage: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Redmain',
      secondaryImage: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Red',
      link: '/wedding/gold-bride',
    },
    {
      id: 3,
      title: 'Sangeet Look',
      description: 'A captivating blend of polki, diamond, and created Russian emerald stone',
      mainImage: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Sangeetmain',
      secondaryImage: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Sangeet',
      link: '/wedding/sangeet-look',
    },
    {
      id: 4,
      title: 'Reception Look',
      description: 'A celebration of diamonds and beautiful gemstones in a Victorian-style design',
      mainImage: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Reception-main',
      secondaryImage: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Reception',
      link: '/wedding/reception-look',
    },
  ];

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % weddingCollections.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [weddingCollections.length]);

  // Wedding categories
  const weddingCategories = [
    { name: 'Polki Bride', image: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/BridalPolki', link: '/wedding/polki-bride' },
    { name: 'Gold Bride', image: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Red', link: '/wedding/gold-bride' },
    { name: 'Sangeet Collection', image: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Sangeet', link: '/wedding/sangeet-collection' },
    { name: 'Reception Collection', image: 'https://s7ap1.scene7.com/is/image/noveljewelsprod/Reception', link: '/wedding/reception-collection' },
    { name: 'Haldi Collection', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop', link: '/wedding/haldi-collection' },
    { name: 'Mehandi Collection', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop', link: '/wedding/mehandi-collection' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % weddingCollections.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? weddingCollections.length - 1 : prev - 1
    );
  };

  return (
    <>
      <Header />
      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #1F2B8F 0%, #D5B038 100%)' }}>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Video Background */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="https://cdn.shopify.com/videos/c/o/v/8fce3ce1e77d429d96ad5e0a5b0ec3c6.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10 z-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-30 p-3 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-lg transition-all hover:scale-110"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" style={{ color: '#1F2B8F' }} />
            ) : (
              <Volume2 className="w-5 h-5" style={{ color: '#1F2B8F' }} />
            )}
          </button>

          <div className="container mx-auto px-4 relative z-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full shadow-md text-sm font-medium text-white mb-6">
                <Sparkles className="w-4 h-4" />
                Exclusive Wedding Collection
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-2xl">
                Bridal Elegance
              </h1>
              <p className="text-2xl md:text-3xl text-white/95 mb-4 drop-shadow-lg">
                Curated Wedding Jewelry Collection
              </p>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-16 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12 text-white">
              Explore Our Wedding Looks
            </h2>

            <div className="relative max-w-6xl mx-auto">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {weddingCollections.map((collection) => (
                    <div
                      key={collection.id}
                      className="min-w-full relative"
                      style={{ height: '350px' }}
                    >
                      {/* Main Image */}
                      <div className="absolute inset-0">
                        <img
                          src={collection.mainImage}
                          alt={collection.title}
                          className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      </div>

                      {/* Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                        <div className="max-w-2xl">
                          <span className="text-6xl font-serif font-bold mb-2 block">
                            {String(collection.id).padStart(2, '0')}
                          </span>
                          <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            {collection.title}
                          </h3>
                          <p className="text-lg mb-6 text-white/90">
                            {collection.description}
                          </p>
                          <Link
                            to={collection.link}
                            className="inline-block px-8 py-3 rounded-lg font-medium transition-all hover:opacity-90"
                            style={{
                              background: 'linear-gradient(135deg, #1F2B8F, #D5B038)',
                              color: 'white'
                            }}
                          >
                            Explore
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" style={{ color: '#1F2B8F' }} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" style={{ color: '#1F2B8F' }} />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {weddingCollections.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentSlide === index
                          ? 'w-8 bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4" style={{ color: '#1F2B8F' }}>
              Shop by Collection
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Find the perfect jewelry for every wedding occasion
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {weddingCategories.map((category, index) => (
                <Link
                  key={index}
                  to={category.link}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  style={{ aspectRatio: '1/1' }}
                >
                  {/* Category Image */}
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-60 group-hover:opacity-70 transition-opacity"
                    style={{ background: 'linear-gradient(135deg, rgba(31, 43, 143, 0.6), rgba(213, 176, 56, 0.6))' }}
                  ></div>

                  {/* Category Name */}
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <h3 className="text-white font-bold text-center text-sm md:text-base drop-shadow-lg">
                      {category.name}
                    </h3>
                  </div>

                  {/* Circular Border Effect */}
                  <div className="absolute inset-2 border-2 border-white/30 rounded-xl"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" style={{ background: 'linear-gradient(135deg, #1F2B8F 0%, #D5B038 100%)' }}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Make Your Special Day Memorable
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book a personalized consultation with our wedding jewelry experts
            </p>
            <Link
              to="/coming-soon"
              className="inline-block px-10 py-4 bg-white rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              style={{ color: '#1F2B8F' }}
            >
              Book Consultation
            </Link>
            <p className="text-white/75 text-sm mt-4">
              Coming soon with our wedding collection launch
            </p>
          </div>
        </section>

        {/* Footer Note */}
        <section className="py-12 bg-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/90 text-lg mb-4">
              Stay tuned for our exclusive bridal jewelry collection
            </p>
            <div className="flex justify-center gap-6">
              <Link
                to="/collections/gold"
                className="text-white hover:text-yellow-200 font-medium underline"
              >
                Shop Gold Jewelry
              </Link>
              <Link
                to="/collections/silver"
                className="text-white hover:text-gray-200 font-medium underline"
              >
                Shop Silver Jewelry
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WeddingPage;
