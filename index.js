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
// const redisStore = require('connect-redis')
const Redis = require('ioredis');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session)





app.set('view engine', 'ejs')
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cookieParser())s
app.set('trust proxy', 1);
app.use((req, res, next)=> {
    console.group('calling')
    console.log('checking')
    console.groupEnd()
    req.io = io
    return next()
})

//Configure redis client
const redisClient = new Redis({
    username:process.env.REDIS_USERNAME,
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD
})




app.use(session({
    store: new RedisStore({client:redisClient}),
        secret:process.env.SESSION_KEY,
        credentials:true,   
        resave:false,
        saveUninitialized:false,
        cookie: {
            maxAge:1000 * 60 * 60 * 24,
            sameSite:false,
            httpOnly:false
         }}))

app.use('/message', messageRoute)
app.use('/home', homeRoute)
app.use('/', userRoute)
app.get('/', (req, res) => {
    console.log('chill')
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
   console.log('server listening on port '+server.address().port+' on '+process.env.ENVIRONMENT)
    
})
