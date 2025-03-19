
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold tracking-tight">ЭВРИКА</h3>
            <p className="text-sm text-muted-foreground">
              Оптовая торговля одежды и обуви высокого качества для всей семьи.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone size={16} className="mr-2" />
                <span>+7 (123) 456-7890</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail size={16} className="mr-2" />
                <span>info@evrika-shop.ru</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin size={16} className="mr-2" />
                <span>г. Москва, ул. Примерная, д. 123</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-tight">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-primary transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-tight">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/catalog?category=men" className="text-muted-foreground hover:text-primary transition-colors">
                  Мужская одежда
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=women" className="text-muted-foreground hover:text-primary transition-colors">
                  Женская одежда
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=kids" className="text-muted-foreground hover:text-primary transition-colors">
                  Детская одежда
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=shoes" className="text-muted-foreground hover:text-primary transition-colors">
                  Обувь
                </Link>
              </li>
              <li>
                <Link to="/catalog?category=accessories" className="text-muted-foreground hover:text-primary transition-colors">
                  Аксессуары
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold tracking-tight">Подписка</h3>
            <p className="text-sm text-muted-foreground">
              Подпишитесь на нашу рассылку, чтобы получать информацию о новинках и акциях
            </p>
            <form className="mt-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="px-3 py-2 bg-white border border-r-0 border-muted-foreground/20 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 transition-colors"
                >
                  OK
                </button>
              </div>
            </form>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-muted-foreground/10 mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} ООО "ЭВРИКА". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
