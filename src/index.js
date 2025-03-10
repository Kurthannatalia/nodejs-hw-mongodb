import { setupServer } from './server.js';
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
