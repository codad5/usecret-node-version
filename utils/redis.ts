import Redis from "ioredis"

const {UPSTASH_REDIS_REST_PASSWORD = null, UPSTASH_REDIS_REST_HOST, UPSTASH_REDIS_REST_PORT, UPSTASH_REDIS_REST_USER = null, UPSTASH_REDIS_REST_DB = 0} = process.env
const redisClient = new Redis({
    host: UPSTASH_REDIS_REST_HOST,
    password: UPSTASH_REDIS_REST_PASSWORD || undefined,
    port: parseInt(UPSTASH_REDIS_REST_PORT || "6379"),
    username: UPSTASH_REDIS_REST_USER || undefined,
    db: parseInt(UPSTASH_REDIS_REST_DB || "0")
})


redisClient.on("connect", () => {
    console.log("Connected to Redis ⚡️")
})

redisClient.on("error", (error) => {
    console.log("Error connecting to Redis ❌", error)
})

export default redisClient;

