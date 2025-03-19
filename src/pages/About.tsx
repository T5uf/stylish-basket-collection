
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { Users, Globe2, Award, MapPin, Phone, Mail } from 'lucide-react';
import TestimonialSection from '@/components/TestimonialSection';

const About = () => {
  return (
    <MainLayout>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">О компании ЭВРИКА</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Мы – команда профессионалов, уже более 10 лет поставляющая высококачественную одежду и обувь оптом по всей России.
          </p>
        </div>
        
        {/* Our story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-medium mb-6">Наша история</h2>
            <p className="text-foreground/90 mb-4">
              Компания «ЭВРИКА» начала свою деятельность в 2012 году как небольшой семейный бизнес. Мы начинали с продажи небольших партий одежды на местных рынках, но благодаря высокому качеству продукции и честным деловым отношениям быстро заслужили доверие клиентов.
            </p>
            <p className="text-foreground/90 mb-4">
              За годы работы мы выросли в крупную оптовую компанию, поставляющую одежду и обувь в магазины по всей России. Мы тщательно отбираем товары, сотрудничая только с проверенными производителями, чтобы гарантировать нашим клиентам лучшее качество.
            </p>
            <p className="text-foreground/90">
              Сегодня «ЭВРИКА» – это команда из более чем 50 профессионалов, современный склад площадью 3000 м² и тысячи довольных клиентов по всей стране.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
              alt="Команда ЭВРИКА" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">Наши ценности</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Основополагающие принципы, которыми мы руководствуемся в работе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">Клиентоориентированность</h3>
              <p className="text-foreground/80">
                Мы всегда ставим интересы клиента на первое место. Гибкие условия сотрудничества, персональный подход и поддержка на всех этапах работы.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">Качество</h3>
              <p className="text-foreground/80">
                Мы не экономим на качестве. Каждый товар проходит многоступенчатый контроль, чтобы вы получали только лучшее.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-primary/10 text-primary w-12 h-12 flex items-center justify-center rounded-full mb-6">
                <Globe2 size={24} />
              </div>
              <h3 className="text-xl font-medium mb-3">Развитие</h3>
              <p className="text-foreground/80">
                Мы постоянно развиваемся, следим за модными тенденциями и расширяем ассортимент, чтобы предложить вам актуальные товары.
              </p>
            </div>
          </div>
        </div>
        
        {/* Advantages */}
        <div className="mb-20">
          <div className="bg-muted rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <h2 className="text-3xl font-medium mb-6">Почему выбирают нас</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm mr-3 flex-shrink-0 mt-0.5">1</span>
                    <p className="text-foreground/90"><strong>Широкий ассортимент</strong> – более 5000 наименований одежды и обуви для всей семьи</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm mr-3 flex-shrink-0 mt-0.5">2</span>
                    <p className="text-foreground/90"><strong>Выгодные цены</strong> – работаем напрямую с производителями без посредников</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm mr-3 flex-shrink-0 mt-0.5">3</span>
                    <p className="text-foreground/90"><strong>Быстрая доставка</strong> – отправка заказа в течение 24 часов после оплаты</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm mr-3 flex-shrink-0 mt-0.5">4</span>
                    <p className="text-foreground/90"><strong>Гарантия качества</strong> – возможность возврата товара в течение 30 дней</p>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm mr-3 flex-shrink-0 mt-0.5">5</span>
                    <p className="text-foreground/90"><strong>Гибкие условия</strong> – индивидуальный подход к каждому клиенту</p>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=1974&auto=format&fit=crop" 
                  alt="Склад компании ЭВРИКА" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">Наши партнеры</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Мы гордимся сотрудничеством с ведущими брендами и производителями одежды
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 flex items-center justify-center h-24 sm:h-32">
                <div className="text-xl sm:text-2xl font-bold text-muted-foreground/30">ПАРТНЕР {i}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <TestimonialSection />
        
        {/* Contact Info */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">Контактная информация</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Свяжитесь с нами для получения дополнительной информации
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 text-primary w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Адрес</h3>
              <p className="text-foreground/80">г. Москва, ул. Примерная, д. 123</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 text-primary w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Телефон</h3>
              <p className="text-foreground/80">+7 (123) 456-7890</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-primary/10 text-primary w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">Email</h3>
              <p className="text-foreground/80">info@evrika-shop.ru</p>
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default About;
