
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Slide {
  id: number;
  imageSrc: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    title: "Новая коллекция",
    subtitle: "Стильная и комфортная одежда для всей семьи",
    cta: "Смотреть коллекцию",
    link: "/catalog?category=new",
  },
  {
    id: 2,
    imageSrc: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1920&auto=format&fit=crop",
    title: "Сезонная распродажа",
    subtitle: "Скидки до 50% на выделенный ассортимент",
    cta: "Купить со скидкой",
    link: "/catalog?sale=true",
  },
  {
    id: 3,
    imageSrc: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1920&auto=format&fit=crop",
    title: "Премиум качество",
    subtitle: "Одежда из лучших материалов для комфорта и стиля",
    cta: "Перейти в премиум",
    link: "/catalog?category=premium",
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 h-full w-full"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].imageSrc})`,
              backgroundPosition: "center",
              backgroundSize: "cover"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          </div>
          
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="max-w-xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                {slides[currentSlide].subtitle}
              </p>
              <Link 
                to={slides[currentSlide].link}
                className="inline-flex items-center px-6 py-3 bg-white text-foreground font-medium rounded hover:bg-opacity-90 transition-colors group"
              >
                {slides[currentSlide].cta}
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-8 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
