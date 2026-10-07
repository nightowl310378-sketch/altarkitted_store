import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Headset, Rocket, Users, Globe } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, index: number }> = ({ icon, title, desc, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay: index * 0.08 }}
    whileHover={{ y: -5 }}
    className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-pink-400/50 hover:shadow-[0_10px_40px_-15px_rgba(244,113,149,0.3)] transition-all"
  >
    <div className="w-12 h-12 rounded-2xl bg-pink-400/20 text-pink-300 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const WhyAltarkitted: React.FC = () => {
  const features = [
    { icon: <Zap size={24} />, title: 'Instant Delivery', desc: 'Your items are delivered to your Minecraft account immediately after payment.' },
    { icon: <Shield size={24} />, title: 'Secure Payments', desc: 'Encrypted transactions via world-class payment providers for total peace of mind.' },
    { icon: <Headset size={24} />, title: '24/7 Support', desc: 'Our dedicated support team is always available via Discord to help you out.' },
    { icon: <Rocket size={24} />, title: 'Regular Updates', desc: 'We constantly add new ranks, keys and features to keep the game fresh.' },
    { icon: <Users size={24} />, title: 'Built for Community', desc: 'Our features are designed based on player feedback and suggestions.' },
    { icon: <Globe size={24} />, title: 'Global Community', desc: 'Join thousands of players from around the world in one epic network.' },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            WHY <span className="text-gradient-accent">ALTARKITTED?</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide a premium experience for every player, ensuring the highest quality of service and support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => <FeatureCard key={i} index={i} {...f} />)}
        </div>
      </div>
    </section>
  );
};

export default WhyAltarkitted;
