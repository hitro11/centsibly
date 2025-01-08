import dotenv from 'dotenv';
import path from 'path';

export const loadEnv = () => {
    dotenv.config();
    const envPath = process.env.NODE_ENV.length
        ? path.resolve('.env')
        : path.resolve(path.dirname(''), 'apps', 'server', '.env');
    dotenv.config({ path: envPath });
};
