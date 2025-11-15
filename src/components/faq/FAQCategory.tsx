import { useState } from 'react';
import { Folder } from 'lucide-react';
import type { FAQCategory as FAQCategoryType } from '@/data/faqData';
import FAQItem from './FAQItem';

interface FAQCategoryProps {
  category: FAQCategoryType;
}

const FAQCategory = ({ category }: FAQCategoryProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedQuestions = showAll ? category.questions : category.questions.slice(0, 3);
  const hasMore = category.questions.length > 3;

  return (
    <div className="mb-8">
      {/* Category Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="mt-1">
          <Folder className="w-6 h-6 text-rose-gold-dark" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-charcoal mb-1">
            {category.title}
          </h3>
          <span className="text-sm text-gray-500">
            ({category.totalQuestions} {category.totalQuestions === 1 ? 'question' : 'questions'})
          </span>
        </div>
      </div>

      {/* FAQ Items */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {displayedQuestions.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>

      {/* View All Button */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 ml-9 text-rose-gold-dark hover:text-rose-gold font-medium text-sm transition-colors"
        >
          {showAll ? 'Show less' : `View all ${category.totalQuestions}`}
        </button>
      )}
    </div>
  );
};

export default FAQCategory;
