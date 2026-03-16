const userModel = require("../model/user.model")
const blacklistModel = require("../model/blacklist.model")
const redis = require("../config/cache")
const jwt = require("jsonwebtoken")

async function authUser(req, res, next) {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }
     
    // const isTokenBlacklisted = await blacklistModel.findOne({ token })   // Mongodb me token check krne ka trika
    // if(isTokenBlacklisted) {
    //     return res.status(401).json({
    //         message: "Token is blacklisted"
    //     })
    // }

    const isTokenBlacklisted = await redis.get(token)   // Redis me token check krne ka trika
    if(isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is blacklisted"
        })
    }

    // Redis me koi Schema nhi hota hai, ye bss normally key and value me data store krti hai.
    // Redis ka primary jo hm use krte hai wo hota hai caching kke liye.

    try {
    const decoded = jwt.verify(  // ye varify krega ki token hmare server ne hi create kiya hai and expire hai ya nhi, and data decoded ke andr mil jayega
        token,
        process.env.JWT_SECRET,
    )
    req.user = decoded;
    next();   // agr token valid hai toh next middleware ko call kr dega ya controller ko forward kr dega
} catch (err) {
    return res.status(401).json({
        message: "Invalid token"
    })
}

}

module.exports = {authUser};