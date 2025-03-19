
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { ArrowRight } from "lucide-react";

interface FeaturedProductsProps {
  title: string;
  subtitle?: string;
  products: any[];
  link?: string;
  linkText?: string;
}

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

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  subtitle,
  products,
  link,
  linkText = "Смотреть все",
}) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
        <div>
          <h2 className="text-3xl font-medium tracking-tight mb-2">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {link && (
          <Link 
            to={link}
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-medium text-foreground hover:text-primary transition-colors group"
          >
            {linkText}
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={item}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedProducts;
