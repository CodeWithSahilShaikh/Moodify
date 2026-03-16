const Redis = require("ioredis").default // Redis ke suggetion ke liye .default use hota hai.

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})

redis.on("connect", () => {
    console.log("Server connected to Redis")
})

redis.on("error", (err) => {
    console.log(err)
})


module.exports = redis;