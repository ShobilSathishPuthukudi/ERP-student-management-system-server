
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/modules/auth/user.model.js';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

const listUsers = async () => {
    await connectDB();
    try {
        const users = await User.find({});
        console.log('--- All Users ---');
        users.forEach(u => {
            console.log(`ID: ${u._id}, Name: ${u.name}, Email: ${u.email}, Role: ${u.role}`);
        });
        console.log('-----------------');
    } catch (error) {
        console.error('Error listing users:', error);
    } finally {
        await mongoose.disconnect();
    }
};

listUsers();
