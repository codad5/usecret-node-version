const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const SignupController = require('../controllers/signup');
const LoginController = require('../controllers/login');
const isLogin = (req) => {
    if(!req.session.user) return false
    return true
}
// router.use(bodyParser.json())
// router.use(express.json())
// router.use(bodyParser.urlencoded({ extended: true }))
router.route('/login').
    get((req, res) => {
        if(isLogin(req)) return res.redirect('/home')
        res.render('login');
    })
    .post(async (req, res, next) => {
        // console.log(req.params.id)
        if (isLogin(req)) return res.redirect('/home')
        let login = new LoginController(req.body?.username, req.body?.password)
        try {
            console.log(req.body.username, 100)
            login.validateParam();
            // console.log('err')

            if (await login.userExist(true) === false) {
                await login.end(); return res.render('login', { username: req.body?.username, password: req.body?.password, error: "user dont exist" });
            }
            let loginData = await login.getData()
            req.session.user = req.body?.username;
            req.session.pid = loginData.private_id;
            if (isLogin(req)) return res.redirect('/home'); 
            
            // res.send('Working')
        }
        catch (err) {
            console.log(err)
            next(err)
            return res.render('login', { username: req.body?.username, password: req.body?.password, error: err })
            // res.status(500).send(err.message);
        }

    })
router.route('/signup').
    get((req, res) => {
        if(isLogin(req)) return res.redirect('/home')
        res.render('signup');
    })
    .post(async (req, res, next) => {
        if (isLogin(req)) return res.redirect('/home')
        let signup = new SignupController(req.body?.username, req.body?.password)
        try{
            console.log(req.body.username, 100)
            signup.validateParam()
            // console.log('err')
            if (await signup.userExist(true)){
                await signup.end(); return res.render('signup', { username: req.body?.username, password: req.body?.password, error: "user exist" });
            } 
            await signup.create(true, (err, result) => {
                console.log('done running create function')
                if (err) {
                    console.log(err); return res.render('signup', {username:req.body?.username, password:req.body?.password, error:err});
                    
                }
                return res.redirect("/login")
                next()
            })
            // res.send('Working')
        }
        catch(err){
            console.log(err)
            next(err)
            return res.render('signup', { username: req.body?.username, password: req.body?.password, error:err })
            // res.status(500).send(err.message);
        }
    })
router.route('/:any')
    .get((req, res) => {
        return res.render('404')
    })

module.exports = router