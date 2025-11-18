import { Link } from 'react-router-dom';

export function StyleGrid() {
  return (
    <section className="py-12 bg-gradient-to-br from-off-white to-cream">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {/* Column 1 - Everyday & Traditional */}
          <div className="grid grid-rows-2 gap-4 md:gap-6">
            <Link to="/collections/style-everyday" className="block overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="//www.giva.co/cdn/shop/files/1_16_317a7922-6e8c-43f3-a106-4cebb0761a41.webp?v=1758903175&width=900"
                alt="Everyday Style"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </Link>
            <Link to="/collections/style-traditional" className="block overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="//www.giva.co/cdn/shop/files/2_13_1.webp?v=1758903175&width=900"
                alt="Traditional Style"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Column 2 - Party (Tall) */}
          <div className="md:row-span-2">
            <Link to="/collections/style-party" className="block overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <img
                src="//www.giva.co/cdn/shop/files/3_7.webp?v=1758903176&width=900"
                alt="Party Style"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Column 3 - Gift Cards & Office */}
          <div className="grid grid-rows-2 gap-4 md:gap-6">
            <Link to="/gift-cards" className="block overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="//www.giva.co/cdn/shop/files/5_7.webp?v=1758903272&width=900"
                alt="Gift Cards"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </Link>
            <Link to="/collections/style-office" className="block overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="//www.giva.co/cdn/shop/files/7_3.webp?v=1758903267&width=900"
                alt="Office Style"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Column 4 - Gifts (Tall) */}
          <div className="md:row-span-2">
            <Link to="/collections/gifts-for-friends" className="block overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <img
                src="//www.giva.co/cdn/shop/files/6_8.webp?v=1758903271&width=900"
                alt="Gifts for Friends"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
