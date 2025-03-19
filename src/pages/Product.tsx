
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import { getProductById, getRelatedProducts } from '@/data/products';
import ProductImage from '@/components/ui/ProductImage';
import FeaturedProducts from '@/components/FeaturedProducts';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Heart, Truck, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion } from 'framer-motion';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = parseInt(id || '0');
  const product = getProductById(productId);
  const relatedProducts = getRelatedProducts(productId);
  
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  
  if (!product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-medium mb-4">Товар не найден</h1>
          <p className="text-muted-foreground mb-6">
            Товар, который вы ищете, не существует или был удален.
          </p>
          <button
            onClick={() => navigate('/catalog')}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Вернуться в каталог
          </button>
        </div>
      </MainLayout>
    );
  }
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Пожалуйста, выберите размер');
      return;
    }
    
    if (!selectedColor) {
      alert('Пожалуйста, выберите цвет');
      return;
    }
    
    // Animate adding to cart
    setAddingToCart(true);
    
    setTimeout(() => {
      addToCart(product, quantity, selectedSize, selectedColor);
      setAddingToCart(false);
    }, 600);
  };
  
  return (
    <MainLayout>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            <ProductImage images={product.images} name={product.name} />
          </div>
          
          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex space-x-2 mb-4">
              {product.isNew && (
                <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded">
                  Новинка
                </span>
              )}
              {product.onSale && (
                <span className="px-2 py-1 text-xs font-medium bg-destructive text-destructive-foreground rounded">
                  Скидка
                </span>
              )}
            </div>
            
            {/* Title and price */}
            <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
            <div className="mb-6">
              {product.onSale && product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-medium text-destructive">
                    {product.salePrice.toLocaleString('ru-RU')} ₽
                  </span>
                  <span className="ml-3 text-lg text-muted-foreground line-through">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-medium">
                  {product.price.toLocaleString('ru-RU')} ₽
                </span>
              )}
            </div>
            
            {/* Reviews summary */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < (product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length)
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">
                {product.reviews.length} {
                  product.reviews.length === 1 
                    ? 'отзыв' 
                    : product.reviews.length >= 2 && product.reviews.length <= 4 
                      ? 'отзыва' 
                      : 'отзывов'
                }
              </span>
            </div>
            
            {/* Description */}
            <p className="text-foreground/90 mb-8">
              {product.description}
            </p>
            
            {/* Colors */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Цвет:</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color.value}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      color.value === '#FFFFFF' ? 'border border-gray-200' : ''
                    } ${
                      selectedColor === color.value
                        ? 'ring-2 ring-primary ring-offset-2'
                        : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
                    title={color.name}
                  >
                    {selectedColor === color.value && (
                      <Check 
                        size={16} 
                        className={
                          color.value === '#FFFFFF' || color.value === '#F5F5DC'
                            ? 'text-black' 
                            : 'text-white'
                        } 
                      />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {selectedColor 
                  ? `Выбрано: ${product.colors.find(c => c.value === selectedColor)?.name}`
                  : "Выберите цвет"}
              </p>
            </div>
            
            {/* Sizes */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Размер:</h3>
                <button className="text-sm text-primary">Таблица размеров</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`py-2 text-sm border rounded-md transition-colors ${
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'border-border hover:border-primary'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Количество:</h3>
              <div className="flex items-center">
                <button
                  className="w-10 h-10 border rounded-l-md flex items-center justify-center"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="w-14 h-10 flex items-center justify-center border-t border-b">
                  {quantity}
                </span>
                <button
                  className="w-10 h-10 border rounded-r-md flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                className={`flex-1 min-w-[180px] py-3 px-6 rounded-md flex items-center justify-center font-medium transition-all ${
                  addingToCart
                    ? 'bg-primary/90 text-primary-foreground animate-pulse'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
                onClick={handleAddToCart}
                disabled={addingToCart}
              >
                <ShoppingBag size={18} className="mr-2" />
                {addingToCart ? 'Добавление...' : 'В корзину'}
              </button>
              <button
                className="min-w-[50px] py-3 px-4 border rounded-md flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Heart size={18} />
              </button>
            </div>
            
            {/* Shipping Info */}
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-start mb-2">
                <Truck size={18} className="mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Бесплатная доставка</p>
                  <p className="text-sm text-muted-foreground">Для заказов от 5000 ₽</p>
                </div>
              </div>
              <div className="flex items-start">
                <Check size={18} className="mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Гарантия возврата</p>
                  <p className="text-sm text-muted-foreground">30 дней на возврат или обмен</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product details tabs */}
        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b rounded-none justify-start mb-6">
              <TabsTrigger value="details" className="text-base">
                Описание
              </TabsTrigger>
              <TabsTrigger value="specs" className="text-base">
                Характеристики
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-base">
                Отзывы ({product.reviews.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-2">
              <div className="max-w-3xl">
                <p className="mb-6">{product.description}</p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-foreground/90">{detail}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="specs" className="pt-2">
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Состав и уход</h3>
                  <p className="mb-2">
                    <span className="font-medium">Материал:</span> {product.specs.material}
                  </p>
                  <p className="font-medium mb-1">Рекомендации по уходу:</p>
                  <ul className="list-disc list-inside space-y-1 pl-4">
                    {product.specs.care.map((item, index) => (
                      <li key={index} className="text-foreground/90">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-2">
              <div className="max-w-3xl">
                {product.reviews.length === 0 ? (
                  <p>Пока нет отзывов. Будьте первым, кто оставит отзыв об этом товаре!</p>
                ) : (
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="pb-6 border-b">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">{review.name}</h4>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <div className="flex mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                        <p className="text-foreground/90">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <button className="mt-8 px-6 py-2 border rounded-md hover:bg-muted transition-colors">
                  Написать отзыв
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <Separator className="mb-16" />
            <FeaturedProducts
              title="Вам также может понравиться"
              products={relatedProducts}
            />
          </div>
        )}
      </motion.div>
    </MainLayout>
  );
};

export default Product;
