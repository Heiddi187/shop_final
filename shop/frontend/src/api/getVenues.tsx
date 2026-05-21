export async function getVenues() {
   const res = await fetch("http://localhost:3000/api/venues");
   
   if (!res.ok) throw new Error("Failed to fetch venues");
   
   const data = await res.json();

   return data;
}
