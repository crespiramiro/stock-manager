const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const register = async (req,res) => {

    try{
        const { username, password, email} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new User({username, password: hashedPassword, email})

        await newUser.save();
        res.status(201).json({user: newUser, message: "user created succesfully"})
    } catch(error){
        res.status(500).json({message: 'failed to register user'})
    }
};

const login = async (req,res) => {
    try{
    const {email,password, username} = req.body;
    const user = await User.findOne({email});

    if (!user) {
        res.status(400).json({message: "wrong email"})
    }

    const comparePassword = bcrypt.compareSync(password, user.password); 
    
    if (comparePassword) {
        const token = jwt.sign
        ({userId: user._id, userEmail: user.email, userName: user.username},
             process.env.JWT_SECRET,
              {expiresIn: 60*2});

            res.status(200).json({user, token});
    } else{
        res.status(400).json({message: "wrong password"})
    }
}catch(error){
    res.status(500).json('login error')
}
}

module.exports = {register, login};