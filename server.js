if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

const mongoose = require('mongoose')
const bodyParser = require('body-parser');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout' , 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

// require('dotenv/config')

app.use(bodyParser.json());


app.use(express.urlencoded({extended: false}))

//Import ROUTES
// const postRoute = require('./routes')

// app.use('posts', postRoute);



// mongoose.connect(process.env.DB_CONNECTION, 
//     {useNewUrlParser: true },
//     ()=>console.log('connected to DB')
// );

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser : true})
const db = mongoose.connection
db.on('error' , error => console.log(error))
db.once('open', ()=>console.log('Connected to DB'))

app.listen(process.env.PORT || 3000)