const {MongoClient} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbName = 'db';

const dbConnection = async ()=>{
    await client.connect();
    console.log('Connect');
    const db = client.db(dbName);
    return db;
}

module.exports = dbConnection;