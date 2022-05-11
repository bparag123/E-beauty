export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  RABBITMQ_URI: process.env.RABBITMQ_URI,
});
