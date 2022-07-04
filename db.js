import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URL);
try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.DATABASE);
    console.log("conectou no banco");
}  catch (e) {
    console.log("erro na conexão com o banco", e);
}

export default db;