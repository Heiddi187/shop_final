export function AboutPage() {
   return (
      <div className="bg-black">
         <main className="max-w-4xl mx-auto px-6 py-10 text-white">
            <h1 className="text-4xl font-bold mb-6">About TicketHub</h1>

            <p className="text-lg text-gray-300 mb-8">
               TicketHub is a full-stack event ticketing application built with
               React, TypeScript, Express, and PostgreSQL.
            </p>

            <section className="mb-8">
               <h2 className="text-2xl font-semibold mb-4">Features</h2>

               <ul className="list-disc pl-6 space-y-2">
                  <li>Browse upcoming events</li>
                  <li>Filter by city, venue, category and search term</li>
                  <li>Create an account and login</li>
                  <li>Purchase tickets</li>
                  <li>View purchased tickets</li>
               </ul>
            </section>

            <section className="mb-8">
               <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>

               <div className="grid md:grid-cols-2 gap-6">
                  <div>
                     <h3 className="font-bold mb-2">Frontend</h3>
                     <ul className="list-disc pl-6">
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>Vite</li>
                        <li>Tailwind CSS</li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="font-bold mb-2">Backend</h3>
                     <ul className="list-disc pl-6">
                        <li>Express</li>
                        <li>PostgreSQL</li>
                        <li>JWT Authentication</li>
                        <li>pg-promise</li>
                     </ul>
                  </div>
               </div>
            </section>

            <section>
               <h2 className="text-2xl font-semibold mb-4">Deployment</h2>

               <ul className="list-disc pl-6">
                  <li>Frontend hosted on Vercel</li>
                  <li>Backend hosted on Railway</li>
                  <li>Database hosted on Railway PostgreSQL</li>
               </ul>
            </section>
         </main>
      </div>
   );
}
