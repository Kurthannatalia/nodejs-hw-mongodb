import { setupServer } from './server.js';
console.log("MongoDB URL:", process.env.MONGODB_URL);
console.log("MongoDB USER:", process.env.MONGODB_USER);
console.log("MongoDB PASSWORD:", process.env.MONGODB_PASSWORD);
console.log("MongoDB DB:", process.env.MONGODB_DB);
import { initMongoConnection } from './db/initMongoConnection.js';
import 'dotenv/config';

const appLauncher = async () => {
    try {
        await initMongoConnection();
        setupServer();
    } catch (error) {
        console.error('Error launching the app:', error.message);
        process.exit(1); 
    }
};

appLauncher();
