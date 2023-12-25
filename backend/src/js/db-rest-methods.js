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

export async function experiments_get(query) {
    try {
        const database = client.db(DB_NAME);
        const collection = database.collection('Experiments');
        const data = await collection.find(query).toArray()
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
            const new_query = {
                _id: droneId
            }
            if (query.name != undefined) {
                new_query.name = query.name
            }
            const newData = await drone_info_get(new_query);
            if (Object.keys(newData).length !== 0) {
                drones = drones.concat( newData );
            }
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
            const new_query = {
                _id: noteId
            }
            if (query.time != undefined) {
                new_query.time = query.time
            }
            if (query.pos_x != undefined) {
                new_query.pos_x = query.pos_x
            }
            if (query.pos_y != undefined) {
                new_query.pos_y = query.pos_y
            }
            if (query.pos_z != undefined) {
                new_query.pos_z = query.pos_z
            }
            if (query.vel_x != undefined) {
                new_query.vel_x = query.vel_x
            }
            if (query.vel_y != undefined) {
                new_query.vel_y = query.vel_y
            }
            if (query.vel_z != undefined) {
                new_query.vel_z = query.vel_z
            }
            if (query.roll != undefined) {
                new_query.roll = query.roll
            }
            if (query.pitch != undefined) {
                new_query.pitch = query.pitch
            }
            if (query.yawl != undefined) {
                new_query.yawl = query.yawl
            }
            if (query.ang_vel_x != undefined) {
                new_query.ang_vel_x = query.ang_vel_x
            }
            if (query.ang_vel_y != undefined) {
                new_query.ang_vel_y = query.ang_vel_y
            }
            if (query.ang_vel_z != undefined) {
                new_query.ang_vel_z = query.ang_vel_z
            }
            if (query.rpm0 != undefined) {
                new_query.rpm0 = query.rpm0
            }
            if (query.rpm1 != undefined) {
                new_query.rpm1 = query.rpm1
            }
            if (query.rpm2 != undefined) {
                new_query.rpm2 = query.rpm2
            }
            if (query.rpm3 != undefined) {
                new_query.rpm3 = query.rpm3
            }
            const newData = await drone_note_get( new_query );

            if (Object.keys(newData).length !== 0) {
                notes = notes.concat( newData );
            }
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
            pos_x: parseFloat(data.value.pos_x),
            pos_y: parseFloat(data.value.pos_y),
            pos_z: parseFloat(data.value.pos_z),
            vel_x: parseFloat(data.value.vel_x),
            vel_y: parseFloat(data.value.vel_y),
            vel_z: parseFloat(data.value.vel_z),
            roll: parseFloat(data.value.roll),
            pitch: parseFloat(data.value.pitch),
            yawl: parseFloat(data.value.yawl),
            ang_vel_x: parseFloat(data.value.ang_vel_x),
            ang_vel_y: parseFloat(data.value.ang_vel_y),
            ang_vel_z: parseFloat(data.value.ang_vel_z),
            rpm0: parseInt(data.value.rpm0, 10),
            rpm1: parseInt(data.value.rpm1, 10),
            rpm2: parseInt(data.value.rpm2, 10),
            rpm3: parseInt(data.value.rpm3, 10)
        }
        const id = await collection.insertOne(data_add);
        collection = database.collection('DronesInfo');
        await collection.updateOne({_id: new ObjectId(data.id)}, {$push: {notes: id.insertedId} })
    }
    catch(error) {
        console.log(error)
    }
}

export async function export_data() {
    const data = {};
    const database = client.db(DB_NAME);
    data['Experiments'] = await database.collection('Experiments').find().toArray();
    data['DronesInfo']  = await database.collection('DronesInfo').find().toArray();
    data['DronesNote']  = await database.collection('DronesNote').find().toArray();
    return data;
}

export async function import_data(data)
{
    const database = client.db(DB_NAME);

    const experiments = data['Experiments'] || [];
    const dronesInfo  = data['DronesInfo']  || [];
    const dronesNote  = data['DronesNote']  || [];

    for (const experiment of experiments) {
        experiment['_id'] = new ObjectId(experiment['_id']);
        experiment['creationDate'] = new Date(experiment['creationDate']);
        experiment['changedDate']  = new Date(experiment['changedDate']);
        experiment['dronesInfo']   = experiment['dronesInfo'].map(drone => new ObjectId(drone));
    }
    for (const droneInfo of dronesInfo) {
        droneInfo['_id'] = new ObjectId(droneInfo['_id']);
        droneInfo['notes'] = droneInfo['notes'].map(note => new ObjectId(note));
    }
    for (const droneNote of dronesNote) {
        droneNote['_id'] = new ObjectId(droneNote['_id']);
        droneNote['droneID'] = new ObjectId(droneNote['droneID']);
        droneNote['time'] = new Date(droneNote['time']);
    }

    try {
        await database.collection('Experiments').insertMany(experiments, {ordered: true});
        await database.collection('DronesInfo').insertMany(dronesInfo, {ordered: true});
        await database.collection('DronesNote').insertMany(dronesNote, {ordered: true});
    }
    catch (e) {
        console.error(e)
        return false;
    }
    
    return true;
}