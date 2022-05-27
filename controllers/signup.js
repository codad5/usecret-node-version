const UserModel = require('../models/user')
class SignupController {
    constructor(username, password) {
        if (!this.has_value([username, password])) throw new Error('Username and password can not be empty')
        this.username = username;
        this.password = password;
        console.log(username)
        
    }

    has_value(...params) {
        return params.every(item => {
            return item.length > 0 && item != null && item !== undefined;
        })
    }

    async create(callback = null){
        const model= new UserModel();
        let data = await model.create({ username: this.username, password: this.password });
        // console.log(data)
        // return await model.create({ username: this.username, password: this.password }, callback)
    }
}

module.exports = SignupController