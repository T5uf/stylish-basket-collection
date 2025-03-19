
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-9xl font-bold text-primary mb-6">404</div>
        <h1 className="text-3xl font-medium mb-4">Страница не найдена</h1>
        <p className="text-muted-foreground mb-8">
          Страница, которую вы ищете, не существует или была перемещена. Пожалуйста, вернитесь на главную страницу.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Вернуться на главную
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
