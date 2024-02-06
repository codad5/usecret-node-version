import Redis from "ioredis"

const {UPSTASH_REDIS_REST_PASSWORD, UPSTASH_REDIS_REST_HOST} =  process.env
const redisClient = new Redis(`rediss://default:${UPSTASH_REDIS_REST_PASSWORD}@${UPSTASH_REDIS_REST_HOST}`);


redisClient.on("connect", () => {
    console.log("Connected to Redis ⚡️")
})

redisClient.on("error", (error) => {
    console.log("Error connecting to Redis ❌", error)
})

export default redisClient;

