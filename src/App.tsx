import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { Product } from './types';
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import Store from './components/layout/Store';
import RankShowcase from './components/layout/RankShowcase';
import WhyAltarkitted from './components/layout/WhyAltarkitted';
import FAQ from './components/layout/FAQ';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';
import UsernameModal from './components/layout/UsernameModal';
import './styles/globals.css';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutProduct, setCheckoutProduct] = useState<Product | null>(null);
  const [storeCategory, setStoreCategory] = useState('All');

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#131630] text-white selection:bg-pink-400 selection:text-white">
        <Navbar onCategory={setStoreCategory} />
        
        <main>
          <Hero />
          
          {/* Stats Strip */}
          <div className="relative z-10 py-12 border-y-2 border-indigo-400/15 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Players', value: '50K+' },
                { label: 'Uptime', value: '99.9%' },
                { label: 'Online', value: '24/7' },
                { label: 'Community', value: 'Global' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black text-white mb-1 font-display">{stat.value}</div>
                  <div className="text-xs font-bold text-pink-300 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <Store onBuy={setCheckoutProduct} category={storeCategory} onCategoryChange={setStoreCategory} />
          <RankShowcase onBuy={setCheckoutProduct} />
          
          {/* Community CTA */}
          <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/50 to-indigo-950/50" />
            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-black text-white mb-6"
              >
                BE PART OF <span className="text-gradient-accent">SOMETHING BIGGER.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-400 mb-12 max-w-2xl mx-auto text-lg"
              >
                Join thousands of players building their legacy on Altarkitted. Experience the most advanced network in the game.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <a
                  href="https://discord.gg/qUH8vQeEAx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-10 py-4 rounded-lg w-full sm:w-auto"
                >
                  JOIN DISCORD
                </a>
                <button className="btn-ghost px-10 py-4 rounded-lg w-full sm:w-auto">
                  PLAY NOW
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="mt-16 p-6 rounded-xl bg-[#0f1130]/80 border-2 border-indigo-400/25 backdrop-blur-md max-w-md mx-auto flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#5865F2] rounded-2xl flex items-center justify-center text-white font-bold">
                    D
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold">Official Discord</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      12,402 Online
                    </div>
                  </div>
                </div>
                <a
                  href="https://discord.gg/qUH8vQeEAx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-all"
                >
                  Join
                </a>
              </motion.div>
            </div>
          </section>

          <WhyAltarkitted />
          <FAQ />
        </main>

        <Footer />
        
        {/* Cart Trigger - Needs to be connected to Navbar for full functionality */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 right-8 z-40 p-4 bg-pink-400 text-[#171a35] rounded-xl border-2 border-pink-200 shadow-[0_5px_0_#9d0f4f] hover:scale-110 hover:-translate-y-0.5 transition-all"
        >
          <ShoppingCart size={24} />
        </button>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <UsernameModal product={checkoutProduct} onClose={() => setCheckoutProduct(null)} />
      </div>
    </CartProvider>
  );
};

export default App;
