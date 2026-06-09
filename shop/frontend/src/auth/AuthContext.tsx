import { createContext, useContext, useState, type ReactNode } from "react";

type AuthContextType = {
   token: string | null;
   isAuthenticated: boolean;
   login: (email: string, password: string) => Promise<void>;
   signup: (name: string, email: string, password: string) => Promise<void>;
   logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: ReactNode }) {
   const [token, setToken] = useState<string | null>(
      localStorage.getItem("token"),
   );
   const isAuthenticated = !!token;

   const signup = async (name:string, email: string, password: string) => {
      const res = await fetch("http://localhost:3000/api/users/signup", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            name, 
            email,
            password,
         }),
      });

      if (!res.ok) {
         throw new Error("Signup failed");
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);

      setToken(data.token);
   };

   const login = async (email: string, password: string) => {
      const res = await fetch("http://localhost:3000/api/users/login", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            email,
            password,
         }),
      });

    //   console.log("status:", res.status);

      if (!res.ok) {
         throw new Error("Login failed");
      }

      const data = await res.json();

    //   console.log(data)

      localStorage.setItem("token", data.token);

      setToken(data.token);
   };

   const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
   };



   return (
      <AuthContext.Provider
         value={{
            token,
            isAuthenticated,
            login,
            signup,
            logout,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) throw new Error("useAuth must be inside AuthContextProvider");
   return context;
}
