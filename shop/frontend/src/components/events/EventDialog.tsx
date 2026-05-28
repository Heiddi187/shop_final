import { Button } from "../ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "../ui/dialog";
import type { EventType } from "../../shared/types";

type EventDialogProps = {
   event: EventType | null;
   venueName?: string;
   onClose: () => void;
};

export function EventDialog({ event, venueName, onClose }: EventDialogProps) {
   if (!event) {return null}
   
    const formattedDate = new Date(
        event.event_date
    ).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

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
                        {venueName} - {event.city}
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
                        <div className="h-32 rounded-xl bg-zinc-800">
                            
                            <p className="text-zinc-300">{event.description}</p>
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
                              ${event.price}
                            </p>
                        </div>
                     </div>

                     <Button>
                        Add to Cart button here
                     </Button>
                  </div>
               </>
            )}
         </DialogContent>
      </Dialog>
   );
}
