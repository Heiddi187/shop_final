import { SidebarFilter } from "../SidebarFilter";

type EventFiltersProps = {
   cities: string[];
   categories: string[];
   venueNames: string[];

   selectedCity: string;
   selectedCategory: string;
   selectedVenue: string;

   setSelectedCity: (value: string) => void;
   setSelectedCategory: (value: string) => void;
   setSelectedVenue: (value: string) => void;

   searchQuery: string;
   setSearchQuery: (value: string) => void;
};

export function EventFilters({
   cities,
   categories,
   venueNames,

   selectedCity,
   selectedCategory,
   selectedVenue,

   setSelectedCity,
   setSelectedCategory,
   setSelectedVenue,

   searchQuery,
   setSearchQuery,
}: EventFiltersProps) {
   return (
      <>
         <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 mb-6">
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

            <div className="mb-6">
               <label className="mb-2 block text-lg font-semibold text-white">
                  Search
               </label>

               <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Title, description, venue, city or category"
                  className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-cyan-400"
               />
            </div>
         </div>
      </>
   );
}
