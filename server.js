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


app.use(bodyParser.json());


app.use(express.urlencoded({extended: false}))


// mongoose.connect(process.env.DB_CONNECTION,{
//     useNewUrlParser : true,
//     useUnifiedTopolgy:true,
// })
// const db = mongoose.connection
// db.on('error' , error => console.log(error))
// db.once('open', ()=>console.log('Connected to DB'))

mongoose.connect(process.env.DB_CONNECTION, {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log("error");
});

app.listen(process.env.PORT || 3000)