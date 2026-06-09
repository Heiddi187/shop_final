import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import eventRoutes from './routes/eventRoutes.js';
import venueRoutes from './routes/venueRoutes.js';
import userRoutes from './routes/userRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import cors from 'cors';

export const createApp = () => {
    const app = express();
    
    app.use(cors());
    
    app.use(express.json());

    app.use('/api/events', eventRoutes); 
    app.use('/api/venues', venueRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/tickets', ticketRoutes);

    app.use(errorHandler)

    return app;
}