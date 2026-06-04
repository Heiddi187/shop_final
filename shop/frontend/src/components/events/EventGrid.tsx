import type { EventType, VenueType } from "../../shared/types";
import { EventCard } from "./EventCard";

type EventGridProps = {
   events: EventType[];
   venueMap: Record<number, VenueType>;
   onViewEvent: (event: EventType) => void;
};

export function EventGrid({ events, venueMap, onViewEvent }: EventGridProps) {
   return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
         {events.map((event) => (
            <EventCard
               key={event.id}
               event={event}
               venueName={venueMap[event.venue_id]?.name}
               onViewEvent={onViewEvent}
            />
         ))}
      </div>
   );
}
