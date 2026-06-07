import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function OrderCompletePage() {
   const navigate = useNavigate();
   useEffect(() => {
      const timer = setTimeout(() => {
         navigate("/");
      }, 5000);

      return () => clearTimeout(timer);
   }, [navigate]);

   return (
      <>
         <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
               <h1 className="text-4xl font-bold text-zinc-100">
                  Payment Successful
               </h1>
               <p className="text-zinc-400">
                  Your tickets have been added to your account
               </p>
               <p className="mt-10 text-xs text-zinc-400">Click {' '}
                <Link
                    to={'/'}
                    className="text-cyan-400 hover:underline"
                >
                    here 
                </Link>
                {' '}if you are not redirected
               </p>
            </div>
         </div>
         
      </>
   );
}
