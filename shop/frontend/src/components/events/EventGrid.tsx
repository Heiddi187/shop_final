import type { EventType, VenueType } from "../../shared/types";
import { EventCard } from "./EventCard";

type EventGridProps = {
   events: EventType[];
   venueMap: Record<number, VenueType>;
   onViewEvent: (event: EventType) => void;
};

export function EventGrid({ events, venueMap, onViewEvent }: EventGridProps) {
   const today = new Date();

   const upcomingEvents = events.filter(
      (event) => new Date(event.event_date) >= today
   );
  
   return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
         {upcomingEvents.map((event) => (
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
