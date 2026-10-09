import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import ProductIcon from '../ui/ProductIcon';

interface UsernameModalProps {
  product: Product | null;
  onClose: () => void;
}

const MINECRAFT_USERNAME_RE = /^[a-zA-Z0-9_]{3,16}$/;

const UsernameModal: React.FC<UsernameModalProps> = ({ product, onClose }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tierIndex, setTierIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      const saved = localStorage.getItem('altarkitted_username');
      if (saved) setUsername(saved);
      setError('');
      setLoading(false);
      setTierIndex(0);
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const tiers = product?.priceTiers ?? [];
  const hasTiers = tiers.length > 0;
  const selectedTier = hasTiers ? tiers[Math.min(tierIndex, tiers.length - 1)] : undefined;
  const activePrice = selectedTier?.price ?? product?.price ?? 0;

  const handleCheckout = async () => {
    const name = username.trim();
    if (!MINECRAFT_USERNAME_RE.test(name)) {
      setError('Enter a valid Minecraft username (3-16 letters, numbers or underscores).');
      return;
    }
    const packageId = selectedTier?.tebexPackageId ?? product?.tebexPackageId;
    if (!packageId) {
      setError('This item is not available for checkout yet.');
      return;
    }
    setError('');
    setLoading(true);
    localStorage.setItem('altarkitted_username', name);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId, username: name }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error || 'Could not start checkout.');
      }
      window.location.href = data.checkoutUrl;
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[90] w-[calc(100%-2rem)] max-w-md"
          >
            <div className="glass-panel p-8 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-400/20 rounded-full blur-[80px] pointer-events-none" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>

              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <ProductIcon
                    product={product}
                    iconSize={28}
                    className="w-16 h-16 rounded-xl border border-white/10 shrink-0"
                  />
                  <div>
                    <h2 className="text-xl font-black text-white">ENTER YOUR USERNAME</h2>
                    <p className="text-sm text-pink-300 font-bold">
                      {product.name} — ${activePrice}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">
                  Your items will be delivered to this Minecraft account automatically after payment.
                </p>

                {hasTiers && (
                  <div className="mb-5">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">Quantity</p>
                    <div className="grid grid-cols-4 gap-2">
                      {tiers.map((tier, i) => (
                        <button
                          key={tier.label}
                          onClick={() => {
                            setTierIndex(i);
                            if (error) setError('');
                          }}
                          disabled={loading}
                          className={`py-2 rounded-lg border text-center transition-all ${
                            i === tierIndex
                              ? 'bg-pink-400 border-pink-300 text-[#171a35] shadow-lg shadow-pink-400/20'
                              : 'bg-black/40 border-white/10 text-gray-300 hover:border-pink-400/50'
                          }`}
                        >
                          <span className="block text-sm font-black">{tier.label}</span>
                          <span className="block text-xs font-bold opacity-80">${tier.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="relative mb-2">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={username}
                    onChange={e => {
                      setUsername(e.target.value);
                      if (error) setError('');
                    }}
                    onKeyDown={e => e.key === 'Enter' && handleCheckout()}
                    placeholder="Minecraft username"
                    maxLength={16}
                    disabled={loading}
                    className="w-full pl-11 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:border-pink-400 transition-all placeholder:text-gray-600"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-red-400 text-sm mb-3">
                    <AlertCircle size={15} />
                    <span>{error}</span>
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-4 mt-3 bg-gradient-to-r from-pink-400 to-indigo-400 hover:from-pink-300 hover:to-indigo-300 rounded-xl font-bold uppercase tracking-wide text-[#171a35] flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-400/20 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Preparing checkout...
                    </>
                  ) : (
                    <>
                      Continue to Checkout
                      <ExternalLink size={17} />
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Secure payment powered by Tebex
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UsernameModal;
