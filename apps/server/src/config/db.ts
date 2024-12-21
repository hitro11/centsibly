import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import { logger } from './logger.js';
import { DATABASE_NAME } from './constants.js';

let client: MongoClient;
let database: Db;

export async function connectToDB() {
    if (!client) {
        initializeClient();
    }

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

function initializeClient() {
    logger.debug('DB: DB_CONNECTION_STRING' + process.env.DB_CONNECTION_STRING);

    client = new MongoClient(process.env.DB_CONNECTION_STRING, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });
}
