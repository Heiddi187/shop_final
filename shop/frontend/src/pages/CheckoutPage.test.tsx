import { beforeEach, describe, expect, it, vi } from "vitest";
import { CheckoutPage } from "./CheckoutPage";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

////////////////////// Setup //////////////////////////////////////
const API_URL = import.meta.env.VITE_API_URL;

const mockUseCart = vi.fn();
vi.mock("../context/CartContext", () => ({
   useCart: () => mockUseCart(),
}));

const mockUseAuth = vi.fn();
vi.mock("../auth/AuthContext", () => ({
   useAuth: () => mockUseAuth(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
   const actual = await vi.importActual("react-router-dom");

   return {
      ...actual,
      useNavigate: () => mockNavigate,
   };
});

vi.mock("../components/Navbar", () => ({
   Navbar: () => <div>Navbar</div>,
}));

vi.mock("../components/OrderSummaryCard", () => ({
   OrderSummaryCard: () => <div>Order Summary</div>,
}));

const mockFetch = vi.fn();

/////////////////////////// Tests ////////////////////////////////////

describe("CheckoutPage.tsx", () => {
   let user: ReturnType<typeof userEvent.setup>;

   beforeEach(() => {
      mockUseCart.mockReturnValue({
         cart: [],
         clearCart: vi.fn(),
      });

      mockUseAuth.mockReturnValue({
         isAuthenticated: true,
         token: "fake-token",
      });

      user = userEvent.setup();

      mockFetch.mockReset();
      globalThis.fetch = mockFetch;
   });

   it("should redirect to login when not authenticated ", async () => {
      mockUseAuth.mockReturnValue({
         isAuthenticated: false,
         token: null,
      });

      render(<CheckoutPage />);

      await waitFor(() => {
         expect(mockNavigate).toHaveBeenCalledWith("/login");
      });
   });

   it("should disable purchase button when cart empty ", () => {
      render(<CheckoutPage />);

      expect(
         screen.getByRole("button", {
            name: /complete purchase/i,
         }),
      ).toBeDisabled();
   });

   it("should clear cart after successful purchase ", async () => {
      const mockClearCart = vi.fn();

      mockUseCart.mockReturnValue({
         cart: [
            {
               event: {
                  id: 1,
                  title: "Test Event",
               },
               quantity: 2,
            },
         ],
         clearCart: mockClearCart,
      });

      mockFetch.mockResolvedValue({
         ok: true,
         json: async () => ({}),
      });

      render(<CheckoutPage />);

      await user.click(
         screen.getByRole("button", {
            name: /complete purchase/i,
         }),
      );

      await waitFor(() => {
         expect(mockClearCart).toHaveBeenCalledTimes(1);
      });
   });

   it("should navigate to /user after successful purchase ", async () => {
      mockUseCart.mockReturnValue({
         cart: [
            {
               event: {
                  id: 1,
                  title: "Test Event",
               },
               quantity: 2,
            },
         ],
         clearCart: vi.fn(),
      });

      mockFetch.mockResolvedValue({
         ok: true,
         json: async () => ({}),
      });

      render(<CheckoutPage />);

      await user.click(
         screen.getByRole("button", {
            name: /complete purchase/i,
         }),
      );

      await waitFor(() => {
         expect(mockNavigate).toHaveBeenCalledWith("/user");
      });
   });

   it("should display credit card form when payment method credit card is chosen ", () => {
      render(<CheckoutPage />);

      expect(screen.getByLabelText(/name on card/i)).toBeInTheDocument();
   });

   it("should disappear credit card form when not chosen ", async () => {
      render(<CheckoutPage />);

      await user.click(screen.getByLabelText(/ponzi crypto/i));

      await waitFor(() => {
         expect(
            screen.queryByLabelText(/name on card/i),
         ).not.toBeInTheDocument();
      });
   });

   it("should send purchase request with correct event and quantity", async () => {
      mockUseCart.mockReturnValue({
         cart: [
            {
               event: {
                  id: 69,
                  title: "Test Event",
               },
               quantity: 9,
            },
         ],
         clearCart: vi.fn(),
      });

      mockFetch.mockResolvedValue({
         ok: true,
         json: async () => ({}),
      });

      render(<CheckoutPage />);

      await user.click(
         screen.getByRole("button", {
            name: /complete purchase/i,
         }),
      );

      expect(mockFetch).toHaveBeenCalledWith(
         `${API_URL}/api/tickets/buy`,
         expect.objectContaining({ method: "POST" }),
      );

      expect(mockFetch).toHaveBeenCalledWith(
         `${API_URL}/api/tickets/buy`,
         expect.objectContaining({
            body: JSON.stringify({
               event_id: 69,
               quantity: 9
            })
      }))
   });

   it("should not clear cart if purchase fails", async () => {
      const mockClearCart = vi.fn();
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      mockUseCart.mockReturnValue({
         cart: [
            {
               event: {
                  id: 1,
                  title: "Test Event",
               },
               quantity: 2,
            },
         ],
         clearCart: mockClearCart,
      });

      mockFetch.mockResolvedValue({
         ok: false,
      });

      render(<CheckoutPage />);

      await user.click(
         screen.getByRole("button", {
            name: /complete purchase/i,
         }),
      );

      expect(consoleSpy).toHaveBeenCalled();
      expect(mockClearCart).not.toHaveBeenCalledOnce();
   });
});
