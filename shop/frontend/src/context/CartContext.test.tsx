import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CartProvider, useCart } from "./CartContext";
import userEvent from "@testing-library/user-event";

const mockEvent = {
   id: 1,
   title: "test event",
} as any;

function TestComponent() {
   const { cart, addToCart, removeFromCart, clearCart } = useCart();

   return (
      <div>
         <p>items: {cart.length}</p>

         <button onClick={() => addToCart(mockEvent, 2)}>add item</button>

         <button onClick={() => removeFromCart(1)}>remove item</button>

         <button onClick={() => clearCart()}>clear cart</button>
      </div>
   );
}

describe("CartContext.tsx", () => {
   it("should render children", () => {
      render(
         <CartProvider>
            <div>Hello</div>
         </CartProvider>,
      );

      expect(screen.getByText("Hello")).toBeInTheDocument();
   });

   it("should add item to cart", async () => {
      const user = userEvent.setup();

      render(
         <CartProvider>
            <TestComponent />
         </CartProvider>,
      );

      expect(screen.getByText("items: 0")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /add item/i }));

      waitFor(() => {
         expect(screen.getByText("items: 1")).toBeInTheDocument();
      });
   });

   it("should remove item from cart", async () => {
      const user = userEvent.setup();

      render(
         <CartProvider>
            <TestComponent />
         </CartProvider>,
      );

      expect(screen.getByText("items: 1")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /remove item/i }));

      waitFor(() => {
         expect(screen.getByText("items: 0")).toBeInTheDocument();
      });
   });

   it("should clear cart", async () => {
      const user = userEvent.setup();

      render(
         <CartProvider>
            <TestComponent />
         </CartProvider>,
      );

      expect(screen.getByText("items: 0")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /add item/i }));

      waitFor(() => {
         expect(screen.getByText("items: 1")).toBeInTheDocument();
      });

      await user.click(screen.getByRole("button", { name: /clear cart/i }));
   });

   waitFor(() => {
      expect(screen.getByText("items: 0")).toBeInTheDocument();
   });
});
