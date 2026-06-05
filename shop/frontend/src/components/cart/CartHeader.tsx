import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { CartDialog } from "./CartDialog";
import { useState } from "react";

const CartHeader = () => {
   const { cart } = useCart();
   const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
   const [showDropdown, setShowDropdown] = useState(false);

   return (
      <>
         <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)}>
               <FaShoppingCart className="text-2xl text-zinc-300 hover:text-cyan-400 transition-colors" />
               {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                     {itemCount}
                  </span>
               )}
            </button>
            {showDropdown && (
               <div className="absolute right-0 mt-2 z-50 top-full">
                  <div>
                     <CartDialog
                        onClose={() => setShowDropdown(false)}
                        open={true}
                     />
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default CartHeader;
