export const env = {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NODE_ENV: process.env.NODE_ENV, //process.env.NODE_ENV, //"production || "development" ",

  NEXT_PUBLIC_ADSENSE_PUBLISHER_ID:
    process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID,
  GTM_TAG: process.env.GTM_TAG,

  AUTH_SECRET: process.env.AUTH_SECRET,

  DATABASE_URL: process.env.DATABASE_URL,

  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
};
