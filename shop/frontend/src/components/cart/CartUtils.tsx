import type { CartItemType, EventType } from "../../shared/types";

export function addItemToCart(
   cart: CartItemType[],
   event: EventType,
   quantity: number,
) {
   const existing = cart.find((item) => item.event.id === event.id);
   if (existing) {
      return cart.map((item) =>
         item.event.id === event.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
      );
   }

   return [...cart, { event, quantity }];
}

export function updateCartQuantity(
   cart: CartItemType[],
   eventId: number,
   quantity: number,
) {
   if (quantity <= 0) {
      return removeItemFromCart(cart, eventId);
   }

   return cart.map((item) =>
      item.event.id === eventId 
        ? { ...item, quantity } 
        : item,
   );
}

export function removeItemFromCart(
    cart: CartItemType[], 
    id: number
) {
    return cart.filter(
        (item) => item.event.id !== id
    );
}

export function emptyCart() {
   return [];
}
