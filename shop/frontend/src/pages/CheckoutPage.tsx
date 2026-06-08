import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { OrderSummaryCard } from "../components/OrderSummaryCard";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export function CheckoutPage() {
   const { cart, clearCart } = useCart();
   const { isAuthenticated } = useAuth();
   const navigate = useNavigate();
   const [paymentMethod, setPaymentMethod] = useState('creditcard')

   return (
      <>
         <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="mx-auto max-w-7xl p-6">
               <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                     <h1 className="text-4xl font-bold text-zinc-100">
                        Checkout
                     </h1>
                     <p className="text-zinc-400">
                        Review order before purchase
                     </p>

                     <Card className="mt-6 text-white rounded-2xl border border-zinc-800 bg-zinc-800 transition-all hover:border-cyan-400">
                        <CardContent>
                           <div>
                              <div className="grid gap-2">
                                 <Label htmlFor="email">Name</Label>
                                 <Input
                                    id="name"
                                    type="name"
                                    placeholder="user name"
                                    required
                                 />
                              </div>
                              <div className="mt-4 grid gap-2">
                                 <Label htmlFor="email">Email</Label>
                                 <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                 />
                              </div>
                              <div className="mt-4 grid gap-2">
                                 <Label htmlFor="email">Phone</Label>
                                 <Input
                                    id="tel"
                                    type="tel"
                                    placeholder="000-0000"
                                    required
                                 />
                              </div>
                           </div>
                        </CardContent>
                        <CardFooter className="bg-zinc-900">
                           <div>
                              <p className="text-lg font-bold">
                                 Payment Method
                              </p>
                              <RadioGroup
                                 defaultValue="creditcard"
                                 value={paymentMethod}
                                 onValueChange={setPaymentMethod}
                                 className="w-fit mt-2"
                              >
                                 <div className="flex items-center gap-3">
                                    <RadioGroupItem
                                       value="creditcard"
                                       id="r2"
                                    />
                                    <Label htmlFor="r2">Credit card</Label>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <RadioGroupItem
                                       value="compact"
                                       id="r3"
                                       
                                    />
                                    <Label htmlFor="r3">Ponzi crypto (coming soon)</Label>
                                 </div>
                              </RadioGroup>
                           </div>
                        </CardFooter>
                     </Card>

                     {paymentMethod === 'creditcard' && (
                        <Card className="mt-6 text-white rounded-2xl border border-zinc-800 bg-zinc-800 transition-all hover:border-cyan-400">
                           <CardContent>
                           <div>
                              <div className="grid gap-2">
                                 <Label htmlFor="email">Name on card</Label>
                                 <Input
                                    id="nameOnCard"
                                    type="text"
                                    placeholder="Name"
                                    required
                                 />
                              </div>
                              <div className="mt-4 grid gap-2">
                                 <Label htmlFor="email">Card Number</Label>
                                 <Input
                                    id="cardNumber"
                                    type="text"
                                    placeholder="1234-4567-8901-2345"
                                    required
                                 />
                              </div>
                              <div className="mt-4 grid gap-2">
                                 <Label htmlFor="email">Exp. date</Label>
                                 <Input
                                    id="exp"
                                    type="text"
                                    placeholder="00/00"
                                    required
                                 />
                              </div>
                              <p className="mt-2">*For display purposes only</p>
                           </div>
                        </CardContent>
                        </Card>
                     )}

                     <button
                        disabled={cart.length === 0}
                        onClick={() => {
                           if (!isAuthenticated) {
                              navigate('/login')
                              return;
                           }
                           clearCart();
                           navigate('/user'); 
                        }}
                        className="mt-6 w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition-colors hover:bg-cyan-300"
                     >
                        Complete Purchase
                     </button>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                     <OrderSummaryCard />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
