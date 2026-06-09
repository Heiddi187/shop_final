import type { CartItemType, EventType } from "../shared/types";
import {
   createContext,
   useState,
   useContext,
   useEffect,
   type ReactNode,
} from "react";
import {
   addItemToCart,
   updateCartQuantity,
   removeItemFromCart,
   emptyCart,
} from "../components/cart/CartUtils";

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
      setCart((prev) => 
         addItemToCart(prev, event, quantity)
      );
   };

   const updateQuantity = (eventId: number, quantity: number) => {
      setCart((prev) =>
         updateCartQuantity(prev, eventId, quantity)
      );
   };

   const removeFromCart = (id: number) => {
      setCart((prev) => 
         removeItemFromCart(prev, id)   
      );
   };

   const clearCart = () => setCart(emptyCart());

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
