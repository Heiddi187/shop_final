import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { MainLayout } from "../components/layout/MainLayout";
import { useEvents } from "../hooks/useEvents";
import { useVenues } from "../hooks/useVenues";
import { EventGrid } from "../components/events/EventGrid";
import { EventFilters } from "../components/events/EventFilters";
import { filterEventsBySearch } from "../filters/filterEventsBySearch";
import type { EventType } from "../shared/types";
import { EventDialog } from "../components/events/EventDialog";

export function HomePage() {
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
      const matchCity = selectedCity === "" || event.city === selectedCity;

      const matchCategory =
         selectedCategory === "" || event.category === selectedCategory;

      const matchVenue =
         selectedVenue === "" || venueMap[event.venue_id] === selectedVenue;

      return matchCity && matchCategory && matchVenue;
   });

   const [searchQuery, setSearchQuery] = useState("");
   const searchedEvents = filterEventsBySearch(
      filteredEvents,
      searchQuery,
      venueMap,
   );

   const [viewEvent, setViewEvent] = useState<EventType | null>(null);

   return (
      <>
         <div className="min-h-screen bg-black text-white">
            <Navbar />

            <MainLayout
               sidebar={
                  <EventFilters
                     cities={cities}
                     categories={categories}
                     venueNames={venueNames}
                     selectedCity={selectedCity}
                     selectedCategory={selectedCategory}
                     selectedVenue={selectedVenue}
                     setSelectedCity={setSelectedCity}
                     setSelectedCategory={setSelectedCategory}
                     setSelectedVenue={setSelectedVenue}
                     searchQuery={searchQuery}
                     setSearchQuery={setSearchQuery}
                  />
               }
            >
               <h1 className="mb-6 text-4xl font-bold">Upcoming</h1>

               {searchedEvents.length === 0 ? (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-12 text-center">
                     <h2 className="mb-2 text-2xl font-bold">
                        No events found
                     </h2>
                     <p className="text-zinc-400">
                        Try adjusting your filters or search
                     </p>
                  </div>
               ) : (
                  <EventGrid
                     events={searchedEvents}
                     venueMap={venueMap}
                     onViewEvent={setViewEvent}
                  />
               )}
            </MainLayout>
            
            <EventDialog
               event={viewEvent}
               venueName={viewEvent ? venueMap[viewEvent.venue_id] : ""}
               onClose={() => setViewEvent(null)}
            />
         </div>
      </>
   );
}
