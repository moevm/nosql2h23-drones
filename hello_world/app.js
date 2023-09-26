const { MongoClient } = require("mongodb")

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const database = client.db('dok')
        const collection = database.collection('svech')

        await collection.insertMany([{name: 'Ilya'}, {name: 'Roma'}, {name: 'Dmitry'}])

        const name = await collection.find().toArray(function(err, result) {
            if (err) throw err
            console.log(result)
        })
        console.log(name)
    } finally {
        await client.close()
    }
}

run().catch(console.dir)