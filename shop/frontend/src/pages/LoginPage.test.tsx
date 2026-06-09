import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginPage } from "./LoginPage";
import userEvent from "@testing-library/user-event";

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../auth/AuthContext", () => ({
   useAuth: () => ({
      login: mockLogin,
   }),
}));

vi.mock("react-router-dom", async () => {
   const actual = await vi.importActual("react-router-dom");

   return {
      ...actual,
      useNavigate: () => mockNavigate,
      Link: ({ children }: { children: React.ReactNode }) => (
         <span>{children}</span>
      ),
   };
});

beforeEach(() => {
    vi.clearAllMocks();
})

describe("LoginPage.tsx", () => {
   it('should submit login form and navigate to "/"', async () => {
      const user = userEvent.setup();

      mockLogin.mockResolvedValue(undefined);

      render(<LoginPage />);

      await user.type(screen.getByLabelText(/email/i), "test@test.net");

      await user.type(screen.getByLabelText(/password/i), "passwordtest");

      await user.click(screen.getByRole("button", { name: /login/i }));

      expect(mockLogin).toHaveBeenCalledWith("test@test.net", "passwordtest");

      await waitFor(() => {
         expect(mockNavigate).toHaveBeenCalledWith("/");
      });
   });

   it("should show alert when login fails", async () => {
      const user = userEvent.setup();

      mockLogin.mockRejectedValue(new Error("Login failed"));

      render(<LoginPage />);

      await user.type(screen.getByLabelText(/email/i), "test@test.net");

      await user.type(screen.getByLabelText(/password/i), "wrongpassword");

      await user.click(
         screen.getByRole("button", {
            name: /login/i,
         }),
      );

      expect(
         screen.getByText(/invalid email or password/i),
      ).toBeInTheDocument();

      expect(mockNavigate).not.toHaveBeenCalled();
   });
});
