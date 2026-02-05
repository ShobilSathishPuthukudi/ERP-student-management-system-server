import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { seedAdmin } from './seed/seedAdmin.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

await connectDB();
await seedAdmin();

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
