import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import { logger } from './logger.js';
import { DATABASE_NAME } from './constants.js';

let client: MongoClient;

async function initDBclient(): Promise<void> {
    client = new MongoClient(process.env.DB_CONNECTION_STRING, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
}

export async function connectToDBclient(): Promise<void> {
    try {
        if (!client) {
            await initDBclient();
        }

        await client.connect();
    } catch (error) {}
}

export async function database(): Promise<Db> {
    if (!client) {
        await connectToDBclient();
    }

    return client.db(DATABASE_NAME);
}

export async function pingDB(): Promise<boolean> {
    try {
        const db = await database();
        const resp = await db.command({ ping: 1 });
        return resp.ok === 1 ? true : false;
    } catch (error) {
        throw error;
    }
}
