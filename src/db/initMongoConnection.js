import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { getEnvVar } from '../utils/getEnvVar.js';

dotenv.config();

export const initMongoConnection = async () => {
    try {
        const user = getEnvVar('MONGODB_USER');
        const pwd = getEnvVar('MONGODB_PASSWORD');
        const url = getEnvVar('MONGODB_URL');
        const db = getEnvVar('MONGODB_DB');

        if (!user || !pwd || !url || !db) {
            throw new Error('Missing required MongoDB environment variables');
        }

        const uri = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`;
        console.log('Connecting to MongoDB:', uri);

        await mongoose.connect(uri);

        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.error('Error while setting up mongo connection', error);
        process.exit(1);
    }
};
