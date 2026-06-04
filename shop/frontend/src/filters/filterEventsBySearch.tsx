import type { EventType, VenueType } from "../shared/types";

export function filterEventsBySearch(
   events: EventType[],
   searchQuery: string,
   venueMap: Record<number, VenueType>,
): EventType[] {
   const q = searchQuery.trim().toLowerCase();

   if (!q) {
      return events;
   }

   return events.filter((e) => {
      const venueName = 
        venueMap[e.venue_id]?.name.toLowerCase() || "";

      return [
        e.title, 
        e.description, 
        e.category, 
        e.city, 
        venueName
    ].some((field) => 
        (field ?? "")
            .toLowerCase()
            .includes(q),
      );
   });
}
