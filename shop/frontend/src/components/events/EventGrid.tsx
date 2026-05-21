import type { EventType } from "../../shared/types";
import { EventCard } from "./EventCard";

type EventGridProps = {
   events: EventType[];
   venueMap: Record<number, string>;
};

export function EventGrid({ events, venueMap }: EventGridProps) {
   return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
         {events.map((event) => (
            <EventCard
               key={event.id}
               event={event}
               venueName={venueMap[event.venue_id]}
            />
         ))}
      </div>
   );
}
