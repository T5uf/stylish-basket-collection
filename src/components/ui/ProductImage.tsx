
import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageProps {
  images: string[];
  name: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ images, name }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isZoomed || !imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const image = e.currentTarget;
    image.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  };

  return (
    <div className="relative">
      {/* Main image */}
      <div
        ref={imageRef}
        className={`relative overflow-hidden bg-gray-100 rounded-lg ${isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`}
        onClick={handleZoom}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            alt={`${name} - изображение ${currentImage + 1}`}
            className={`w-full h-auto object-cover transition-transform ${isZoomed ? "scale-150" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isZoomed && setIsZoomed(false)}
          />
        </AnimatePresence>

        {/* Zoom indicator */}
        <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
          <ZoomIn size={20} className="text-foreground/70" />
        </div>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-foreground/70 hover:text-foreground transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex mt-4 space-x-2 overflow-x-auto py-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative w-16 h-16 border-2 rounded ${
                currentImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-muted-foreground/30"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${name} - миниатюра ${index + 1}`}
                className="w-full h-full object-cover object-center rounded"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImage;
