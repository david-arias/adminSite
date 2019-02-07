
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); 

var Schema = mongoose.Schema;

var userSchema = new Schema( {
     userNickname: { type: String, unique:true, required: [true, 'User nickname is required'] },
     pass: { type: String, required: [true, 'password is required'] },
     firstName: { type: String, required: [true, 'User first name is required'] },
     lastName: { type: String, required: [true, 'User last name is required'] },
     email: { type: String, unique:true, required: [true, 'User E-mail is required'] },
     country: { type: String, required: [true, 'User country is required'] },
     phone: { type: Number, required: false },
     games: { type: Array, required: false },
})

userSchema.plugin( uniqueValidator, {
     message: "{PATH} must be unique"
} )

module.exports = mongoose.model('User', userSchema);