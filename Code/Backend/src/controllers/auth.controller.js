const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../model/blacklist.model")
const redis = require("../config/cache")

async function registerUser(req, res) {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })

    if (isAlreadyRegistered) {
        return res.status(400).json({
            message: "User with the same email or username already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}
async function loginUser(req, res) {
 const { email, password, username } = req.body;

    if (!email && !username) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await userModel.findOne({
        $or: [
            { email: email || null },
            { username: username || null }
        ]
    })

    if(!user) {
        return res.status(400).json({
            message: "Invalid credentials"   // Ask GPT: Hm yaha pr User not found message ky nhi bhej rhe hai? Invalid credential kyu bhej rhe hai.
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials" // Ask GPT: Hm yaha pr User not found message ky nhi bhej rhe hai? Invalid credential kyu bhej rhe hai.
        })
    
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged in Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)
    return res.status(200).json({
        message: "User fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutUser(req, res) {
    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "EX", 60 * 60)  // token= key & Date.now().toString()= value
    // Redis me hm expire time seconds me btate hai.. (eg: 60 * 60 (ye 1 hour hua))


    // Note: Cluster me hamar jo data hai use hm compass me dekhte hai mongodb me, similar way me redis ke paas bhi compass jesi application hti hai jise "redis insight" khte hai

    res.status(200).json({
        message: "logout successfully"
    })

}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser

}