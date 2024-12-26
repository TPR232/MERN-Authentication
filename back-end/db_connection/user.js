const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({ 
    username: { 
        type: String, 
        require: true, 
        unique: true 
    },
    password : {
        type:String,
        require: true,
    }

});


const User = mongoose.model('db',UserSchema);

module.exports = User;