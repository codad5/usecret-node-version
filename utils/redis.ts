import Redis from "ioredis";

const {
  REDIS_REST_URL,
  REDIS_REST_PASSWORD,
  REDIS_REST_HOST,
  REDIS_REST_PORT,
  REDIS_REST_USER,
  REDIS_REST_DB
} = process.env;

const redisOptions = {
  host: REDIS_REST_HOST,
  password: REDIS_REST_PASSWORD || undefined,
  port: parseInt(REDIS_REST_PORT || "6379"),
  username: REDIS_REST_USER || undefined,
  db: parseInt(REDIS_REST_DB || "0")
};

// Use connection URL if available, otherwise use redisOptions
const redisClient = REDIS_REST_URL
  ? new Redis(REDIS_REST_URL)
  : new Redis(redisOptions);

redisClient.on("connect", () => {
  console.log(
    `Connected to Redis ⚡️ using ${
      REDIS_REST_URL ? 'connection URL' : 'options'
    }`,
    REDIS_REST_URL || redisOptions
  );
});

redisClient.on("error", (error) => {
  console.log(
    `Error connecting to Redis ❌ using ${
      REDIS_REST_URL ? 'connection URL' : 'options'
    }`,
    error,
    REDIS_REST_URL || redisOptions
  );
});

export default redisClient;
