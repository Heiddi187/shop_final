import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

type CartDialogProps = {
   open: boolean;
   onClose: () => void;
};

export function CartDialog({ onClose }: CartDialogProps) {
   const { removeFromCart, clearCart, cart } = useCart();
   const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
   const eventCount = cart.length;
   const total = cart.reduce(
      (acc, item) => acc + item.quantity * item.event.price,
      0,
   );

   const navigate = useNavigate();

   return (
      <div className="border border-zinc-800 bg-zinc-900 w-96 rounded-xl p-6 shadow-xl">
         <h1 className="text-2xl">Tickets:</h1>

         <div>
            {cart.length === 0 ? (
               <p className="text-sm mt-2">Your cart is empty</p>
            ) : (
               <>
                  <ul>
                     {cart.map((item) => (
                        <li
                           key={item.event.id}
                           className="flex items-center justify-between border-b border-zinc-800 py-4"
                        >
                           <div>
                              <p className="font-semibold">
                                 {item.event.title}
                              </p>
                              <p className="text-sm text-zinc-400">
                                 {item.quantity} * {item.event.price} kr
                              </p>
                           </div>
                           <button
                              onClick={() => removeFromCart(item.event.id)}
                              className="text-sm text-red-500 hover:underline"
                           >
                              Remove
                           </button>
                        </li>
                     ))}
                  </ul>
                  <div className="space-y-2 border-t border-zinc-800 pt-4">
                     <p>Events: {eventCount}</p>
                     <p>Tickets: {itemCount}</p>
                  </div>

                  <div className="text-lg font-semibold space-y-2 border-t border-zinc-800 pt-4">
                     <p>Total: {total} kr</p>
                  </div>

                  <button
                     className="mt-4 w-full rounded-xl border border-zinc-700 px-5 py-3 font-semibold bg-zinc-500"
                     onClick={clearCart}
                  >
                     Clear cart
                  </button>
                  <button 
                     onClick={() => {
                        onClose();
                        navigate('/checkout')
                     }}
                     className="mt-2 w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition-colors hover:bg-cyan-300"
                  >
                     Checkout
                  </button>
               </>
            )}
         </div>
      </div>
   );
}
