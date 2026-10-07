import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, MessageSquare } from 'lucide-react';

const FAQItem: React.FC<{ question: string, answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">{question}</span>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-500"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-400 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const questions = [
    { 
      question: 'How do I receive my purchase?', 
      answer: 'Once your payment is confirmed, the items or rank are automatically applied to your Minecraft account. Make sure you provide the correct username during checkout!' 
    },
    { 
      question: 'How long does delivery take?', 
      answer: 'Delivery is typically instant. In rare cases, it may take up to 15 minutes. If you don\'t receive your items, please contact support.' 
    },
    { 
      question: 'What payment methods are supported?', 
      answer: 'We support all major credit cards, PayPal, and various regional payment methods through our secure provider.' 
    },
    { 
      question: 'Can I gift a rank?', 
      answer: 'Yes! During the checkout process, you can specify the username of the player you would like to gift the rank to.' 
    },
    { 
      question: 'Are purchases refundable?', 
      answer: 'Due to the nature of digital goods, all purchases are final. Please review the perks carefully before buying.' 
    },
    { 
      question: 'What happens if I don\'t receive my item?', 
      answer: 'First, try relogging into the server. If the item still hasn\'t appeared, open a ticket in our Discord support channel.' 
    },
    { 
      question: 'How do I contact support?', 
      answer: 'The best way to reach us is via our official Discord server. Head over to the #support channel for assistance.' 
    },
  ];

  return (
    <section id="support" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            QUESTIONS? <span className="text-gradient-accent">ANSWERS.</span>
          </h2>
          <p className="text-gray-400">
            Everything you need to know about the Altarkitted store.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-panel p-8"
        >
          {questions.map((q, i) => <FAQItem key={i} {...q} />)}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
