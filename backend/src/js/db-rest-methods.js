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
    try {
        const database = client.db(DB_NAME);
        const collection = database.collection('Experiments');
        const data = await collection.find({}).toArray()
        if (!data) {
            return []
        }
        return data;
    }
    catch(error) {
        console.log(error)
    }
}

export async function experiment_get(query) {
    try {
        if (!query)
            return {}
        const database = client.db(DB_NAME);
        const collection = database.collection('DronesInfo');
        const data = await collection.findOne(query).toArray()
        if (!data) {
            return {}
        }
        return data;
    }
    catch(error) {
        console.log(error)
    }
}

export async function experiment_post(data) {
    try {
        const database = client.db(DB_NAME);
        const collection = database.collection('Experiments');
        const data_add = {
            'name': data.name,
            'creationDate': new Date(),
            'changedDate': new Date(),
            'dronesInfo': [],
            'timeAmount': 0
        }
        await collection.insertOne(data_add);
    }
    catch(error) {
        console.log(error)
    }
}

export async function experiment_get_drones(query){
    try {
        if (!query)
            return []
        const database = client.db(DB_NAME);
        const collection = database.collection('Experiments');
        const data = await collection.findOne({ _id: new ObjectId( query._id ) })
        if (!data) {
            return []
        }
        let drones = [];
        if (!data.dronesInfo)
            return []
        for ( const droneId of data.dronesInfo ) {
            const newData = await drone_info_get( { _id: droneId } );
            drones = drones.concat( newData );
        }
        return drones;
    }
    catch(error) {
        console.log(error)
    }
}

export async function drones_info_get() {
    try {
        const database = client.db(DB_NAME);
        const collection = database.collection('DronesInfo');
        const data = await collection.find({}).toArray()
        if (!data) {
            return []
        }
        return data;
    }
    catch(error) {
        console.log(error)
    }
}

export async function drone_info_get(query) {
    try {
        if (!query)
            return {}
        const database = client.db(DB_NAME);
        const collection = database.collection('DronesInfo');
        const data = await collection.findOne(query)
        if (!data) {
            return {}
        }
        return data;
    }
    catch(error) {
        console.log(error)
    }
}

export async function drone_info_post(data) {
    try {
        const database = client.db(DB_NAME);
        let collection = database.collection('DronesInfo');
        const data_add = {
            'name': data.value.name,
            'notes': []
        }
        const id = await collection.insertOne(data_add);
        collection = database.collection('Experiments');
        await collection.updateOne({_id: new ObjectId(data.id)}, {$push: {dronesInfo: id.insertedId} })
    }
    catch(error) {
        console.log(error)
    }
}

export async function drone_info_get_notes(query){
    try {
        if (!query)
            return []
        const database = client.db(DB_NAME);
        const collection = database.collection('DronesInfo');
        const data = await collection.findOne({ _id: new ObjectId( query._id ) })
        if (!data) {
            return []
        }
        let notes = [];
        if (!data.notes)
            return []
        for ( const noteId of data.notes ) {
            const newData = await drone_note_get( { _id: noteId } );
            notes = notes.concat( newData );
        }
        return notes;
    }
    catch(error) {
        console.log(error)
    }
}

export async function drones_note_get() {
    try {
        const database = client.db(DB_NAME);
        const collection = database.collection('DronesNote');
        const data = await collection.find({}).toArray()
        if (!data) {
            return []
        }
        return data;
    }
    catch(error) {
        console.log(error)
    }
}

export async function drone_note_get(query) {
    try {
        if (!query)
            return {}
        const database = client.db(DB_NAME);
        const collection = database.collection('DronesNote');
        const data = await collection.findOne(query)
        if (!data) {
            return {}
        }
        return data;
    }
    catch(error) {
        console.log(error)
    }
}

export async function drone_note_post(data) {
    try {
        const database = client.db(DB_NAME);
        let collection = database.collection('DronesNote');
        const data_add = {
            droneID: new ObjectId(data.id),
            time: new Date(data.value.time),
            pos_x: data.value.pos_x,
            pos_y: data.value.pos_y,
            pos_z: data.value.pos_z,
            vel_x: data.value.vel_x,
            vel_y: data.value.vel_y,
            vel_z: data.value.vel_z,
            roll: data.value.roll,
            pitch: data.value.pitch,
            yawl: data.value.yawl,
            ang_vel_x: data.value.ang_vel_x,
            ang_vel_y: data.value.ang_vel_y,
            ang_vel_z: data.value.ang_vel_z,
            rpm0: data.value.rpm0,
            rpm1: data.value.rpm1,
            rpm2: data.value.rpm2,
            rpm3: data.value.rpm3
        }
        const id = await collection.insertOne(data_add);
        collection = database.collection('DronesInfo');
        await collection.updateOne({_id: new ObjectId(data.id)}, {$push: {notes: id.insertedId} })
    }
    catch(error) {
        console.log(error)
    }
}