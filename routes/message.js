const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
// const SignupController = require('../controllers/signup');
const MessageController = require('../controllers/message');
var http = require('http').Server(router)
var io = require('socket.io')(http)

const isLogin = (req) => {
    if (!req.session.user) return false
    return true
}
// router.use(bodyParser.json())
// router.use(express.json())
// router.use(bodyParser.urlencoded({ extended: true }))
router.route('/')
    .get(async (req, res) => {
        try{if(!isLogin(req)) return res.status(400).json({ error: true, message:'you are not logged in '})
        console.log(req.session?.user)
        const home = new MessageController('i', req.session?.user)
        let userData = await home.getUserMessage()
        // return res.send('working')
        return res.status(200).json({data:userData,error:false})}
        catch(err){
            console.log(err)
            res.status(500).send({error:true, message:err.message})
        }

    })
router.route('/send').
    post(async (req, res) => {
        try{
            if (req.body?.receiver == null) return res.status(400).json({ message: "no receiver found", error: true })
            if (req.body?.message == null) return res.status(400).json({ message: "no message found", error: true })
            if (req.body?.message.length >= 120) return res.status(400).json({ message: "Message Too long", error: true })
            if (isLogin(req) && (req.session.pid == req.body?.receiver || req.session.user == req.body?.receiver))  return res.status(400).json({ message: "cant send data to self", error: true })
            console.log('trying')
            // if (isLogin(req) && req.session.user == req.body?.receiver) console.log("cant send data to self"); return res.status(400).json({message:"cant send data to self", error:true})
            let messagetype = null;
            switch (parseInt(req.body?.receiver)){
                    case NaN:
                        messagetype = 'i'
                    break;
                    default:
                        messagetype = 'p'
                    // return res.status(500).json({error:true, message:'server error'})
                    break;
                }
            console.log('anything here', messagetype, req.body?.receiver)
            if (messagetype == null) return res.status(400).json({error:true, message:'server error'})
            const home = new MessageController(messagetype, req.body?.receiver)
            let userData = await home.getUserData()
            if (userData == null) return res.status(400).json({ error: true, message: 'user not found' })
            const sent = await home.sendMessage(req.body?.message)
            // console.log(sent, userData?.private_id)
            if (sent !== null && sent !== false && sent.acknowledged){

                io.emit(`message/${userData?.private_id}`, {
                    _id: sent.insertedId,
                    message: req.body?.message,
                    r_username: userData?.username,
                    r_id: userData?.private_id,
                    sender: null,
                    date: new Date().valueOf()
                    },);
                     return res.status(200).json({ message:'sent', error:false})
    } 


        }
        catch(err){
            console.log(err)
            return res.status(500).json({ error: true, message: 'server error' })
            // res.redirect(`../../../home`)
        }



    })
router.route('/p/:id').
    get(async (req, res) => {
        if (isLogin(req) && req.session.pid == req.params.id) return res.redirect('../../../login')
        try{

            const home = new MessageController('p', req.params.id)
            console.log(req.params.id)
            let data = await home.getUserData()
            console.log(data, 'hello----')
            if (data == null) {
                console.log('user not found')
                req.session.receiver = undefined;
                return res.render('404', { message:'user not found', reciver: req.session.user });
            }
            req.session.r_username = data.username;
            req.session.r_pid = data.private_id
            console.log(req.session)
            console.log('here me voice')
            return res.render('message', { /*r_username: req.session.r_username,*/ r_pid: req.session.r_pid, s_uid: req.session?.pid });
            console.log('here me voice again')

        }catch(err){
            console.log(err)
            return res.status(500).send('something went wrong')
        }
        
    })
    .post(async (req, res, next) => {
        // console.log(req.params.id)
        if (isLogin(req)) return res.redirect('../home')
        return res.redirect('../login')


        // res.send('Working')


    })
router.route('/i/:id').
    get(async (req, res) => {
        if (isLogin(req) && req.session.user == req.params.id) return res.redirect('../../../login')
        try{

            const home = new MessageController('i', req.params.id)
            console.log(req.params.id)
            let data = await home.getUserData()
            // console.log(data, 'hello----')
            if (data == null) {
                console.log('user not found')
                req.session.receiver = undefined;
                return res.render('404', { message:'user not found', receiver: req.session.user });
            }
            req.session.r_username = data.username;
            req.session.r_pid = data.private_id
            // console.log(req.session)
            console.log('here me voice')
            return res.render('message', { r_username: req.session.r_username, r_pid: req.session.r_pid });
            // console.log('here me voice again')

        }catch(err){
            console.log(err)
            return res.status(500).send('something went wrong')
        }
        
    })
    .post(async (req, res, next) => {
        // console.log(req.params.id)
        if (isLogin(req)) return res.redirect('../home')
        return res.redirect('../login')


        // res.send('Working')


    })
router.route('*')
    .get((req, res) => {
        return res.render('404')
    })

module.exports = router