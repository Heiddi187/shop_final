type TicketCardProps = {
   ticket: {
      ticket_id: number;
      title: string;
      quantity: number;
      total_price: number;
      ticket_status: string;
      event_date: string;
      event_time: string;
      venue: string;
   };
};

export function TicketCard({ ticket }: TicketCardProps) {
   const formattedDate = new Date(
      ticket.event_date
   ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
   });

   return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-700 p-4">
         <h2 className="text-xl font-semibold">
            {ticket.title}
         </h2>

         <p className="mt-2 text-zinc-300">
            {ticket.venue}
         </p>

         <p className="text-zinc-400">
            {formattedDate} at {ticket.event_time.slice(0, 5)}
         </p>

         <div className="mt-4 space-y-1">
            <p>{ticket.quantity} tickets</p>

            <p>
               Paid:{" "}
               {ticket.total_price.toLocaleString('de-DE')} kr
            </p>

            <p>
               Status: {ticket.ticket_status}
            </p>
         </div>
         {ticket.ticket_status === 'bought' && (
            <button className="mt-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:border-red-500 hover:bg-zinc-700">
                Return Ticket Does noting
            </button>
         )}
      </div>
   );
}