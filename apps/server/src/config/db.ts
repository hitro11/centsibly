import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import { logger } from './logger.js';
import { DATABASE_NAME } from './constants.js';
dotenv.config();

const client = new MongoClient(process.env.DB_CONNECTION_STRING, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

type Collection = 'accounts' | 'posts' | 'communities';
let database: Db;

export async function connectToDB() {
    try {
        await client.connect();
        database = client.db(DATABASE_NAME);
        logger.info(`Connected to ${DATABASE_NAME} DB successfully!`);
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
