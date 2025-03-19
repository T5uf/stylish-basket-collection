
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  images: string[];
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: any,
    quantity = 1,
    size?: string,
    color?: string
  ) => {
    setCartItems((prevItems) => {
      // Check if item exists in cart with same id, size, and color
      const existingItemIndex = prevItems.findIndex(
        (item) => 
          item.id === product.id && 
          item.size === size && 
          item.color === color
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast.success("Товар добавлен в корзину");
        return updatedItems;
      } else {
        // Add new item to cart
        toast.success("Товар добавлен в корзину");
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            images: product.images,
            quantity,
            size,
            color,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => 
      prevItems.filter((item) => item.id !== productId)
    );
    toast.info("Товар удален из корзины");
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
