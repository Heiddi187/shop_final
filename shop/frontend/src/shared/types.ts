export type EventType = {
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

export type VenueType = {
    id: number;
    name: string;
    address: string;
    capacity: number;
}

export type CartItemType = {
    event: EventType;
    quantity: number;
}