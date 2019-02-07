
// requires
var express = require('express');
var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

// Vars Init
var app = express();

var mdAutenticacion = require('../middleWares/auth_mw');

// models
var UserMo = require('../models/user')

// ================================================
// GET all users
// ================================================
app.get( '/', (req, res, next) => {

     UserMo.find({}, 'userNickname firstName lastName email country phone').exec( (err, users) => {
          if( err ) {
               return res.status(500).json({
                    ok: false,
                    mssg: "Can´t load user from Data Base",
                    errors: err
               })
          }
          
          UserMo.count( {}, (err,count) => {
               if( err ) {
                    return res.status(500).json({
                         ok: false,
                         mssg: "Can´t Count total users from Data Base",
                         errors: err
                    })
               }
               
               res.status( 200 ).json( {
                    ok: true,
                    totalUsers: count,
                    users: users,
                    mssg: 'GET Users Success'
               })

          })
     })

})

// ================================================
// POST register new user
// ================================================
app.post('/', ( req, res, next ) => {

     var body = req.body;

     var newUser = new UserMo({
          userNickname: body.userNickname,
          pass: bcrypt.hashSync( body.pass, 10 ),
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          country: body.country,
          phone: body.phone
     })

     newUser.save( (err, savedUser ) => {
          if( err ) {
               return res.status(500).json({
                    ok: false,
                    mssg: "Can´t Create new user",
                    errors: err
               })
          }

          res.status(201).json({
               ok: true,
               user: savedUser
          })
     } )
})

// ================================================
// PUT Update user
// ================================================
app.put('/:id', [mdAutenticacion.verifyToken], ( req, res, next ) => {
     var id = req.params.id;
     var body = req.body;

     UserMo.findById( id, ( err, user ) => {
          if ( err ) {
               return res.status(500).json({
                    ok: false,
                    mssg: "Can´t search user",
                    errors: err
               })
          }
          if ( !user ){
               return res.status(400).json({
                    ok: false,
                    mssg: "User doesn't exist"
               })
          }

          user.firstName = body.firstName;
          user.lastName = body.lastName;
          user.email = body.email;
          user.country = body.country;
          user.phone = body.phone;

          user.save( ( err, updatedUser ) => {

               if ( err ) {
                    return res.status(400).json({
                         ok: false,
                         mssg: "Can't update user",
                         errors: err
                    })
               }

               updatedUser.userNickname = user.userNickname;               
               updatedUser.pass = " (⌐●_●) it's secret dude! ";           
               
               res.status(200).json({
                    ok: true,
                    mssg: "User updated successfully",
                    user: updatedUser
               })
          } )

     })
})

// export
module.exports = app;