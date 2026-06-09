export async function getVenues() {
   const API_URL = import.meta.env.VITE_API_URL;
   const res = await fetch(`${API_URL}/api/venues`);
   
   if (!res.ok) throw new Error("Failed to fetch venues");
   
   const data = await res.json();

   return data;
}
