
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { motion } from 'framer-motion';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name || !formState.email || !formState.message) {
      toast.error("Пожалуйста, заполните все обязательные поля");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.");
      setFormState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <MainLayout>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium tracking-tight mb-4">Свяжитесь с нами</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            У вас есть вопросы о нашей продукции или условиях сотрудничества? Мы всегда готовы помочь!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-medium mb-6">Контактная информация</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPin size={20} className="text-primary mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Адрес</p>
                  <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 123</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone size={20} className="text-primary mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Телефон</p>
                  <p className="text-muted-foreground">+7 (123) 456-7890</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail size={20} className="text-primary mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@evrika-shop.ru</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={20} className="text-primary mr-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Режим работы</p>
                  <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                  <p className="text-muted-foreground">Сб: 10:00 - 15:00</p>
                  <p className="text-muted-foreground">Вс: выходной</p>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-muted rounded-lg overflow-hidden h-64 md:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.347142325868!2d37.62165037634312!3d55.75362997986023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1629893292687!5m2!1sru!2sru"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                title="Карта"
              ></iframe>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-medium mb-6">Напишите нам</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Имя <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="Введите ваш email"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={handleChange}
                    placeholder="Введите ваш телефон"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Сообщение <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Введите ваше сообщение"
                    rows={5}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-md flex items-center justify-center font-medium transition-all ${
                    isSubmitting
                      ? 'bg-primary/90 text-primary-foreground animate-pulse'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                  <Send size={16} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium mb-4">Часто задаваемые вопросы</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Здесь вы найдете ответы на самые популярные вопросы
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-3">Каковы минимальные объемы заказа?</h3>
              <p className="text-foreground/80">
                Минимальная сумма заказа составляет 20 000 рублей. При заказе от 50 000 рублей предоставляются дополнительные скидки.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-3">Как организована доставка?</h3>
              <p className="text-foreground/80">
                Мы осуществляем доставку по всей России через транспортные компании СДЭК, ПЭК, Деловые Линии. Сроки доставки зависят от региона и составляют от 1 до 7 дней.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-3">Возможен ли возврат товара?</h3>
              <p className="text-foreground/80">
                Да, мы принимаем возврат товара в течение 30 дней с момента получения при условии сохранения товарного вида, бирок и упаковки. Стоимость обратной доставки оплачивается покупателем.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium mb-3">Какие условия оплаты?</h3>
              <p className="text-foreground/80">
                Мы работаем по предоплате. Для постоянных клиентов возможна отсрочка платежа до 14 дней. Оплата производится по безналичному расчету.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Contact;
