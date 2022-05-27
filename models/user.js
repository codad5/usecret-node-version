const database = require('../config/db')

class UserModel {
    constructor() {
        
        
        // this.collection =  database('user');
            // console.log(database('user'))
        
         

    }
    async setdb(){
        return await database('user')
    }
    async find(json){
        // console.log(await this.collection());
        let db = await this.setdb()
        console.log(db)
        return await db.find(json);
    }
    async create(json, callback = (err, result) => {
        if(err) throw new Error('Error creating user', err)
        return result;
    }){
        let db = await this.setdb()
        return await db.insertOne(json, callback);
    }
}
module.exports = UserModel