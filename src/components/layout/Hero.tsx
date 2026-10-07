import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyIP = async () => {
    await navigator.clipboard.writeText('play.altarkitted.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        {/* Recovered hero wallpaper */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://wallpaperaccess.com/full/8084274.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Recovered hero overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, rgba(23, 19, 16, 0.3) 0%, rgba(23, 19, 16, 0.9) 100%), linear-gradient(to bottom, transparent, #131630)',
          }}
        />
        
        {/* Animated Glows */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.25, 0.4, 0.25],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-pink-400 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.1, 0.2, 0.1],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px]" 
        />

        {/* Particles simulation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => {
            const size = Math.random() * 3;
            return (
              <span
                key={i}
                className="particle"
                style={{
                  width: size,
                  height: size,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
            UPGRADE YOUR <br />
            <span className="text-gradient-accent">LEGACY.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Unlock exclusive ranks and crate keys on Altarkitted. 
            Forge your destiny in the most competitive realm.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a 
              href="#store"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-10 py-4 rounded-xl w-full sm:w-auto"
            >
              EXPLORE STORE
            </motion.a>
            <motion.a 
              href="https://discord.gg/qUH8vQeEAx"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10 w-full sm:w-auto"
            >
              JOIN THE SERVER
            </motion.a>
          </div>

          <div className="mt-16 inline-flex items-center gap-4 p-2 pr-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="px-4 py-2 bg-pink-400 rounded-full text-sm font-bold text-[#171a35]">
              IP: play.altarkitted.com
            </div>
            <button 
              onClick={copyIP}
              className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
            >
              {copied ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-1 text-green-400">
                  <Check size={14} /> Copied!
                </motion.div>
              ) : (
                <div className="flex items-center gap-1">
                  <Copy size={14} className="group-hover:text-pink-300 transition-colors" /> Copy
                </div>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
