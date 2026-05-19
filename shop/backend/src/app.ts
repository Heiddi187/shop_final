import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import eventRoutes from './routes/eventRoutes';
import venueRoutes from './routes/venueRoutes';
import userRoutes from './routes/userRoutes';
import ticketRoutes from './routes/ticketRoutes';
import cors from 'cors';

export const createApp = () => {
    const app = express();
    
    app.use(cors({origin: 'http://localhost:5173'}));
    
    app.use(express.json());

    app.use('/api/events', eventRoutes); 
    app.use('/api/venues', venueRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/tickets', ticketRoutes);

    app.use(errorHandler)

    return app;
}