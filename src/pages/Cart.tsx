
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import CartItem from '@/components/CartItem';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Truck, CreditCard, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      navigate('/checkout');
      setIsProcessing(false);
    }, 1000);
  };
  
  return (
    <MainLayout>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-medium mb-8">Корзина</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-6">
              <ShoppingBag size={24} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-4">Ваша корзина пуста</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Похоже, вы еще не добавили товары в корзину. Начните с просмотра нашего каталога.
            </p>
            <Link 
              to="/catalog" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded hover:bg-primary/90 transition-colors"
            >
              Перейти в каталог
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium">
                    Товары ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                  </h2>
                  <button 
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Очистить корзину
                  </button>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <CartItem key={`${item.id}-${item.size}-${item.color}`} item={item} />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-6">Сумма заказа</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Стоимость товаров</span>
                    <span>{getCartTotal().toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{getCartTotal() >= 5000 ? 'Бесплатно' : '350 ₽'}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Итого</span>
                    <span>
                      {(getCartTotal() + (getCartTotal() >= 5000 ? 0 : 350)).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full py-3 px-6 rounded-md flex items-center justify-center font-medium transition-all ${
                    isProcessing
                      ? 'bg-primary/90 text-primary-foreground animate-pulse'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {isProcessing ? 'Обработка...' : 'Оформить заказ'}
                  <ArrowRight size={16} className="ml-2" />
                </button>
                
                {/* Additional Info */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start">
                    <Truck size={18} className="text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Бесплатная доставка при заказе от 5000 ₽
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CreditCard size={18} className="text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Безопасная оплата картой или наличными при получении
                    </p>
                  </div>
                  <div className="flex items-start">
                    <ShieldCheck size={18} className="text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      30 дней на возврат или обмен товара
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Cart;
