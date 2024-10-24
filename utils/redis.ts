import Redis from "ioredis";

const {
  UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_PASSWORD,
  UPSTASH_REDIS_REST_HOST,
  UPSTASH_REDIS_REST_PORT,
  UPSTASH_REDIS_REST_USER,
  UPSTASH_REDIS_REST_DB
} = process.env;

const redisOptions = {
  host: UPSTASH_REDIS_REST_HOST,
  password: UPSTASH_REDIS_REST_PASSWORD || undefined,
  port: parseInt(UPSTASH_REDIS_REST_PORT || "6379"),
  username: UPSTASH_REDIS_REST_USER || undefined,
  db: parseInt(UPSTASH_REDIS_REST_DB || "0")
};

// Use connection URL if available, otherwise use redisOptions
const redisClient = UPSTASH_REDIS_REST_URL
  ? new Redis(UPSTASH_REDIS_REST_URL)
  : new Redis(redisOptions);

redisClient.on("connect", () => {
  console.log(
    `Connected to Redis ⚡️ using ${
      UPSTASH_REDIS_REST_URL ? 'connection URL' : 'options'
    }`,
    UPSTASH_REDIS_REST_URL || redisOptions
  );
});

redisClient.on("error", (error) => {
  console.log(
    `Error connecting to Redis ❌ using ${
      UPSTASH_REDIS_REST_URL ? 'connection URL' : 'options'
    }`,
    error,
    UPSTASH_REDIS_REST_URL || redisOptions
  );
});

export default redisClient;
