
interface Product {
  id: number;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  description: string;
  details: string[];
  specs: {
    material: string;
    care: string[];
  };
  category: string;
  subcategory: string;
  isNew?: boolean;
  onSale?: boolean;
  colors: { name: string; value: string }[];
  sizes: string[];
  relatedProducts: number[];
  reviews: {
    id: number;
    name: string;
    rating: number;
    date: string;
    text: string;
  }[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Хлопковая футболка прямого кроя",
    price: 1990,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=1471&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1471&auto=format&fit=crop",
    ],
    description: "Футболка из мягкого хлопка прямого кроя с круглым вырезом. Идеально подходит для повседневной носки.",
    details: [
      "Круглый вырез",
      "Короткие рукава",
      "Прямой крой",
      "Высокое качество хлопка",
    ],
    specs: {
      material: "100% хлопок",
      care: ["Машинная стирка при 30°C", "Не отбеливать", "Гладить при низкой температуре"],
    },
    category: "men",
    subcategory: "t-shirts",
    colors: [
      { name: "Белый", value: "#FFFFFF" },
      { name: "Черный", value: "#000000" },
      { name: "Серый", value: "#808080" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    relatedProducts: [2, 3, 4],
    reviews: [
      {
        id: 1,
        name: "Алексей",
        rating: 5,
        date: "10.03.2023",
        text: "Отличная футболка, приятная к телу. Размер соответствует указанному.",
      },
    ],
  },
  {
    id: 2,
    name: "Джинсы классические прямые",
    price: 3990,
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604176424472-17cd740f74e9?q=80&w=1974&auto=format&fit=crop",
    ],
    description: "Классические джинсы из качественного денима. Прямой крой, стандартная посадка.",
    details: [
      "Классический пятикарманный дизайн",
      "Застежка на молнию и пуговицу",
      "Шлевки для ремня",
      "Прямой крой",
    ],
    specs: {
      material: "98% хлопок, 2% эластан",
      care: ["Машинная стирка при 30°C", "Не отбеливать", "Гладить при средней температуре"],
    },
    category: "men",
    subcategory: "jeans",
    colors: [
      { name: "Синий", value: "#0047AB" },
      { name: "Черный", value: "#000000" },
    ],
    sizes: ["30/32", "32/32", "34/32", "36/32", "38/32"],
    relatedProducts: [1, 3, 5],
    reviews: [
      {
        id: 1,
        name: "Владимир",
        rating: 4,
        date: "15.04.2023",
        text: "Хорошие джинсы, но немного большие в поясе. Качество ткани отличное.",
      },
    ],
  },
  {
    id: 3,
    name: "Платье миди с цветочным принтом",
    price: 4590,
    salePrice: 3290,
    images: [
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613558035454-d2c484cf4a29?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6d4a?q=80&w=1974&auto=format&fit=crop",
    ],
    description: "Элегантное платье длины миди с цветочным принтом. Приталенный силуэт и расклешенная юбка.",
    details: [
      "V-образный вырез",
      "Длинные рукава",
      "Приталенный силуэт",
      "Расклешенная юбка",
      "Застежка на потайную молнию сзади",
    ],
    specs: {
      material: "95% вискоза, 5% эластан",
      care: ["Ручная стирка", "Не отбеливать", "Гладить при низкой температуре"],
    },
    category: "women",
    subcategory: "dresses",
    onSale: true,
    colors: [
      { name: "Синий с принтом", value: "#7289DA" },
      { name: "Зеленый с принтом", value: "#2E8B57" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    relatedProducts: [6, 7, 8],
    reviews: [
      {
        id: 1,
        name: "Екатерина",
        rating: 5,
        date: "12.02.2023",
        text: "Очень красивое платье! Отлично село по фигуре. Ткань приятная к телу.",
      },
    ],
  },
  {
    id: 4,
    name: "Рубашка в клетку из фланели",
    price: 2790,
    images: [
      "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598112152414-f2e5a9ce0b7b?q=80&w=1974&auto=format&fit=crop",
    ],
    description: "Теплая фланелевая рубашка в клетку. Идеально подходит для прохладной погоды.",
    details: [
      "Классический воротник",
      "Застежка на пуговицы",
      "Длинные рукава с манжетами на пуговицах",
      "Нагрудный карман",
    ],
    specs: {
      material: "100% хлопок",
      care: ["Машинная стирка при 30°C", "Не отбеливать", "Гладить при средней температуре"],
    },
    category: "men",
    subcategory: "shirts",
    isNew: true,
    colors: [
      { name: "Красная клетка", value: "#B22222" },
      { name: "Синяя клетка", value: "#000080" },
      { name: "Зеленая клетка", value: "#006400" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    relatedProducts: [1, 2, 5],
    reviews: [
      {
        id: 1,
        name: "Дмитрий",
        rating: 5,
        date: "20.01.2023",
        text: "Качественная и теплая рубашка. Размер полностью соответствует.",
      },
    ],
  },
  {
    id: 5,
    name: "Куртка утепленная стеганая",
    price: 7990,
    salePrice: 5990,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1972&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614251055880-ee96e4803393?q=80&w=1974&auto=format&fit=crop",
    ],
    description: "Стеганая куртка с утеплителем. Легкая и теплая, идеальна для прохладной погоды.",
    details: [
      "Застежка на молнию и кнопки",
      "Воротник-стойка",
      "Два боковых кармана на молнии",
      "Внутренний карман",
      "Утеплитель с хорошими теплосберегающими свойствами",
    ],
    specs: {
      material: "Внешняя ткань: 100% полиэстер, Утеплитель: 100% полиэстер",
      care: ["Машинная стирка при 30°C", "Не отбеливать", "Не гладить"],
    },
    category: "men",
    subcategory: "jackets",
    onSale: true,
    colors: [
      { name: "Черный", value: "#000000" },
      { name: "Синий", value: "#000080" },
      { name: "Оливковый", value: "#556B2F" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    relatedProducts: [1, 2, 4],
    reviews: [
      {
        id: 1,
        name: "Артем",
        rating: 4,
        date: "05.03.2023",
        text: "Хорошая куртка для весны. Легкая, но теплая. Рукава немного длинноваты.",
      },
    ],
  },
  {
    id: 6,
    name: "Свитер из мериносовой шерсти",
    price: 4290,
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1022&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1607703703520-bb638e84caf2?q=80&w=1022&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1022&auto=format&fit=crop",
    ],
    description: "Мягкий свитер из высококачественной мериносовой шерсти. Сохраняет тепло и обеспечивает комфорт.",
    details: [
      "Круглый вырез",
      "Длинные рукава с эластичными манжетами",
      "Эластичный низ",
      "Мягкая и теплая ткань",
    ],
    specs: {
      material: "80% мериносовая шерсть, 20% полиамид",
      care: ["Ручная стирка при 30°C", "Не отбеливать", "Сушить в горизонтальном положении"],
    },
    category: "women",
    subcategory: "sweaters",
    isNew: true,
    colors: [
      { name: "Бежевый", value: "#F5F5DC" },
      { name: "Серый", value: "#808080" },
      { name: "Винный", value: "#722F37" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    relatedProducts: [3, 7, 8],
    reviews: [
      {
        id: 1,
        name: "Мария",
        rating: 5,
        date: "15.02.2023",
        text: "Потрясающий свитер! Очень теплый и при этом не колется. Цвет соответствует фото.",
      },
    ],
  },
  {
    id: 7,
    name: "Блузка из шелка с бантом",
    price: 3990,
    images: [
      "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624436094323-d5a973758f42?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598554793905-075f7b355cd9?q=80&w=1974&auto=format&fit=crop",
    ],
    description: "Элегантная блузка из натурального шелка с бантом у горловины. Идеально подходит для офиса и особых случаев.",
    details: [
      "Воротник с бантом",
      "Длинные рукава с манжетами на пуговицах",
      "Застежка на пуговицы спереди",
      "Прямой крой",
    ],
    specs: {
      material: "100% натуральный шелк",
      care: ["Только сухая чистка", "Не отбеливать", "Гладить при низкой температуре"],
    },
    category: "women",
    subcategory: "blouses",
    colors: [
      { name: "Белый", value: "#FFFFFF" },
      { name: "Кремовый", value: "#FFFDD0" },
      { name: "Пудровый", value: "#F3CFC6" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    relatedProducts: [3, 6, 8],
    reviews: [
      {
        id: 1,
        name: "Ольга",
        rating: 4,
        date: "18.03.2023",
        text: "Блузка очень красивая, но нужно аккуратно ухаживать. Размер соответствует.",
      },
    ],
  },
  {
    id: 8,
    name: "Кроссовки спортивные беговые",
    price: 5990,
    salePrice: 4490,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1974&auto=format&fit=crop",
    ],
    description: "Легкие и удобные кроссовки для бега и повседневной носки. Амортизирующая подошва обеспечивает комфорт при ходьбе.",
    details: [
      "Дышащий сетчатый верх",
      "Амортизирующая подошва",
      "Усиленная пятка",
      "Светоотражающие элементы",
      "Легкий вес",
    ],
    specs: {
      material: "Верх: текстиль, синтетика; Подошва: резина",
      care: ["Протирать влажной тканью", "Не стирать в машине", "Сушить вдали от источников тепла"],
    },
    category: "shoes",
    subcategory: "sneakers",
    onSale: true,
    colors: [
      { name: "Черный/Белый", value: "#000000" },
      { name: "Синий/Красный", value: "#000080" },
      { name: "Серый/Зеленый", value: "#808080" },
    ],
    sizes: ["39", "40", "41", "42", "43", "44", "45"],
    relatedProducts: [5, 9, 10],
    reviews: [
      {
        id: 1,
        name: "Игорь",
        rating: 5,
        date: "10.04.2023",
        text: "Отличные кроссовки! Легкие, дышащие, очень удобные.",
      },
    ],
  },
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

export const getSaleProducts = () => {
  return products.filter(product => product.onSale);
};

export const getRelatedProducts = (productId: number) => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products.filter(p => product.relatedProducts.includes(p.id));
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const filterProducts = (options: {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  colors?: string[];
  sizes?: string[];
  onSale?: boolean;
  isNew?: boolean;
}) => {
  return products.filter(product => {
    // Filter by category
    if (options.category && product.category !== options.category) {
      return false;
    }
    
    // Filter by subcategory
    if (options.subcategory && product.subcategory !== options.subcategory) {
      return false;
    }
    
    // Filter by price range
    if (options.minPrice && (product.salePrice || product.price) < options.minPrice) {
      return false;
    }
    if (options.maxPrice && (product.salePrice || product.price) > options.maxPrice) {
      return false;
    }
    
    // Filter by colors
    if (options.colors && options.colors.length > 0) {
      const productColorValues = product.colors.map(c => c.value);
      if (!options.colors.some(color => productColorValues.includes(color))) {
        return false;
      }
    }
    
    // Filter by sizes
    if (options.sizes && options.sizes.length > 0) {
      if (!options.sizes.some(size => product.sizes.includes(size))) {
        return false;
      }
    }
    
    // Filter by sale status
    if (options.onSale === true && !product.onSale) {
      return false;
    }
    
    // Filter by new status
    if (options.isNew === true && !product.isNew) {
      return false;
    }
    
    return true;
  });
};
