
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Heart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    images: string[];
    category: string;
    isNew?: boolean;
    onSale?: boolean;
    salePrice?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[3/4]">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground">
                Новинка
              </span>
            )}
            {product.onSale && (
              <span className="px-2 py-1 text-xs font-medium bg-destructive text-destructive-foreground">
                Скидка
              </span>
            )}
          </div>
          
          {/* Actions */}
          <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform">
              <button 
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-primary shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingBag size={18} />
              </button>
              <button 
                className="p-2 rounded-full bg-white/90 backdrop-blur-sm text-primary shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-3">
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center">
            {product.onSale && product.salePrice ? (
              <>
                <span className="text-sm font-medium text-destructive">
                  {product.salePrice.toLocaleString('ru-RU')} ₽
                </span>
                <span className="ml-2 text-xs text-muted-foreground line-through">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
              </>
            ) : (
              <span className="text-sm font-medium text-foreground">
                {product.price.toLocaleString('ru-RU')} ₽
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
