import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { TicketCard } from "../components/tickets/TicketCard";
// import { useCart } from "../context/CartContext";
// import { useState } from "react";

type Ticket = {
   ticket_id: number;
   title: string;
   quantity: number;
   total_price: number;
   ticket_status: string;
   event_date: string;
   event_time: string;
   venue: string;
};

type UserTicketsResponse = {
   data: {
      event_count: number;
      total_spent: number;
   };
   tickets: Ticket[];
};

export function UserPage() {
   const API_URL = import.meta.env.VITE_API_URL;
   const { isAuthenticated, token } = useAuth();
   const [data, setData] = useState<UserTicketsResponse | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const navigate = useNavigate();

   useEffect(() => {
      if (!isAuthenticated) {
         navigate("/login");
      }
   }, [isAuthenticated, navigate]);

   useEffect(() => {
      if (!isAuthenticated || !token) {
         setLoading(false);
         return;
      }

      const fetchData = async () => {
         try {
            setLoading(true);
            const response = await fetch(
               `${API_URL}/api/tickets/user`,
               {
                  method: "GET",
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${token}`,
                  },
               },
            );

            if (!response.ok) {
               throw new Error(`HTTP Error: ${response.status}`);
            }

            const result: UserTicketsResponse = await response.json();
            setData(result);
         } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, [token, isAuthenticated]);

   if (loading) {
      return <p>Loading...</p>;
   }

   if (error) {
      return <p>Error: {error}</p>;
   }
   const activeTickets =
      data?.tickets.filter((ticket) => ticket.ticket_status === "bought") ?? [];
   const activeEventTitles = activeTickets.map((ticket) => ticket.title);

   const hasDuplicateActiveEvents =
      new Set(activeEventTitles).size !== activeEventTitles.length;

   return (
      <>
         <div className="min-h-screen bg-black text-white">
            <Navbar />
            <div className="mx-auto max-w-7xl p-6">
               <div className="mx-auto max-w-4xl p-6">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 space-y-3">
                     <h1 className="text-4xl font-bold text-zinc-100">
                        Your Tickets
                     </h1>
                     <p className="text-zinc-400">
                        Events Purchased: {data?.data.event_count}
                     </p>
                     {hasDuplicateActiveEvents && (
                        <p className="rounded-xl border border-yellow-500 bg-yellow-500/10 p-3 text-yellow-400">
                           Warning: You have multiple active purchases for the
                           same event.
                        </p>
                     )}
                     <p className="text-zinc-400">
                        Total Spent:{" "}
                        {data?.data.total_spent.toLocaleString("de-DE")} kr
                     </p>
                     {data?.tickets.map((ticket) => (
                        <TicketCard key={ticket.ticket_id} ticket={ticket} />
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
