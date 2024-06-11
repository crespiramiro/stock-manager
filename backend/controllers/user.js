const User = require("../models/user");

const getUsers = async (req, res) => {
try{
    const users = await User.find();
    res.status(200).json(users);

}catch(error){
    console.log('error getting users' + error.message);
    res.status(500).json({message: 'error getting users' + error.message})
}
};

module.exports = { getUsers };
