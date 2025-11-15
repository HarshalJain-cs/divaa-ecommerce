import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem as FAQItemType } from '@/data/faqData';

interface FAQItemProps {
  faq: FAQItemType;
}

const FAQItem = ({ faq }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 px-2 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
        aria-expanded={isOpen}
      >
        <span className="text-base text-gray-800 group-hover:text-rose-gold-dark transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pb-4 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
