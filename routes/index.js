const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser');
const SignupController = require('../controllers/signup');
router.use(bodyParser.json())
router.use(express.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.route('/login').
    get((req, res) => {
        res.render('login');
    })
    .post((req, res) => {
        console.log(req.params.id)
    })
router.route('/signup').
    get((req, res) => {
        res.render('signup');
    })
    .post(async (req, res) => {
        try{
            console.log(req.body.username, 100)
            let signup = new SignupController(req.body?.username, req.body?.password)
            // console.log('err')
            await signup.create()
            res.send('Working')
        }
        catch(err){
            res.status(500).send(err.message);
        }
    })


module.exports = router