import CartHeader from "./cart/CartHeader";

export function Navbar() {
   return (
      <header className="border-b border-zinc-800 bg-black">
         <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-3">
               <div className="h-10 w-10 rounded-xl bg-cyan-400" />
               <h1 className="text-xl font-bold text-white">Tickethub</h1>
            </div>

            <nav className="hidden gap-8 text-sm text-zinc-300 md:flex">
               <a href="#" className="transition-colors hover:text-cyan-400">
                  Events
               </a>

               <a href="#" className="transition-colors hover:text-cyan-400">
                  Something
               </a>

               <a href="#" className="transition-colors hover:text-cyan-400">
                  About
               </a>
            </nav>

            <div className="flex items-center gap-3">
               <button className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
                  Log In
               </button>

               <button className="btn-primary">
                  Sign Up
               </button>
               <CartHeader />
            </div>
         </div>
      </header>
   );
}
