import dotenv from 'dotenv';
import path from 'path';

export const loadEnv = () => {
    const envPath = path.resolve(path.dirname(''), 'apps', 'server', '.env');
    dotenv.config({ path: envPath });
};
