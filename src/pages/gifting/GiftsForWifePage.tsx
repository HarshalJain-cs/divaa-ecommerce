import { Link } from 'react-router-dom';
import Header from '@/components/ui/Header';

const GiftsForWifePage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        <img
          src="https://www.giva.co/cdn/shop/files/Wife.webp?v=1761650231&width=750"
          alt="Gifts for Wife"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Gifts for Wife</h1>
            <p className="text-xl md:text-2xl text-slate-100">Celebrate Your Love Story</p>
          </div>
        </div>
      </div>

      {/* Products Coming Soon Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Products Coming Soon</h2>
          <p className="text-xl text-slate-600 mb-8">
            We're curating the perfect collection of gifts to express your love.
          </p>
          <p className="text-lg text-slate-500 mb-12">
            Beautiful silver jewelry pieces that she'll treasure forever.
          </p>
          <Link
            to="/collections/silver"
            className="inline-block bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors duration-300 text-lg font-semibold"
          >
            Explore Silver Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GiftsForWifePage;
