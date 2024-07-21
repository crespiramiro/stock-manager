const { Schema, model } = require("mongoose");

const userSchema = new Schema({

    username: {type : String,
        unique: true,
        required: true},
     password: { type: String, 
        required: true },
    email: { type: String,
        required: true,
        unique: true,
 },
 isActive: { type: Boolean, 
    default: true }
},
{ timestamps: true },
{ collection: 'usuarios' }
)

const User = model("User", userSchema); 

module.exports = User;