
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import ProductCard from '@/components/ProductCard';
import { filterProducts, products } from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  FilterX, 
  SlidersHorizontal 
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const sortOptions = [
  { value: 'newest', label: 'Новинки' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'popular', label: 'Популярные' },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const colorOptions = [
  { name: 'Белый', value: '#FFFFFF' },
  { name: 'Черный', value: '#000000' },
  { name: 'Синий', value: '#0047AB' },
  { name: 'Красный', value: '#B22222' },
  { name: 'Серый', value: '#808080' },
  { name: 'Бежевый', value: '#F5F5DC' },
];

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    size: true,
    color: true,
  });
  
  const categoryParam = searchParams.get('category');
  const saleParam = searchParams.get('sale') === 'true';
  const newParam = searchParams.get('new') === 'true';
  const sortParam = searchParams.get('sort') || 'newest';
  
  // Get active filters for mobile badge
  const getActiveFilterCount = () => {
    let count = 0;
    if (categoryParam) count++;
    if (saleParam) count++;
    if (newParam) count++;
    if (selectedSizes.length > 0) count++;
    if (selectedColors.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < 10000) count++;
    return count;
  };

  // Toggle filter section
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Apply filters
  useEffect(() => {
    const filtered = filterProducts({
      category: categoryParam || undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      sizes: selectedSizes.length > 0 ? selectedSizes : undefined,
      colors: selectedColors.length > 0 ? selectedColors : undefined,
      onSale: saleParam || undefined,
      isNew: newParam || undefined,
    });
    
    // Apply sorting
    let sorted = [...filtered];
    switch (sortParam) {
      case 'price-asc':
        sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-desc':
        sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
        sorted = sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew));
        break;
      // For 'popular', we'd typically use a different metric, defaulting to id for now
      default:
        sorted.sort((a, b) => a.id - b.id);
    }
    
    setFilteredProducts(sorted);
  }, [categoryParam, priceRange, selectedSizes, selectedColors, saleParam, newParam, sortParam]);
  
  // Handle size selection
  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };
  
  // Handle color selection
  const toggleColor = (colorValue: string) => {
    setSelectedColors(prev => 
      prev.includes(colorValue) 
        ? prev.filter(c => c !== colorValue) 
        : [...prev, colorValue]
    );
  };
  
  // Clear all filters
  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    
    // Create new search params without filter parameters
    const newParams = new URLSearchParams();
    if (sortParam) newParams.set('sort', sortParam);
    setSearchParams(newParams);
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', e.target.value);
    setSearchParams(newParams);
  };
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-medium tracking-tight mb-2">
            {categoryParam 
              ? categoryParam === 'men' 
                ? 'Мужская одежда' 
                : categoryParam === 'women' 
                  ? 'Женская одежда' 
                  : categoryParam === 'kids' 
                    ? 'Детская одежда' 
                    : categoryParam === 'shoes' 
                      ? 'Обувь' 
                      : 'Каталог'
              : saleParam 
                ? 'Товары со скидкой' 
                : newParam 
                  ? 'Новинки' 
                  : 'Каталог товаров'}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} {
              filteredProducts.length === 1 
                ? 'товар' 
                : filteredProducts.length >= 2 && filteredProducts.length <= 4 
                  ? 'товара' 
                  : 'товаров'
            }
          </p>
        </div>
        
        {/* Mobile filter button */}
        <div className="block lg:hidden mb-6">
          <button
            className="flex items-center w-full py-3 px-4 justify-between text-sm font-medium border rounded-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            <div className="flex items-center">
              <SlidersHorizontal size={18} className="mr-2" />
              <span>Фильтры и сортировка</span>
              {getActiveFilterCount() > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                  {getActiveFilterCount()}
                </span>
              )}
            </div>
            <ChevronDown size={18} />
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0 mr-8">
            <div className="space-y-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Фильтры</h3>
                <button 
                  onClick={clearFilters} 
                  className="text-sm text-muted-foreground hover:text-primary flex items-center"
                >
                  <FilterX size={14} className="mr-1" />
                  Очистить
                </button>
              </div>
              
              {/* Categories */}
              <div>
                <div 
                  className="flex items-center justify-between mb-2 cursor-pointer"
                  onClick={() => toggleSection('categories')}
                >
                  <h4 className="text-sm font-medium">Категории</h4>
                  {expandedSections.categories ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {expandedSections.categories && (
                  <div className="space-y-2">
                    {['men', 'women', 'kids', 'shoes', 'accessories'].map((cat) => (
                      <div key={cat} className="flex items-center">
                        <Checkbox
                          id={`category-${cat}`}
                          checked={categoryParam === cat}
                          onCheckedChange={() => {
                            const newParams = new URLSearchParams(searchParams);
                            if (categoryParam === cat) {
                              newParams.delete('category');
                            } else {
                              newParams.set('category', cat);
                            }
                            setSearchParams(newParams);
                          }}
                        />
                        <label
                          htmlFor={`category-${cat}`}
                          className="ml-2 text-sm cursor-pointer"
                        >
                          {cat === 'men' ? 'Мужская одежда' :
                           cat === 'women' ? 'Женская одежда' :
                           cat === 'kids' ? 'Детская одежда' :
                           cat === 'shoes' ? 'Обувь' : 'Аксессуары'}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Price Range */}
              <div>
                <div 
                  className="flex items-center justify-between mb-2 cursor-pointer"
                  onClick={() => toggleSection('price')}
                >
                  <h4 className="text-sm font-medium">Цена</h4>
                  {expandedSections.price ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {expandedSections.price && (
                  <div>
                    <div className="mb-4">
                      <Slider
                        defaultValue={[0, 10000]}
                        max={10000}
                        step={100}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                      <span className="text-sm">{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Sizes */}
              <div>
                <div 
                  className="flex items-center justify-between mb-2 cursor-pointer"
                  onClick={() => toggleSection('size')}
                >
                  <h4 className="text-sm font-medium">Размер</h4>
                  {expandedSections.size ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {expandedSections.size && (
                  <div className="grid grid-cols-3 gap-2">
                    {sizeOptions.map((size) => (
                      <button
                        key={size}
                        className={`text-sm border rounded-md py-1 px-2 transition-colors ${
                          selectedSizes.includes(size)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary'
                        }`}
                        onClick={() => toggleSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Colors */}
              <div>
                <div 
                  className="flex items-center justify-between mb-2 cursor-pointer"
                  onClick={() => toggleSection('color')}
                >
                  <h4 className="text-sm font-medium">Цвет</h4>
                  {expandedSections.color ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {expandedSections.color && (
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          color.value === '#FFFFFF' ? 'border border-gray-200' : ''
                        }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => toggleColor(color.value)}
                        title={color.name}
                      >
                        {selectedColors.includes(color.value) && (
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
                )}
              </div>
              
              {/* Special Filters */}
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="filter-sale"
                    checked={saleParam}
                    onCheckedChange={(checked) => {
                      const newParams = new URLSearchParams(searchParams);
                      if (checked) {
                        newParams.set('sale', 'true');
                      } else {
                        newParams.delete('sale');
                      }
                      setSearchParams(newParams);
                    }}
                  />
                  <label htmlFor="filter-sale" className="ml-2 text-sm cursor-pointer">
                    Со скидкой
                  </label>
                </div>
                <div className="flex items-center">
                  <Checkbox
                    id="filter-new"
                    checked={newParam}
                    onCheckedChange={(checked) => {
                      const newParams = new URLSearchParams(searchParams);
                      if (checked) {
                        newParams.set('new', 'true');
                      } else {
                        newParams.delete('new');
                      }
                      setSearchParams(newParams);
                    }}
                  />
                  <label htmlFor="filter-new" className="ml-2 text-sm cursor-pointer">
                    Новинки
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters - Mobile */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden w-full mb-6 overflow-hidden"
              >
                <div className="border rounded-md p-4 space-y-6">
                  {/* Filter Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Фильтры</h3>
                    <button 
                      onClick={clearFilters} 
                      className="text-sm text-muted-foreground hover:text-primary flex items-center"
                    >
                      <FilterX size={14} className="mr-1" />
                      Очистить
                    </button>
                  </div>
                  
                  {/* Sort - Mobile */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Сортировка</h4>
                    <select
                      value={sortParam}
                      onChange={handleSortChange}
                      className="w-full border rounded-md p-2 text-sm bg-background"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Категории</h4>
                    <div className="space-y-2">
                      {['men', 'women', 'kids', 'shoes', 'accessories'].map((cat) => (
                        <div key={cat} className="flex items-center">
                          <Checkbox
                            id={`mobile-category-${cat}`}
                            checked={categoryParam === cat}
                            onCheckedChange={() => {
                              const newParams = new URLSearchParams(searchParams);
                              if (categoryParam === cat) {
                                newParams.delete('category');
                              } else {
                                newParams.set('category', cat);
                              }
                              setSearchParams(newParams);
                            }}
                          />
                          <label
                            htmlFor={`mobile-category-${cat}`}
                            className="ml-2 text-sm cursor-pointer"
                          >
                            {cat === 'men' ? 'Мужская одежда' :
                             cat === 'women' ? 'Женская одежда' :
                             cat === 'kids' ? 'Детская одежда' :
                             cat === 'shoes' ? 'Обувь' : 'Аксессуары'}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Цена</h4>
                    <div>
                      <div className="mb-4">
                        <Slider
                          defaultValue={[0, 10000]}
                          max={10000}
                          step={100}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{priceRange[0].toLocaleString('ru-RU')} ₽</span>
                        <span className="text-sm">{priceRange[1].toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Sizes */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Размер</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {sizeOptions.map((size) => (
                        <button
                          key={size}
                          className={`text-sm border rounded-md py-1 px-2 transition-colors ${
                            selectedSizes.includes(size)
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'border-border hover:border-primary'
                          }`}
                          onClick={() => toggleSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Colors */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Цвет</h4>
                    <div className="grid grid-cols-6 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            color.value === '#FFFFFF' ? 'border border-gray-200' : ''
                          }`}
                          style={{ backgroundColor: color.value }}
                          onClick={() => toggleColor(color.value)}
                          title={color.name}
                        >
                          {selectedColors.includes(color.value) && (
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
                  </div>
                  
                  {/* Special Filters */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="mobile-filter-sale"
                        checked={saleParam}
                        onCheckedChange={(checked) => {
                          const newParams = new URLSearchParams(searchParams);
                          if (checked) {
                            newParams.set('sale', 'true');
                          } else {
                            newParams.delete('sale');
                          }
                          setSearchParams(newParams);
                        }}
                      />
                      <label htmlFor="mobile-filter-sale" className="ml-2 text-sm cursor-pointer">
                        Со скидкой
                      </label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="mobile-filter-new"
                        checked={newParam}
                        onCheckedChange={(checked) => {
                          const newParams = new URLSearchParams(searchParams);
                          if (checked) {
                            newParams.set('new', 'true');
                          } else {
                            newParams.delete('new');
                          }
                          setSearchParams(newParams);
                        }}
                      />
                      <label htmlFor="mobile-filter-new" className="ml-2 text-sm cursor-pointer">
                        Новинки
                      </label>
                    </div>
                  </div>
                  
                  <button
                    className="w-full py-2 bg-primary text-primary-foreground rounded-md"
                    onClick={() => setShowFilters(false)}
                  >
                    Применить фильтры
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Product grid and sort */}
          <div className="flex-1">
            {/* Sort - Desktop */}
            <div className="hidden lg:flex justify-end mb-6">
              <div className="flex items-center">
                <label htmlFor="sort" className="text-sm mr-2">
                  Сортировать:
                </label>
                <select
                  id="sort"
                  value={sortParam}
                  onChange={handleSortChange}
                  className="border rounded-md p-2 text-sm bg-background"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте изменить параметры фильтрации
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Сбросить все фильтры
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Catalog;
