import { useEffect, useState } from "react";
import type { VenueType } from "../shared/types"; 
import { getVenues } from "../api/getVenues"; 

export function useVenues() {
   const [venues, setVenues] = useState<VenueType[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchVenues = async () => {
         try {
            const data = await getVenues();
            // console.log(data);
            setVenues(data);
         } catch (err) {
            const message =
               err instanceof Error ? err.message : "Unknown Error";
            setError(message);
         } finally {
            setLoading(false);
         }
      };
      fetchVenues();
   }, []);

   return {
      venues,
      loading,
      error,
   };
}
