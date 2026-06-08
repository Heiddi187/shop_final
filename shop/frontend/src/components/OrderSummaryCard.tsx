import { useCart } from "../context/CartContext";
import { QuantitySelector } from "./QuantitySelector";

export function OrderSummaryCard() {
   const { cart, updateQuantity, removeFromCart } = useCart();
   const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
   const eventCount = cart.length;
   const total = cart.reduce(
      (acc, item) => acc + item.quantity * item.event.price,
      0,
   );

   return (
      <div>
         <h1 className="text-4xl font-bold text-zinc-100 mb-6">
            Order Summary
         </h1>
         <div>
            <div>
               {cart.length === 0 ? (
                  <p>Your cart is empty</p>
               ) : (
                  <>
                     <ul>
                        {cart.map((item) => (
                           <li
                              key={item.event.id}
                              className="flex items-center justify-between border-b border-zinc-800 py-4"
                           >
                              <div className="flex justify-between items-start">
                                 <div className="space-y-2">
                                    <p className="font-semibold">
                                       {item.event.title}
                                    </p>
                                    <p className="text-sm text-zinc-400">
                                       {item.quantity} *{" "}
                                       {item.event.price.toLocaleString()} kr
                                    </p>
                                    <p className="font-semibold text-zinc-200">
                                       {(
                                          item.quantity * item.event.price
                                       ).toLocaleString()}{" "}
                                       kr
                                    </p>
                                 </div>
                              </div>
                              <div className="mt-4 space-x-2 flex items-center justify-between">
                                 <QuantitySelector
                                    quantity={item.quantity}
                                    min={1}
                                    max={item.event.tix_available}
                                    onChange={(newQuantity) =>
                                       updateQuantity(
                                          item.event.id,
                                          newQuantity,
                                       )
                                    }
                                 />
                                 <button
                                    className=" text-red-500 hover:underline"
                                    onClick={() =>
                                       removeFromCart(item.event.id)
                                    }
                                 >
                                    Remove
                                 </button>
                              </div>
                           </li>
                        ))}
                     </ul>
                     <div className="flex justify-between border-b py-4 border-zinc-800 pt-4">
                        
                        <div>
                           <p className="text-sm">
                              {eventCount}. Event{eventCount > 1 ? "s" : ""}
                           </p>
                           <p className="text-sm">
                              {itemCount}. Ticket{itemCount > 1 ? "s" : ""}
                           </p>
                        </div>
                        <div>
                           <p className="text-cyan-400 font-bold text-2xl mt-1">
                              Total: {total.toLocaleString()} kr
                           </p>
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}
