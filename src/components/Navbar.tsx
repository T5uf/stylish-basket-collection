
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  const navLinks = [
    { name: "Главная", path: "/" },
    { name: "Мужская одежда", path: "/catalog?category=men" },
    { name: "Женская одежда", path: "/catalog?category=women" },
    { name: "Детская одежда", path: "/catalog?category=kids" },
    { name: "О компании", path: "/about" },
    { name: "Контакты", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-medium tracking-tight"
        >
          ЭВРИКА
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                location.pathname === link.path || 
                (link.path.includes("catalog") && location.pathname.includes("catalog"))
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.name}
              <span className="absolute left-0 right-0 bottom-0 h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
            </Link>
          ))}
        </nav>

        {/* Right Menu Icons */}
        <div className="flex items-center space-x-4">
          <button 
            aria-label="Search" 
            className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            <Search size={20} />
          </button>
          <Link 
            to="/account" 
            aria-label="Account" 
            className="p-2 rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            <User size={20} />
          </Link>
          <Link 
            to="/cart" 
            aria-label="Cart" 
            className="p-2 relative rounded-full text-muted-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="p-2 rounded-full lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white absolute top-full left-0 right-0 shadow-lg overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "py-2 text-base font-medium",
                    location.pathname === link.path
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
