import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import ProductIcon from '../ui/ProductIcon';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1e1914] border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart size={24} className="text-pink-300" />
                Your Cart
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingCart size={64} className="text-gray-600" />
                  <p className="text-lg">Your cart is empty</p>
                  <button onClick={onClose} className="px-6 py-2 bg-pink-400 hover:bg-pink-300 rounded-full text-sm font-bold text-[#171a35] transition-colors">
                    Explore Store
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 group">
                    <ProductIcon product={item} iconSize={32} className="w-20 h-20 rounded-lg shrink-0" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-100">{item.name}</h3>
                          <p className="text-sm text-pink-300 font-bold">${item.price}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <div className="flex items-center bg-black/40 rounded-lg border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-pink-300 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-xs font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-pink-300 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-pink-400 to-indigo-400 hover:from-pink-300 hover:to-indigo-300 rounded-xl font-bold uppercase tracking-wide text-[#171a35] flex items-center justify-center gap-2 transition-all shadow-lg shadow-pink-400/20 group">
                  <CreditCard size={20} className="group-hover:scale-110 transition-transform" />
                  Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
