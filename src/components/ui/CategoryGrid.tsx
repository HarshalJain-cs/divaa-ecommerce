/**
 * @component CategoryGrid
 * @description Display product categories in a grid layout
 */
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Rings',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop',
    itemCount: 125,
    slug: 'rings',
  },
  {
    id: 2,
    name: 'Necklaces',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
    itemCount: 89,
    slug: 'necklaces',
  },
  {
    id: 3,
    name: 'Earrings',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
    itemCount: 156,
    slug: 'earrings',
  },
  {
    id: 4,
    name: 'Bracelets',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
    itemCount: 67,
    slug: 'bracelets',
  },
  {
    id: 5,
    name: 'Pendants',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop',
    itemCount: 94,
    slug: 'pendants',
  },
  {
    id: 6,
    name: 'Bangles',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop',
    itemCount: 78,
    slug: 'bangles',
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our curated collections of fine jewelry
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
              <Link
                  key={category.id}
                  to={`/products?category=${category.slug}`}
                  className="category-card group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Category Image with Zoom Effect */}
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay - Darkens on hover */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
                        group-hover:from-black/95 group-hover:via-black/60 transition-all duration-300"
                    />

                    {/* Category Info - Slides up on hover */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 p-4 text-white z-10 
                        transform translate-y-0 group-hover:-translate-y-2 transition-all duration-300"
                    >
                      <h3 
                        className="text-base md:text-lg font-bold mb-1 
                          drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                          group-hover:text-rose-pink-light transition-colors duration-300"
                      >
                        {category.name}
                      </h3>
                      <p 
                        className="text-xs md:text-sm text-white/90 
                          drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]
                          opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {category.itemCount} Items
                      </p>
                    </div>

                    {/* Decorative shine effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div 
                        className="absolute top-0 -left-full h-full w-1/2 
                          bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          skew-x-12 group-hover:left-full transition-all duration-1000"
                      />
                    </div>
                  </div>
                </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
