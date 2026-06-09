export async function getEvents() {
   const API_URL = import.meta.env.VITE_API_URL;
   const res = await fetch(`${API_URL}/api/events`);
   
   if (!res.ok) throw new Error("Failed to fetch events");
   
   const data = await res.json();

   return data.events;
}
