// bæta við image, addressu og category

import { Button } from "../ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "../ui/dialog";
import type { EventType, VenueType } from "../../shared/types";
import { useCart } from "../../context/CartContext";

type EventDialogProps = {
   event: EventType | null;
   venue: VenueType | null;
   onClose: () => void;
};

export function EventDialog({ event, venue, onClose }: EventDialogProps) {
   if (!event) {return null}
   
    const formattedDate = new Date(
        event.event_date
    ).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

    const { addToCart} = useCart();

   return (
      <Dialog
         open={!!event}
         onOpenChange={(open) => {
            if (!open) {
               onClose();
            }
         }}
      >
         <DialogContent className="border-zinc-800 bg-zinc-900 text-white sm:max-w-2xl">
            {event && (
               <>
                  <DialogHeader>
                     <DialogTitle className="text-3xl font-bold">
                        {event.title}
                     </DialogTitle>

                     <DialogDescription className="text-zinc-400">
                        {venue?.name} - {venue?.address}
                     </DialogDescription>

                     <div className="flex items-center justify-between py-6">
                        <div>
                           <p className="text-sm text-zinc-400">
                              Date:
                           </p>
                     
                           <p className="text-md font-bold">
                              {formattedDate}
                           </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-400">
                                Duration:
                            </p>
                            
                            <p className="text-md font-bold text-cyan-400">
                              {event.duration} min
                            </p>
                        </div>
                     </div>
                  </DialogHeader>

                  <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-zinc-800">
                            
                            <p className="text-zinc-300 py-2 px-2">{event.description}</p>
                        </div>
                     


                     <div className="flex items-center justify-between py-6">
                        <div>
                           <p className="text-sm text-zinc-400">
                              Tickets Left:
                           </p>
                     
                           <p className="text-md font-bold">
                              {event.tix_available}
                           </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-400">
                                Price:
                            </p>
                            
                            <p className="text-md font-bold text-cyan-400">
                              {event.price} kr.
                            </p>
                        </div>
                     </div>

                     <Button className="" onClick={() => addToCart(event, quantity)}>
                        Add to Cart button here
                     </Button>
                  </div>
               </>
            )}
         </DialogContent>
      </Dialog>
   );
}
