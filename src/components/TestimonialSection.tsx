
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Елена Петрова",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    role: "Постоянный клиент",
    rating: 5,
    text: "Заказываю в ЭВРИКЕ уже не первый раз. Качество одежды всегда на высоте, а цены приятно удивляют. Доставка быстрая, упаковка надежная.",
  },
  {
    id: 2,
    name: "Александр Иванов",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Новый клиент",
    rating: 4,
    text: "Недавно открыл для себя этот магазин и очень доволен своей покупкой. Футболки сели идеально по размеру, материал приятный к телу.",
  },
  {
    id: 3,
    name: "Наталья Сидорова",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Оптовый покупатель",
    rating: 5,
    text: "Сотрудничаем с ЭВРИКОЙ больше года. Всегда актуальный ассортимент, удобная система заказа и надежная доставка в регионы.",
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium tracking-tight mb-4">Отзывы наших клиентов</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Мы ценим каждого клиента и стремимся обеспечить наилучший сервис
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white p-6 rounded-lg shadow-sm h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium text-foreground">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                
                <p className="text-foreground/80 flex-grow">"{testimonial.text}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
