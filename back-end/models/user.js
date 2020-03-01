const mongoose  = require('mongoose');
const validate = require('mongoose-validator')

const nameValidator = [
    validate({
      validator: 'isLength',
      arguments: [3, 50],
      message: 'Name should be between 4 and 40 characters'
    }),
    validate({
      validator: 'isAlphanumeric',
      passIfEmpty: true,
      message: 'Name should contain alpha-numeric characters only'
    })
  ];

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username : {
        type :String, 
        required: true,
        unique: true,
        validate: nameValidator
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String, 
        required: false
        },
        
    quota : {
      type : String,
      required: true
    }
});

module.exports = mongoose.model('user', userSchema);