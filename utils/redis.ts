import Redis from "ioredis"

const {UPSTASH_REDIS_REST_PASSWORD = '', UPSTASH_REDIS_REST_HOST = '', UPSTASH_REDIS_REST_PORT = '', UPSTASH_REDIS_REST_USER = '', UPSTASH_REDIS_REST_DB = ''} = process.env

const generateRedusUrl = (host: string, port: string, password: string, user: string, db: string) => {
    return `redis://${user}:${password}@${host}:${port}/${db}`
}

const redisUrl = generateRedusUrl(UPSTASH_REDIS_REST_HOST, UPSTASH_REDIS_REST_PORT, UPSTASH_REDIS_REST_PASSWORD, UPSTASH_REDIS_REST_USER, UPSTASH_REDIS_REST_DB)
const redisClient = new Redis(redisUrl)


redisClient.on("connect", () => {
    console.log("Connected to Redis ⚡️with options", redisUrl)
})

redisClient.on("error", (error) => {
    console.log("Error connecting to Redis ❌", error , redisUrl)
})

export default redisClient;


