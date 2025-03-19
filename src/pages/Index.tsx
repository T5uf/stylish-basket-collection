
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import TestimonialSection from '@/components/TestimonialSection';
import { getNewProducts, getSaleProducts } from '@/data/products';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const newProducts = getNewProducts().slice(0, 4);
  const saleProducts = getSaleProducts().slice(0, 4);
  
  return (
    <MainLayout>
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CategorySection />
        
        <FeaturedProducts 
          title="Новинки" 
          subtitle="Последние поступления в нашем каталоге"
          products={newProducts}
          link="/catalog?new=true"
        />
        
        {/* Promo Banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-lg bg-primary text-primary-foreground">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20" 
              style={{ 
                backgroundImage: `url(https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2071&auto=format&fit=crop)` 
              }} 
            />
            <div className="relative z-10 py-12 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Скидки до 50%
                </h2>
                <p className="text-lg md:text-xl opacity-90 mb-6 max-w-xl">
                  Успейте приобрести качественную одежду по выгодным ценам. Специальное предложение действует только до конца месяца!
                </p>
                <a 
                  href="/catalog?sale=true" 
                  className="inline-flex items-center px-6 py-3 bg-white text-primary font-medium rounded hover:bg-opacity-90 transition-colors group"
                >
                  Смотреть предложения
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <div className="w-full md:w-auto">
                <div className="text-7xl md:text-8xl font-bold">
                  -50%
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedProducts 
          title="Специальные предложения" 
          subtitle="Товары со скидкой для наших клиентов"
          products={saleProducts}
          link="/catalog?sale=true"
        />
        
        <TestimonialSection />
        
        {/* Newsletter */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-muted rounded-lg p-8 md:p-12">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-medium tracking-tight mb-4">
                Подпишитесь на нашу рассылку
              </h2>
              <p className="text-muted-foreground mb-8">
                Будьте в курсе новинок, акций и специальных предложений
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Ваш email" 
                  className="flex-1 min-w-0 px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  Подписаться
                </button>
              </form>
            </div>
          </div>
        </section>
      </motion.div>
    </MainLayout>
  );
};

export default Index;
