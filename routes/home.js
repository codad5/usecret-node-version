const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
// const SignupController = require('../controllers/signup');
const HomeController = require('../controllers/home');
const isLogin = (req) => {
    if (!req.session.user) return false
    return true
}
// router.use(bodyParser.json())
// router.use(express.json())
// router.use(bodyParser.urlencoded({ extended: true }))
router.route('/').
    get(async (req, res) => {
        if (!isLogin(req)) return res.redirect('../login')
        const home = new HomeController(req.session.user, null)
        let data = await home.getData()
        console.log(data, 'hello----')
        if (data == null){
            req.session.user = undefined;
            return res.render('404', {username:req.session.user});
        } 
        return res.render('home', {username:req.session.user, private_id:req.session.pid});
    })
    .post(async (req, res, next) => {
        // console.log(req.params.id)
        if (isLogin(req)) return res.redirect('../home')
        

            // res.send('Working')
        

    })
router.route('/:any')
    .get((req, res) => {
        return res.render('404')
    })

module.exports = router