import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import { AuthContextProvider } from "./auth/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <AuthContextProvider>
      <CartProvider>
         <App />
      </CartProvider>
      </AuthContextProvider>
   </StrictMode>,
);
