import { useCart } from "../context/CartContext";

export function OrderSummaryCard() {
   const { cart } = useCart();
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
                              <div>
                                 <p className="font-semibold">
                                    {item.event.title}
                                 </p>
                                 <p className="text-sm text-zinc-400">
                                    {item.quantity} *{" "}
                                    {item.event.price.toLocaleString()} kr
                                 </p>
                                 <p className="text-sm text-zinc-400">
                                    {(
                                       item.quantity * item.event.price
                                    ).toLocaleString()}{" "}
                                    kr
                                 </p>
                              </div>
                           </li>
                        ))}
                     </ul>
                     <div className="mb-6 border-t border-zinc-800 pt-4">
                        <div className="">
                           <p>Events: {eventCount}</p>
                           <p>Tickets: {itemCount}</p>
                        </div>

                        <div className="mt-6 border-t border-zinc-800 pt-4">
                           <p className="text-cyan-400 font-bold">
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
