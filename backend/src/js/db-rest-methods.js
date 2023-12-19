import { MongoClient, ObjectId } from 'mongodb';
import { MONGODB_URI, DB_COLLECTIONS, DB_NAME } from '../../server-settings.js';

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

export async function experiments_get() {
    const database = client.db(DB_NAME);
    const collection = database.collection('Experiments');
    const data = await collection.find({}).toArray((err, result)=>{
        if (err) throw err;
    })
    return data;
}

export async function experiment_get(query) {
    if (!query)
        return {}
    const database = client.db(DB_NAME);
    const collection = database.collection('Experiments');
    const data = await collection.find(query).toArray((err, result)=>{
        if (err) throw err;
    })
    let drones = [];
    for ( const info of data )
    {
        for ( const droneId of info.dronesInfo )
        {
            const newData = await drone_info_get( { _id: new ObjectId( droneId ) } );
            drones = drones.concat( newData );
        }
    }
    return drones;
}

export async function experiment_post(data) {
    const database = client.db(DB_NAME);
    const collection = database.collection('Experiments');
    await collection.insertMany(data);
}

export async function drones_info_get() {
    const database = client.db(DB_NAME);
    const collection = database.collection('DronesInfo');
    const data = await collection.find({}).toArray((err, result)=>{
        if (err) throw err;
    })
    return data;
}

export async function drone_info_get(query) {
    if (!query)
        return {}
    const database = client.db(DB_NAME);
    const collection = database.collection('DronesInfo');
    const data = await collection.find(query).toArray((err, result)=>{
        if (err) throw err;
    })
    return data;
}

export async function drone_info_post(data) {
    const database = client.db(DB_NAME);
    const collection = database.collection('DronesInfo');
    await collection.insertMany(data);
}

export async function drones_note_get() {
    const database = client.db(DB_NAME);
    const collection = database.collection('DronesNote');
    const data = await collection.find({}).toArray((err, result)=>{
        if (err) throw err;
    })
    return data;
}

export async function drone_note_get(query) {
    if (!query)
        return {}
    const database = client.db(DB_NAME);
    const collection = database.collection('DronesNote');
    const data = await collection.find(query).toArray((err, result)=>{
        if (err) throw err;
    })
    return data;
}

export async function drone_note_post(data) {
    const database = client.db(DB_NAME);
    const collection = database.collection('DronesNote');
    await collection.insertMany(data);
}