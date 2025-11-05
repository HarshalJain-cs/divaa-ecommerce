/**
 * @component Breadcrumbs
 * @description Navigation breadcrumbs for better user orientation
 */
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          {/* Home Link */}
          <li>
            <Link
              to="/"
              className="flex items-center text-gray-500 hover:text-rose-pink transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>

          {/* Breadcrumb Items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center space-x-2">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {isLast || !item.href ? (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                ) : (
                  <Link
                    to={item.href}
                    className="text-gray-500 hover:text-rose-pink transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
