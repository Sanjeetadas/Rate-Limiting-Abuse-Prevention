    'use strict';

const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  // Allow 5 attempts per IP every 15 minutes.
  windowMs: 15 * 60 * 1000,
  max: 5,

  // Count only failed authentication attempts.
  skipSuccessfulRequests: true,

  // Send modern rate-limit headers, not legacy X-RateLimit headers.
  standardHeaders: true,
  legacyHeaders: false,

  // express-rate-limit automatically responds with HTTP 429
  // and sets Retry-After when the request limit is exceeded.

  /*
   * MULTI-INSTANCE DEPLOYMENT:
   * The default in-memory store keeps counters separately inside
   * each Node.js process. Behind a load balancer, requests can reach
   * different instances, allowing a client to exceed the intended
   * limit across the cluster.
   *
   * To solve this, configure rate-limit-redis with a shared Redis
   * connection and use a RedisStore as the `store` option:
   *
   * store: new RedisStore({
   *   sendCommand: (...args) => redis.call(...args)
   * })
   *
   * Import RedisStore from rate-limit-redis and configure `redis`
   * using your application's Redis client. Every instance must use
   * the same shared store so the limit is enforced across the cluster.
   */
});

module.exports = authLimiter;
