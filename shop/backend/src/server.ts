import dotenv from 'dotenv';
import { createApp } from './app.js';
import db from './config/db.js';

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3001;

(async () => {
    try {
        await db.one('SELECT 1');
        console.log('✅ Connected to PostgresSQL database')

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on: ${PORT}`);
        });
    } catch (err) {
        console.error('Database connection error: ,', err)
        process.exit(1);
    }
})();

// npm run dev
