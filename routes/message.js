const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
// const SignupController = require('../controllers/signup');
const MessageController = require('../controllers/message');
const isLogin = (req) => {
    if (!req.session.user) return false
    return true
}
// router.use(bodyParser.json())
// router.use(express.json())
// router.use(bodyParser.urlencoded({ extended: true }))
router.route('/send').
    post(async (req, res) => {
        try{
            if (isLogin(req) && req.session.pid == req.body?.r_username) return res.redirect('../../../login')
            if (isLogin(req) && req.session.user == req.body?.r_id) return res.redirect('../../../login')
            let messagetype = null;
            if (req.body?.r_username !== null) messagetype = 'i'
            if (req.body?.r_id !== null) messagetype = 'p'
            if (messagetype == null) return res.redirect(`../../../../`)
            const home = new MessageController(req.body?.r_id, req.body?.r_id || req.body?.r_username)
            let userData = await home.getUserData()
        }
        catch(err){
            console.log(err)
            res.redirect(`../../../home`)
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
                return res.render('404', { message:'user not found', receiver: req.session.user });
            }
            req.session.r_username = data.username;
            req.session.r_pid = data.private_id
            console.log(req.session)
            console.log('here me voice')
            return res.render('message', { r_username: req.session.r_username, r_pid: req.session.r_pid });
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
        if (isLogin(req) && req.session.pid == req.params.id) return res.redirect('../../../login')
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