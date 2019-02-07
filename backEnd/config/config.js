
var DB_NAME = 'Ium-DB';
var MONGO_PSS = 'VYpWUsCdyNL8P-E';

// mongo
module.exports.MONGO_URL = `mongodb://devius123:${MONGO_PSS}@ium-dev-shard-00-00-mq7ly.mongodb.net:27017,ium-dev-shard-00-01-mq7ly.mongodb.net:27017,ium-dev-shard-00-02-mq7ly.mongodb.net:27017/${DB_NAME}?ssl=true&replicaSet=Ium-Dev-shard-0&authSource=admin&retryWrites=true`;


// Seed
module.exports.SEED = '@shhh-@this-is-Ium-seed';
