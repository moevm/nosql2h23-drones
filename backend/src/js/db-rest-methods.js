import { MongoClient } from 'mongodb';
import { MONGODB_URI, DB_NAMES, DB_COLLECTIONS } from '../../server-settings.js';

var client = null;

export function open_connection() {
    if (client)
        close_connection();
    client = new MongoClient(MONGODB_URI);
    console.log('DB connection opened!');
}

export function close_connection() {
    client.close();
    console.log('DB connection closed!');
}

function validate(databaseName, collectionName) {
    return DB_NAMES.has(databaseName) && DB_COLLECTIONS.has(collectionName);
}

export async function post(databaseName, collectionName, data) {
    if (!validate(databaseName, collectionName))
        return null;
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    await collection.insertMany(data);
}

export async function get(databaseName, collectionName, query) {
    if (!validate(databaseName, collectionName))
        return null;
    if (!query)
        query = {}
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    const data = collection.find(query).toArray(function(err, result) {
        if (err) throw err;
    })
    return data;
}