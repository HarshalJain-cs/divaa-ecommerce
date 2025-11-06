/**
 * @component TestimonialCard
 * @description Customer testimonial card with DIVA rose-gold theme
 */
import React from 'react';

interface TestimonialCardProps {
  name: string;
  text: string;
  imageUrl: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  text,
  imageUrl,
  rating = 5
}) => {
  return (
    <div className="bg-gradient-to-br from-cream via-off-white to-rose-gold/10 rounded-2xl p-10 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out">
      {/* Rating Stars */}
      {rating && (
        <div className="flex justify-center gap-1 mb-4">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${
                index < rating ? 'text-rose-gold-dark' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Customer Name */}
      <h3 className="text-2xl font-semibold mb-5 text-charcoal">
        {name}
      </h3>

      {/* Testimonial Text */}
      <p className="text-gray-600 leading-relaxed mb-8 min-h-[80px]">
        "{text}"
      </p>

      {/* Product Image */}
      <img
        src={imageUrl}
        alt={`Product loved by ${name}`}
        className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md object-cover"
      />
    </div>
  );
};

export default TestimonialCard;
