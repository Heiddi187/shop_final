import type { EventType } from "../../shared/types";

type EventCardProps = {
   event: EventType;
   venueName?: string;
};

export function EventCard({ event, venueName }: EventCardProps) {
    const formattedDate = new Date(
        event.event_date
    ).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })

   return (
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:border-cyan-400">
         <img
            src="https://c8.alamy.com/comp/R7XW2T/a-generic-concert-crowd-waits-for-the-beginning-of-the-show-in-2018-R7XW2T.jpg"
            alt="image broken"
         />
         <div className="flex flex-1 flex-col p-6">
            <div className="mb-4">
               <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
                  {event.category}
               </span>
            </div>

            <h2 className="mb-3 text-2xl font-bold text-white">
               {event.title}
            </h2>

            {venueName && (
               <p className="mb-2 text-sm text-zinc-400">{venueName}</p>
            )}

            <p className="mb-2 text-sm text-zinc-400">{event.city}</p>

            <p className="mb-2 text-sm text-zinc-400">{formattedDate}</p>

            <div className="mt-auto flex items-center justify-between">
               <button className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black transition-colors hover:bg-cyan-300">
                  View Event
               </button>
            </div>
         </div>
      </div>
   );
}
