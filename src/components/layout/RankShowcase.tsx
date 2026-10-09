import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Headset, Rocket, Users } from 'lucide-react';
import { PRODUCTS } from '../../constants/products';
import { Product } from '../../types';
import ProductIcon from '../ui/ProductIcon';

const RankCard: React.FC<{ rank: Product; onBuy: (product: Product) => void; index: number }> = ({ rank, onBuy, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`corner-cut relative p-8 rounded-2xl border-2 transition-all duration-500 ${
        rank.isPopular 
          ? 'bg-gradient-to-b from-[#2a1f52] to-[#131630] border-pink-400 shadow-[0_0_50px_rgba(244,113,149,0.35)]' 
          : 'bg-[#0f1130]/80 border-indigo-400/20 hover:border-indigo-400/60'
      }`}
    >
      {rank.isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-pink-400 text-[#171a35] text-xs font-black rounded-md -skew-x-12 border-2 border-pink-200 uppercase shadow-lg shadow-pink-400/30">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-8">
        <ProductIcon
          product={rank}
          iconSize={40}
          className="w-20 h-20 mx-auto rounded-2xl mb-4 shadow-lg border-2 border-white/10"
        />
        <h3 className="text-3xl font-black text-white mb-2">{rank.name}</h3>
        <div className="text-4xl font-black text-white mb-6 font-display">${rank.price}</div>
      </div>

      <ul className="space-y-4 mb-10">
        {rank.perks?.map((perk: string, i: number) => (
          <li key={i} className="flex items-center gap-3 text-gray-400 text-sm">
            <Check size={16} className="text-pink-300" />
            {perk}
          </li>
        ))}
      </ul>

      <button 
        onClick={() => onBuy(rank)}
        className={`w-full py-4 rounded-lg transition-all ${
        rank.isPopular 
          ? 'btn-primary' 
          : 'btn-ghost'
      }`}>
        Purchase Rank
      </button>
    </motion.div>
  );
};

const RankShowcase: React.FC<{ onBuy: (product: Product) => void }> = ({ onBuy }) => {
  const ranks = PRODUCTS.filter(p => p.category === 'Ranks');

  return (
    <section id="ranks" className="py-24 relative isolate">
      {/* Center glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-400 blur-[150px] opacity-10 -z-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span className="kicker">Ranks &amp; Upgrades</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            ASCEND TO <span className="text-gradient-accent">GREATNESS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose your tier and unlock a new level of power. From MVP to Custom Rank, your legacy starts here.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ranks.map((rank, i) => (
            <RankCard key={rank.id} rank={rank} onBuy={onBuy} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RankShowcase;
