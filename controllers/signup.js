const UserModel = require('../models/user')
const model= new UserModel();

class SignupController {
    constructor(username, password) {
        if (!this.has_value([username, password])) throw new Error('Username and password can not be empty')
        this.username = username;
        this.password = password;
        // console.log(username)
        
    }

    has_value(...params) {
        return params.every(item => {
            return item.length > 0 && item != null && item !== undefined;
        })
    }
    validateParam(){
        if(this.username.length < 0) throw new Error('Username too Short')
        if(this.password.length < 6) throw new Error('password too Short')
        if(this.username.match(/^[a-zA-Z0-9]+$/) == null) throw new Error('Username can only contain Letter from 0-9, A-Z, a-z')
        
    }
    async userExist(end = false){
        try{
            const data = await model.find({username:this.username})
            // console.log(data)
            // console.log(data, 1000)
            // console.log(await data.hasNext(), 2000)
            // console.log('testing')
            if (await data.hasNext()) return true

        }catch(err){
            console.log(err)
            if (err) throw new Error("something went wrong", err)

        }
        // return true;
        
        return false
    }
    async create(end = false, callback = null){
        let data = await model.create({ username: this.username, password: this.password, private_id: new Date().valueOf() }, callback);
        // console.log(data)
        // console.log('creating', data)
        if(end) return await this.end()
        return data
        // return await model.create({ username: this.username, password: this.password }, callback)
    }
    async end(){
        console.log('disconnecting')
        return await model.end()
    }
    
}

module.exports = SignupController