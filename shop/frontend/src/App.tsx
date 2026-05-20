import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { MainLayout } from "./components/layout/MainLayout";
import { SidebarFilter } from "./components/SidebarFilter";

type EventType = {
   id: number;
   title: string;
   description: string;
   city: string;
   category: string;
   event_time: string;
   event_date: string;
   duration: number;
   venue_id: number;
   price: number;
   tix_available: number;
};

function App() {
   const [events, setEvents] = useState<EventType[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const cities = [...new Set(events.map((event) => event.city))]
   const [selectedCity, setSelectedCity] = useState('')
   const categories = [...new Set(events.map((event) => event.category))]

   useEffect(() => {
      const fetchEvents = async () => {
         try {
            const res = await fetch("http://localhost:3000/api/events");
            if (!res.ok) throw new Error("Failed to fetch events");
            const data = await res.json();
            // console.log(data);
            setEvents(data.events);
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

   return (
      <>
         <div className="min-h-screen bg-black text-white">
            <Navbar />

            <MainLayout
               sidebar={
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                     <h2 className="mb-4 text-lg font-semibold">Filters</h2>

                     <SidebarFilter label="City" options={cities} value={selectedCity} onChange={setSelectedCity}/>

                     {/* <SidebarFilter label="Category" options={categories}/> */}
                  </div>
               }
            >
               <h1 className="mb-6 text-4xl font-bold">Upcoming</h1>

               <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
                  Content...
               </div>
            
            </MainLayout>
         </div>

         <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {events.map((event) => (
               <p key={event.id}>{event.title}</p>
            ))}
         </div>

      </>
   );
}

export default App;
