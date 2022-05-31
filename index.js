const express= require('express')
const app = express()
const bodyParser = require('body-parser');
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
app.use(session({secret:"qwe2930823408234",  resave:false, saveUninitialized:true}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/message', messageRoute)
app.use('/home', homeRoute)
app.use('/', userRoute)
// app.get('/', (req, res) => {
//     res.render('index', {text: 'world'})
// })

io.on('connection', (socket) => {
    console.log("socket connection established")
})
const server = http.listen(process.env.PORT || 3000, () => {
   console.log('server listening on port '+server.address().port)
    
})