import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { MainLayout } from "./components/layout/MainLayout";
import { SidebarFilter } from "./components/SidebarFilter";
import { useEvents } from "./hooks/useEvents";
import { useVenues } from "./hooks/useVenues";
import { EventGrid } from "./components/events/EventGrid";

function App() {
   const { events } = useEvents();
   const { venues } = useVenues();

   const cities = [...new Set(events.map((event) => event.city))];
   const [selectedCity, setSelectedCity] = useState("");

   const categories = [...new Set(events.map((event) => event.category))];
   const [selectedCategory, setSelectedCategory] = useState("");

   const venueNames = venues.map((venue) => venue.name);
   const [selectedVenue, setSelectedVenue] = useState("");
   const venueMap = Object.fromEntries(
      venues.map((venue) => [venue.id, venue.name]),
   );

   const filteredEvents = events.filter((event) => {
      const matchCity =
         selectedCity === "" ||
         event.city === selectedCity;

      const matchCategory =
         selectedCategory === "" || 
         event.category === selectedCategory

      const matchVenue =
         selectedVenue === "" ||
         venueMap[event.venue_id] === selectedVenue

      return (
         matchCity &&
         matchCategory &&
         matchVenue
      )
   })

   return (
      <>
         <div className="min-h-screen bg-black text-white">
            <Navbar />

            <MainLayout
               sidebar={
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
                     <h2 className="mb-4 text-lg font-semibold">Filters</h2>

                     <SidebarFilter
                        label="City"
                        options={cities}
                        value={selectedCity}
                        onChange={setSelectedCity}
                        allLabel="All Cities"
                     />

                     <SidebarFilter
                        label="Category"
                        options={categories}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        allLabel="All Categories"
                     />

                     <SidebarFilter
                        label="Venue"
                        options={venueNames}
                        value={selectedVenue}
                        onChange={setSelectedVenue}
                     />
                  </div>
               }
            >
               <h1 className="mb-6 text-4xl font-bold">Upcoming</h1>

               <EventGrid events={filteredEvents} venueMap={venueMap} />
            </MainLayout>
         </div>

         {/* <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {events.map((event) => (
               <p key={event.id}>{event.title}</p>
            ))}
         </div> */}
      </>
   );
}

export default App;
