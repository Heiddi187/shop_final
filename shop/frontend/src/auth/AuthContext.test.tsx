import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthContextProvider, useAuth } from "./AuthContext";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";

function TestComponent() {
   const { login, logout, isAuthenticated } = useAuth();

   return (
      <>
         <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>

         <button onClick={() => login("test@test.com", "password123")}>
            Login
         </button>

         <button onClick={logout}>Logout</button>
      </>
   );
}

afterEach(() => {
   localStorage.clear();
   vi.restoreAllMocks();
});

describe("AuthContext.tsx", () => {
   it("stores token after successful login", async () => {
      const user = userEvent.setup();

      const mockFetch = vi.fn();
      mockFetch.mockReset();
      globalThis.fetch = mockFetch;

      mockFetch.mockResolvedValue({
         ok: true,
         json: async () => ({
            token: "fake-jwt-token",
         }),
      });

      render(
         <AuthContextProvider>
            <TestComponent />
         </AuthContextProvider>,
      );

      expect(screen.getByText("Logged Out")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /login/i }));

      await waitFor(() => {
         expect(localStorage.getItem("token")).toBe("fake-jwt-token");
      });

      expect(screen.getByText("Logged In")).toBeInTheDocument();

      expect(mockFetch).toHaveBeenCalledWith(
         "http://localhost:3000/api/users/login",
         expect.objectContaining({
            method: "POST",
         }),
      );
   });

   it("removes token on logout", async () => {
      localStorage.setItem("token", "fake-token");

      const user = userEvent.setup();

      render(
         <AuthContextProvider>
            <TestComponent />
         </AuthContextProvider>,
      );

      await user.click(screen.getByRole("button", { name: /logout/i }));

      expect(localStorage.getItem("token")).toBeNull();
      expect(screen.getByText("Logged Out")).toBeInTheDocument();
   });
});
