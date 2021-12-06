// Read environment variables
const { config } = require("dotenv");
config();

const configurations = {
  PORT: process.env.PORT || 4000,
  MONGODB_HOST: process.env.MONGODB_HOST || "localhost",
  MONGODB_DATABASE: process.env.MONGODB_DB || "don_tendero",
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "localhost"}/${
  process.env.MONGODB_DATABASE || "don_tendero"
 }`,
};

module.exports = configurations;
 

// produccion 

// 

// desarrollo 

// MONGODB_URI: `mongodb://${process.env.MONGODB_HOST || "localhost"}/${
//   process.env.MONGODB_DATABASE || "portalFoxReplays"
// }`,