import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from './pages/HomePage'

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { MainLayout } from "./components/layout/MainLayout";
import { useEvents } from "./hooks/useEvents";
import { useVenues } from "./hooks/useVenues";
import { EventGrid } from "./components/events/EventGrid";
import { EventFilters } from "./components/events/EventFilters";
import { filterEventsBySearch } from "./filters/filterEventsBySearch";

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

   return (
      <BrowserRouter>
         <Routes>
            <Route 
               path="/"
               element={<HomePage />}
            />
            <Route
               path="/about"
               // element={<AboutPage />}
            />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
