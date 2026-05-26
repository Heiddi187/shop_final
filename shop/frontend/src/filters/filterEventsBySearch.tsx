import type { EventType } from "../shared/types";

export function filterEventsBySearch(
   events: EventType[],
   searchQuery: string,
   venueMap: Record<number, string>,
): EventType[] {
   const q = searchQuery.trim().toLowerCase();

   if (!q) {
      return events;
   }

   return events.filter((e) => {
      const venueName = 
        venueMap[e.venue_id]?.toLowerCase() || "";

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
