const UserModel = require('../models/user')
const MessageModel = require('../models/message')
const Usermodel = new UserModel();
const Messaagemodel = new MessageModel();

class MessageController {
    constructor(type, reciever) {
        if (!this.has_value([type, reciever])) throw new Error('Empty field found')
        this.type = type
        this.reciever = {
            username:null,
            private_id:null
        }
        this.reciever.private_id = null;
        this.reciever.username = null;
        if (!this.userExist()) throw new Error('user dont exist')
        switch(type){
            case 'p':
                this.reciever.private_id = reciever;
                
                this.findModel = {
                    private_id: parseInt(this.reciever.private_id)
                }
                
                break;
                case 'i':
                this.reciever.username = this.reciever.username;
                this.findModel = {
                    username: reciever
                }
            break;
            default:
                throw new Error('Unknown type, reciever')
            break;
        }
        // console.log(username)

    }

    has_value(...params) {
        return params.every(item => {
            return item.length > 0 && item != null && item !== undefined;
        })
    }
    validateParam() {

        if (this.password.length < 6) throw new Error('password too Short')
        if (this.username.match(/^[a-zA-Z0-9]+$/) == null) throw new Error('Username can only contain Letter from 0-9, A-Z, a-z')

    }
    async getUserData() {
        try {
            const data = await Usermodel.findOne(this.findModel)
            // console.log(data, this.findModel)
            if(data == null) return data;
            switch(this.type){
                case 'p':
                    this.reciever.username = data.username;
                    break;
                case 'i':
                    this.reciever.private_id = data.private_id;
                    break;
                default:
                    throw new Error('Unknown type, reciever')
                break;

            }
            // console.log(data)
            return data
        } catch (err) {
            console.log(err)
            throw new Error('Unknown type, reciever', err)
        }
        return null
    }
    async getUserMessage() {
        try {
            let userData = await this.getUserData()
            if (userData == null) throw new Error('user not found');
            const data = await Messaagemodel.find({ r_username: userData.username, r_id: userData.private_id })
            // console.log(data, this.findModel)
            let dataArray = []
            while(await data.hasNext()) {
                 dataArray.push(await data.next())
                
            }
            return dataArray
            
            // console.log(data)
            // return data
        } catch (err) {
            console.log(err)
            throw new Error('Unknown type, reciever', err)
        }
        return null
    }
    async sendMessage(message, sender = null){
        const userData = await this.getUserData()
        this.messagemodel = {
            message: message,
            r_username: userData.username,
            r_id: userData.private_id,
            sender: sender,
            date: new Date().valueOf()

        }
        let data = await Messaagemodel.send(this.messagemodel)
        // console.log(data, 'hurry')
        return data;
    }
    async userExist(end = false) {
        try {
            const data = await Usermodel.find(this.findModel)
            // console.log(data)
            // console.log(data, 1000)
            // console.log(await data.hasNext(), 2000)
            // console.log('testing')
            // console.log(data)
            if (await data.hasNext()) return true
            return false

        } catch (err) {
            console.log(err)
            if (err) throw new Error("something went wrong", err)

        }
        // return true;

    }

    async end() {
        console.log('disconnecting')
        return await model.end()
    }

}

module.exports = MessageController