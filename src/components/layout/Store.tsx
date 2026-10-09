import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../../constants/products';
import { Category, Product } from '../../types';
import ProductIcon from '../ui/ProductIcon';

const ProductCard: React.FC<{ product: Product; onBuy: (product: Product) => void }> = ({ product, onBuy }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="glass-panel corner-cut group relative overflow-hidden transition-all duration-500 hover:border-pink-400/60"
    >
      {/* Badge */}
      {product.isPopular && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-pink-400 text-[10px] font-black rounded-md -skew-x-12 border-2 border-pink-200 text-[#171a35] uppercase tracking-widest shadow-lg shadow-pink-400/30">
          Most Popular
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <ProductIcon
          product={product}
          iconSize={72}
          className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131630] to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-pink-300 transition-colors">{product.name}</h3>
          <button 
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`transition-colors ${isWishlisted ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
          >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            {product.discountPrice && (
              <span className="text-xs text-gray-500 line-through">${product.discountPrice}</span>
            )}
            <span className="text-2xl font-black text-white">
              {product.priceTiers && <span className="text-sm font-bold text-gray-400 mr-1">from</span>}
              ${product.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onBuy(product)}
              className="btn-primary px-4 py-3 rounded-lg text-sm"
            >
              Buy Now
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => addToCart(product)}
              className="p-3 bg-white/5 hover:bg-pink-400 hover:text-[#171a35] rounded-lg text-white transition-all border-2 border-white/10 group-hover:border-pink-400"
            >
              <ShoppingCart size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Store: React.FC<{
  onBuy: (product: Product) => void;
  category: string;
  onCategoryChange: (category: string) => void;
}> = ({ onBuy, category, onCategoryChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const activeCategory = category;

  const filteredProducts = PRODUCTS.filter(p => {
    const categoryMatch = activeCategory === 'All' || p.category === activeCategory;
    const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <section id="store" className="py-24 relative isolate">
      {/* Section glow decorations */}
      <div className="absolute top-10 -left-20 w-[300px] h-[300px] rounded-full bg-pink-400 blur-[150px] opacity-10 -z-10 pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[300px] h-[300px] rounded-full blur-[150px] opacity-10 -z-10 pointer-events-none" style={{ background: '#f47195' }} />
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="kicker mb-4"
          >
            The Marketplace
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            THE ALTARKITTED <span className="text-gradient-accent">STORE</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Everything you need to stand above the rest. Premium ranks, upgrades and exclusive crate keys.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-pink-400 text-[#171a35] shadow-lg shadow-pink-400/30' 
                    : 'bg-[#0f1130] text-gray-400 hover:text-pink-300 border-2 border-white/10 hover:border-pink-400/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-72">
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 bg-[#0f1130] border-2 border-white/10 rounded-lg text-sm focus:outline-none focus:border-pink-400 transition-all"
            />
            <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map(product => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} onBuy={onBuy} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <p className="text-xl">No items found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Store;
