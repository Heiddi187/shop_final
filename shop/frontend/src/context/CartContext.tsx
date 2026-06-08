import type { CartItemType, EventType } from "../shared/types";
import {
   createContext,
   useState,
   useContext,
   useEffect,
   type ReactNode,
} from "react";

type CartContextValue = {
   cart: CartItemType[];
   addToCart: (event: EventType, quantity: number) => void;
   updateQuantity: (eventId: number, quantity: number) => void;
   removeFromCart: (id: number) => void;
   clearCart: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
   const [cart, setCart] = useState<CartItemType[]>(() => {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
   });

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart));
   }, [cart]);

   const addToCart = (event: EventType, quantity: number) => {
      setCart((prev) => {
         const existing = prev.find((item) => item.event.id === event.id);
         if (existing) {
            return prev.map((item) =>
               item.event.id === event.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
            );
         }
         return [...prev, { event, quantity }];
      });
   };

   const updateQuantity = (eventId: number, quantity: number) => {
      if (quantity <= 0) {
         removeFromCart(eventId);
         return;
      }
      setCart((prev) =>
         prev.map((item) =>
            item.event.id === eventId ? { ...item, quantity } : item,
         ),
      );
   };

   const removeFromCart = (id: number) => {
      setCart((prev) => prev.filter((item) => item.event.id !== id));
   };

   const clearCart = () => setCart([]);

   return (
      <CartContext.Provider
         value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}
      >
         {children}
      </CartContext.Provider>
   );
}

export function useCart() {
   const context = useContext(CartContext);
   if (!context) throw new Error("useCart must be inside CartProvider");
   return context;
}
