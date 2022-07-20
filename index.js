require('dotenv').config()
const express= require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require('express-session')
const http = require('http').Server(app)
var io = require('socket.io')(http)
const userRoute = require('./routes/index')
const homeRoute = require('./routes/home')
const messageRoute = require('./routes/message')



app.set('view engine', 'ejs')
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', 1);
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next)=> {
    req.io = io
    return next()
})
app.use(session({secret:process.env.SESSION_KEY,  resave:false, saveUninitialized:true, cookie: {maxAge:1000 * 60 * 60 * 24, sameSite:false, httpOnly:true, secure:true }}))
app.use('/message', messageRoute)
app.use('/home', homeRoute)
app.use('/', userRoute)
app.get('/', (req, res) => {
    res.render('index', {text: 'world'})
})
app.get('/css/:id', (req, res) => {
    try{
        res.sendFile(`${__dirname}/style/${req.params.id}.css`)
    }
    catch(e){
        res.status(400).send(e)
    }
})




const server = http.listen(process.env.PORT || 5000, () => {
   console.log('server listening on port '+server.address().port)
    
})
