const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://user:user@learningnode.ipsst.mongodb.net/?retryWrites=true&w=majority';
const db = 'test';

var find;
const connection = async (collection) => {
    await client.connect();
    const database = client.db(db);
    collection = database.collection(collection)
    // find = collection.find({title:"jnd"})
    // console.log(collection);
    // console.log(await collection.insertOne({title: 'me and you'}))
    // console.log(collection.find({}))
    return collection;
}
class dbConnect {
    constructor(collection) {
        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.collection = collection;
        this.connected = false

        this.open = async () => {
            console.log('attempting to connect mongodb', this.connected)
            if(this.connected == false){
                await this.client.connect();
                this.connected = true
                console.log('cconnectiong to mongodb ', this.connected)
            }
            const database = this.client.db(db);
            return database.collection(this.collection)
            // find = collection.find({title:"jnd"})
            // console.log(collection);
            // console.log(await collection.insertOne({title: 'me and you'}))
            // console.log(collection.find({}))
            

        }
        this.access = async () => {
            try {
                // const d = await connection(collection)
                // console.log(await connection(collection).find({}) == await d.find({}))
                return await this.open()

            }
            catch (err) {
                console.log('Error connecting to MongoDB', err);
                throw new Error(err)
            }
            
        }
        this.close = async () =>{
            console.log(this.connected, 'attempting to disconnect')
            return await this.client.close((err, res) => {
                if(err) throw new Error('disconnection failed')
                this.connected = false
                console.log(res, this.connected, 'successfully disconencted')

            })
        }
    }
    
    
    
};

module.exports = dbConnect