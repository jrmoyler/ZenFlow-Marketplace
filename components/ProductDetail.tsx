import React, { useState } from 'react';
import { Product } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';
import SparklesIcon from './icons/SparklesIcon';
import XIcon from './icons/XIcon';
import TestChamber from './TestChamber';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack }) => {
  const [showTestChamber, setShowTestChamber] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handleBuy = () => {
      setShowPurchaseModal(true);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in relative">
      {/* Purchase Modal */}
      {showPurchaseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-fade-in-down">
                  <button
                      onClick={() => setShowPurchaseModal(false)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                      aria-label="Close modal"
                  >
                      <XIcon className="w-6 h-6" />
                  </button>
                  <div className="text-center">
                      <div className="bg-primary-500/20 text-primary-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Purchase Successful!</h3>
                      <p className="text-slate-300 mb-6 leading-relaxed">
                          Thank you for purchasing <span className="text-primary-400 font-semibold">{product.name}</span>.
                          A confirmation email has been sent to you with the next steps.
                      </p>
                      <button
                          onClick={() => setShowPurchaseModal(false)}
                          className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-lg shadow-primary-500/20"
                      >
                          Continue Shopping
                      </button>
                  </div>
              </div>
          </div>
      )}

      <button
        onClick={onBack}
        className="flex items-center text-sm text-slate-400 hover:text-primary-400 transition-colors mb-6 group"
      >
        <ArrowLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </button>

      <div className="bg-slate-800/50 rounded-xl shadow-2xl overflow-hidden border border-slate-700">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-64 w-full object-cover md:w-64" src={product.imageUrl} alt={product.name} />
          </div>
          <div className="p-8 flex flex-col justify-between">
            <div>
              <div className="uppercase tracking-wide text-xs text-primary-400 font-bold mb-2">{product.type}</div>
              <h1 className="block mt-1 text-4xl leading-tight font-bold text-slate-100">{product.name}</h1>
              <p className="mt-2 text-slate-400 text-lg">by {product.author}</p>
            </div>
            <div className="mt-4">
                 <span className="text-4xl font-bold text-slate-100">
                    ${product.price.toFixed(2)}
                    {product.id.startsWith('ret-') && <span className="text-xl font-normal text-slate-400">/month</span>}
                 </span>
            </div>
          </div>
        </div>
        <div className="p-8">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">About this {product.type}</h2>
            <p className="text-slate-300 leading-relaxed">{product.longDescription}</p>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                        <span key={tag} className="bg-slate-700 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700 flex flex-wrap gap-4">
                 <button
                    onClick={() => setShowTestChamber(!showTestChamber)}
                    aria-expanded={showTestChamber}
                    aria-controls="test-chamber-section"
                    className="flex-1 min-w-[180px] flex items-center justify-center bg-slate-700 text-slate-200 font-bold py-3 px-6 rounded-lg hover:bg-slate-600 transition-colors duration-300"
                >
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {showTestChamber ? 'Hide Test Chamber' : 'Test Agent'}
                </button>
                <button
                    onClick={handleBuy}
                    className="flex-1 min-w-[180px] bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-500 transition-colors duration-300 animate-glow"
                >
                    Buy Now
                </button>
            </div>
            <div id="test-chamber-section" className="transition-all duration-500">
                {showTestChamber && <TestChamber systemInstruction={product.systemInstruction} initialPrompt={product.testPrompt} />}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;