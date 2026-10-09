import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0d0f24] pt-20 pb-10">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 via-indigo-400 to-pink-400" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <img
                src="/assets/images/logo.webp"
                alt="Altarkitted logo"
                className="w-8 h-8 object-cover rounded-lg border-2 border-pink-400/30"
              />
              <span className="text-xl font-black tracking-tighter text-white">
                ALTAR<span className="text-pink-300">KITTED</span>
              </span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Forge your legacy. The ultimate destination for competitive Minecraft players.
            </p>
            <div className="flex gap-4">
              {['Discord', 'YouTube', 'X', 'TikTok'].map(social => (
                <a
                  key={social}
                  href={social === 'Discord' ? 'https://discord.gg/qUH8vQeEAx' : '#'}
                  target={social === 'Discord' ? '_blank' : undefined}
                  rel={social === 'Discord' ? 'noopener noreferrer' : undefined}
                  className="w-10 h-10 rounded-lg bg-white/5 border-2 border-white/10 flex items-center justify-center text-gray-400 hover:text-[#171a35] hover:bg-pink-400 hover:border-pink-300 transition-all"
                >
                  <span className="sr-only">{social}</span>
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Store</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#store" className="hover:text-pink-300 transition-colors">All Products</a></li>
              <li><a href="#ranks" className="hover:text-pink-300 transition-colors">Premium Ranks</a></li>
              <li><a href="#store" className="hover:text-pink-300 transition-colors">Crate Keys</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Company</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-pink-300 transition-colors">About Us</a></li>
              <li><a href="#support" className="hover:text-pink-300 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Legal</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-pink-300 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors">EULA</a></li>
              <li><a href="#" className="hover:text-pink-300 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-gray-500 text-sm">
          © 2026 Altarkitted. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
