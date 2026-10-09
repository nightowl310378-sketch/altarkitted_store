import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Copy, Check, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC<{ onCategory?: (category: string) => void }> = ({ onCategory }) => {
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyIP = async () => {
    await navigator.clipboard.writeText('play.altarkitted.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const navLinks = [
    { name: 'Store', href: '#store', category: 'All' },
    { name: 'Ranks', href: '#ranks', category: 'Ranks' },
    { name: 'Upgrades', href: '#store', category: 'Rank Upgrades' },
    { name: 'Keys', href: '#store', category: 'Keys' },
    { name: 'Support', href: '#support' },
  ];

  const handleNav = (link: typeof navLinks[number]) => {
    setMobileMenuOpen(false);
    if (link.category && onCategory) onCategory(link.category);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-3 bg-[#131630]/90 backdrop-blur-lg border-b-2 border-pink-400/20' : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <img
            src="/assets/images/logo.webp"
            alt="Altarkitted logo"
            className="w-10 h-10 object-cover rounded-lg shadow-lg shadow-pink-400/30 border-2 border-pink-400/30 group-hover:scale-110 transition-transform"
          />
          <span className="text-2xl font-black tracking-tighter text-white">
            ALTAR<span className="text-pink-300">KITTED</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => handleNav(link)}
              className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-pink-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div 
            onClick={copyIP}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#0f1130] border-2 border-indigo-400/25 hover:border-pink-400/50 transition-all cursor-pointer group"
          >
            <span className="text-xs font-mono text-gray-300">play.altarkitted.com</span>
            <div className="relative">
              {isCopied ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400">
                  <Check size={16} />
                </motion.div>
              ) : (
                <Copy size={16} className="text-gray-400 group-hover:text-pink-300 transition-colors" />
              )}
            </div>
          </div>

          <div className="relative p-2 rounded-full hover:bg-white/5 cursor-pointer transition-colors">
            <ShoppingCart size={20} className="text-gray-300" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-pink-400 text-[10px] font-bold flex items-center justify-center rounded-full text-[#171a35]">
                {cartCount}
              </span>
            )}
          </div>
          <div className="p-2 rounded-full hover:bg-white/5 cursor-pointer transition-colors">
            <User size={20} className="text-gray-300" />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0f1130] border-b-2 border-indigo-400/20 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map(link => (
                <a key={link.name} href={link.href} className="text-base font-black uppercase tracking-widest text-gray-300 hover:text-pink-300" onClick={() => handleNav(link)}>
                  {link.name}
                </a>
              ))}
              <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-sm font-mono">play.altarkitted.com</span>
                  <button onClick={copyIP} className="p-2 bg-pink-400 rounded-lg text-[#171a35]">
                    {isCopied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
