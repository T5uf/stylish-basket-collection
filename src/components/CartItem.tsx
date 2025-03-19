
import React from "react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    images: string[];
    quantity: number;
    size?: string;
    color?: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-start py-6 border-b">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img
          src={item.images[0]}
          alt={item.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-foreground">{item.name}</h3>
            {(item.size || item.color) && (
              <p className="mt-1 text-sm text-muted-foreground">
                {item.size && <span>Размер: {item.size}</span>}
                {item.size && item.color && <span> / </span>}
                {item.color && <span>Цвет: {item.color}</span>}
              </p>
            )}
          </div>
          <p className="text-base font-medium text-foreground">
            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-3 text-sm">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
