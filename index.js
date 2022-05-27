const express= require('express')
const app = express()
const bodyParser = require('body-parser');
const http = require('http').Server(app)
const userRoute = require('./routes/index')

app.set('view engine', 'ejs')
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', userRoute)
// app.get('/', (req, res) => {
//     res.render('index', {text: 'world'})
// })
const server = app.listen(process.env.PORT || 3000, () => {
   console.log('server listening on port '+server.address().port)
    
})