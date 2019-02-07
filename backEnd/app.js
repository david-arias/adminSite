// requires
var express = require('express');
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

// vars
var MONGO_URL = require('./config/config').MONGO_URL;

// Vars Init
var app = express();

// enable CORS
app.use(function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
     next();
});
// body parser
/* parse application/x-www-form-urlencodedn */
app.use(bodyParser.urlencoded({ extended: false }))
/* parse application/json */
app.use(bodyParser.json())

// Routes IMPORTS
var loginRoutes = require('./routes/login');
var userRoutes = require('./routes/user');
var appRoutes = require('./routes/app');

// Mongo DATA BASE Connect
mongoose.connection.openUri('mongodb://localhost:27017/Ium-DB', (err,res) => {
// mongoose.connection.openUri(MONGO_URL, (err,res) => {
     if ( err ) throw err;

     console.log('Base de datos: \x1b[32m%s\x1b[0m','ONLINE');
});


// Routes 
app.use('/login', loginRoutes);
app.use('/user', userRoutes);

app.use('/', appRoutes);



// Listen 
/* app.listen(80,()=> { */
app.listen(3002,()=> {
     console.log('Express server puerto 3002: \x1b[32m%s\x1b[0m','ONLINE');
})