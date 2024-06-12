const jwt = require('jsonwebtoken');

const jwtValidate = (req,res,next) => {
    const token = req.headers["authorization"]

    if(!token){
        res.status(401).json({message: "access denied"})
    }else{
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>
        {
            if(err){
                res.status(401).json({message: "invalid token"});
            }else{
                req.user=decoded;
            }
        }
         ) 
         next();
    }
};

module.exports = jwtValidate;