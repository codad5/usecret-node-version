const database = require('../config/db')
const dbConnect = new database('message')
class MessageModel {
    constructor() {


        // this.collection =  database('user');
        // console.log(database('user'))



    }
    async findOne(json) {
        // console.log(await this.collection());
        // await dbConnect.open()
        // console.log(db)
        console.log(dbConnect.collection, 'dbConnect')
        // console.log()
        let me = await dbConnect.access()
        let data = me.findOne(json);
        // await db.client.close()
        // return data
        // await dbConnect.close()
        return data

    }
    async find(json) {
        // console.log(await this.collection());
        // await dbConnect.open()
        // console.log(db)
        console.log(dbConnect.collection, 'dbConnect')
        // console.log()
        let me = await dbConnect.access()
        let data = me.find(json);
        // await db.client.close()
        // return data
        // await dbConnect.close()
        return data

    }
    async create(json, callback = (err, result) => {
        if (err) throw new Error('Error creating user', err)
        return result;
    }) {
        // await dbConnect.open()
        // let db = await this.setdb()
        let me = await dbConnect.access()
        console.log('creating')
        let data = await me.insertOne(json);
        // return data'
        console.log(data)
        callback(!data.acknowledged, data.insertedId)
    }
    async end() {
        return await dbConnect.close()

    }
}
module.exports = MessageModel