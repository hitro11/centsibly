import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import { logger } from './logger.js';
import { DATABASE_NAME } from './constants.js';
import { loadEnv } from '../../loadEnv.js';
loadEnv();

const client = new MongoClient(process.env.DB_CONNECTION_STRING, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let database: Db;

export async function connectToDB() {
    try {
        await client.connect();
        database = client.db(DATABASE_NAME);
    } catch (e) {
        logger.error(`Failed to connect to ${DATABASE_NAME} DB: `, e);
        throw e;
    }
}

export async function getDb(): Promise<Db> {
    try {
        if (!database) {
            await connectToDB();
        }
        return database;
    } catch (e) {
        throw e;
    }
}
