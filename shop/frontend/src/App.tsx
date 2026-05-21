import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { MainLayout } from "./components/layout/MainLayout";
import { SidebarFilter } from "./components/SidebarFilter";
import { useEvents } from "./hooks/useEvents";

function App() {
   const { events, loading, error } = useEvents();

   const cities = [...new Set(events.map((event) => event.city))];
   const [selectedCity, setSelectedCity] = useState("");

   const categories = [...new Set(events.map((event) => event.category))];
   const [selectedCategory, setSelectedCategory] = useState("");

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
