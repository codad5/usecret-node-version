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
        
        if(this.password.length < 6) throw new Error('password too Short')
        if(this.username.match(/^[a-zA-Z0-9]+$/) == null) throw new Error('Username can only contain Letter from 0-9, A-Z, a-z')
        
    }
    async getData() {
        try {
            const data = await model.findOne({ username: this.username })
            // console.log(data)
            return data
        } catch (err) {
            console.log(err)
        }
    }
    async userExist(end = false){
        try{
            const data = await model.find({username:this.username, password:this.password})
            // console.log(data)
            // console.log(data, 1000)
            // console.log(await data.hasNext(), 2000)
            // console.log('testing')
            // console.log(data)
            if (await data.hasNext()) return true
            return false

        }catch(err){
            console.log(err)
            if (err) throw new Error("something went wrong", err)

        }
        // return true;
        
    }

    async end(){
        console.log('disconnecting')
        return await model.end()
    }
    
}

module.exports = SignupController