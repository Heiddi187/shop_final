import { useEffect, useState } from "react";
import type { EventType } from "../shared/types";
import { getEvents } from "../api/getEvents";

export function useEvents() {
   const [events, setEvents] = useState<EventType[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const data = await getEvents();
            setEvents(data);
         } catch (err) {
            const message =
               err instanceof Error ? err.message : "Unknown Error";
            setError(message);
         } finally {
            setLoading(false);
         }
      };
      fetchEvents();
   }, []);

   return {
      events,
      loading,
      error,
   };
}
