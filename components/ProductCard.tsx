import React from 'react';
import { Product, ProductType } from '../types';
import CodeIcon from './icons/CodeIcon';
import PencilIcon from './icons/PencilIcon';
import WorkflowIcon from './icons/WorkflowIcon';
import HighlightMatch from './HighlightMatch';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  activeTags?: string[];
  searchQuery: string;
}

const ProductTypeIcon: React.FC<{ type: ProductType }> = ({ type }) => {
  const iconProps = { className: "w-6 h-6 text-primary-400" };
  switch (type) {
    case ProductType.AGENT:
      return <PencilIcon {...iconProps} />;
    case ProductType.AUTOMATION:
      return <CodeIcon {...iconProps} />;
    case ProductType.WORKFLOW:
      return <WorkflowIcon {...iconProps} />;
    default:
      return null;
  }
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, activeTags = [], searchQuery }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(product);
    }
  };

  return (
    <div
      className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-primary-500/30 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
      onClick={() => onSelect(product)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
    >
      <div className="relative h-48 overflow-hidden">
        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3">
          <div className="font-bold text-lg text-slate-100 mb-1 group-hover:text-primary-400 transition-colors">
             <HighlightMatch text={product.name} highlight={searchQuery} />
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-2">
          <HighlightMatch text={product.description} highlight={searchQuery} />
        </p>

        <div className="mt-auto flex justify-between items-end">
             <div className="flex flex-wrap gap-2">
              {product.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md ${
                    activeTags.includes(tag)
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'bg-slate-700/50 text-slate-400'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

             <span className="text-lg font-semibold text-slate-100">
                ${product.price.toFixed(2)}
                {product.id.startsWith('ret-') && <span className="text-xs text-slate-500 font-normal ml-1">/mo</span>}
             </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;