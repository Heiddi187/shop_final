import CartHeader from "./cart/CartHeader";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
   const { isAuthenticated, logout } = useAuth();
   const navigate = useNavigate();
   // console.log(login);
   // console.log(isAuthenticated);

   return (
      <header className="border-b border-zinc-800 bg-black">
         <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-cyan-400" />
               <h1 className="text-xl font-bold text-white">Tickethub</h1>
            </div>

            <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
               <Link 
                  to="/" 
                  className="transition-colors hover:text-cyan-400"
               >
                  Home
               </Link>

               <Link 
                  to="/something" 
                  className="transition-colors hover:text-cyan-400"
               >
                  Something
               </Link>

               <Link 
                  to="/about" 
                  className="transition-colors hover:text-cyan-400"
               >
                  About
               </Link>
            </nav>

            <div className="flex items-center gap-3">
               {isAuthenticated ? (
                  <div className="space-x-3">
                     <button
                        onClick={logout}
                        className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2 text-sm font-medium text-white"
                     >
                        Logout
                     </button>
                     <button
                        onClick={() => navigate("/user")}
                        className="btn-primary"
                     >
                        My Tickets
                     </button>
                  </div>
               ) : (
                  <div className="space-x-3">
                     <button
                        onClick={() => navigate("/login")}
                        className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2 text-sm font-medium text-white"
                     >
                        Login
                     </button>
                     <button
                        onClick={() => navigate("/signup")}
                        className="btn-primary"
                     >
                        Sign Up
                     </button>
                  </div>
               )}

               <CartHeader />
            </div>
         </div>
      </header>
   );
}
