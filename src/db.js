require('dotenv').config()
const mysql2 = require('mysql2/promise');

async function connectDB() {
    const connection = await mysql2.createConnection(process.env.DATABASE_URL);
    const result = await connection.query(' SELECT 1 +1 AS Result');
    console.log("🚀 ~ file: db.js:7 ~ result:", result)
}

module.exports = connectDB;