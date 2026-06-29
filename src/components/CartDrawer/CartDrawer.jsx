import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '../../config';
import './CartDrawer.css';

const formatPrice = (price) => {
  return typeof price === 'number' && price === 0 ? 'Custom' : typeof price === 'string' ? price : '₹' + price.toLocaleString('en-IN');
};

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, removeFromCart }) => {
  const subtotal = cart.reduce((sum, item) => {
    // If it's a fixed package like "$12k", we handle parsing if possible, or we just rely on numbers.
    // The previous cart items had numbers. Vault packages have string prices like "$12k".
    // I need to ensure Vault packages have a numeric price added, or calculate separately.
    let numericPrice = item.price;
    if (typeof item.price === 'string') {
      const clean = item.price.replace(/[^0-9.]/g, '');
      numericPrice = parseFloat(clean) * (item.price.includes('k') ? 1000 : 1);
    }
    return sum + (numericPrice * item.quantity);
  }, 0);
  
  const gst = subtotal * 0.18;
  const total = subtotal + gst;
  const hasCustomItems = cart.some(item => item.isCustom);

  const buildWhatsAppMessage = () => {
    let msg = `Hi Nexoresha,\n\nI am interested in the following services:\n\n`;
    cart.forEach(item => {
      msg += `• ${item.name} × ${item.quantity}\n`;
    });
    msg += `\nSubtotal: ₹${subtotal.toLocaleString('en-IN')}`;
    msg += `\nGST (18%): ₹${gst.toLocaleString('en-IN')}`;
    msg += `\nEstimated Budget: ₹${total.toLocaleString('en-IN')}`;
    if (hasCustomItems) msg += ` + Custom Priced Items`;
    msg += `\n\nPlease provide more information.`;
    return msg;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h3><ShoppingCart size={20} /> Service Cart</h3>
              <button className="cart-close-btn" onClick={onClose}><X size={20} /></button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart-msg">Your cart is empty.</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} className="cart-item">
                    <div>
                      <h4 className="cart-item-name">{item.name}</h4>
                      <div className="cart-item-price">{formatPrice(item.price)}</div>
                    </div>
                    
                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14}/></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14}/></button>
                      </div>
                      <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}><X size={18}/></button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-summary-row">
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="cart-summary-total">
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}{hasCustomItems ? ' +' : ''}</span>
              </div>
              
              <a 
                href={generateWhatsAppLink(buildWhatsAppMessage())}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-primary btn-whatsapp"
              >
                <MessageCircle size={20} /> Discuss On WhatsApp
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
