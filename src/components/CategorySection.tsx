
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

const categories: Category[] = [
  {
    id: "men",
    name: "Мужская одежда",
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1074&auto=format&fit=crop",
    link: "/catalog?category=men",
  },
  {
    id: "women",
    name: "Женская одежда",
    image: "https://images.unsplash.com/photo-1576185850736-f169c1662320?q=80&w=1074&auto=format&fit=crop",
    link: "/catalog?category=women",
  },
  {
    id: "kids",
    name: "Детская одежда",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1072&auto=format&fit=crop",
    link: "/catalog?category=kids",
  },
  {
    id: "shoes",
    name: "Обувь",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1064&auto=format&fit=crop",
    link: "/catalog?category=shoes",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-medium tracking-tight mb-4">Категории</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Выберите категорию, чтобы найти именно то, что вам нужно
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {categories.map((category) => (
          <motion.div key={category.id} variants={item}>
            <Link 
              to={category.link}
              className="group relative block h-80 overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/0 flex items-end p-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {category.name}
                  </h3>
                  <span className="inline-block text-sm text-white/80 border-b border-white/80 group-hover:border-white transition-colors">
                    Смотреть все
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CategorySection;
