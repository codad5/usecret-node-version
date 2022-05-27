const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb://127.0.0.1:27017';
const db = 'cooker';
const client = new MongoClient(uri, { useUnifiedTopology: true });
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
const database =  async (collection) => {
    try{
        // const d = await connection(collection)
        // console.log(await connection(collection).find({}) == await d.find({}))
        return  await connection(collection)
        
    }
    catch(err){
        console.log('Error connecting to MongoDB', err);
        
    }
    return;
    
};

module.exports =  database