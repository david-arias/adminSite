
// requires
var express = require('express');
var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// Vars Init
var app = express();

// models
var UserMo = require('../models/user')

// ================================================
// GET BASE
// ================================================
app.get( '/', (req, res, next) => {
     res.status( 200 ).json( {
          ok: true,
          mssg: 'Get login successfully'
     })
})

// ================================================
// POST login init
// ================================================
app.post('/', ( req, res, next ) => {
     var body = req.body;

     UserMo.findOne( { userNickname: body.userNickname }, ( err, userDb ) => {
          if( err ) {
               return res.status(500).json({
                    ok: false,
                    mssg: "Can´t Search user in Data Base",
                    errors: err
               })
          }
          if ( !userDb ) {
               return res.status( 400 ).json({
                    ok: false,
                    mssg: "User doesn't exist",
                    errors: err
               })
          }
          if ( !body.pass ) {
               return res.status( 400 ).json({
                    ok: false,
                    mssg: "Password is required",
                    errors: err
               })
          }
          if ( !bcrypt.compareSync( body.pass, userDb.pass) ) {
               return res.status( 400 ).json({
                    ok: false,
                    mssg: "Wrong credentials",
                    errors: err
               })
          }

          // create token
          userDb.pass = " (⌐●_●) it's secret dude! "; 

          var token = jwt.sign({ user: userDb }, SEED, {expiresIn: ( 1 * 3600 ) }) // 1 horas

          res.status(200).json({
               ok: true,
               usuario: userDb,
               token: token,
               id: userDb._id,
          })
     })
})


// export
module.exports = app;