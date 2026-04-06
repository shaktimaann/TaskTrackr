import { db } from "./db.js";

async function createTable(){
    await db.query(`CREATE TABLE Tasks(
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        email TEXT NOT NULL,
        date DATE NOT NULL,
        status VARCHAR(20) NOT NULL       
        ) `)
}

createTable()
console.log("table created successfully")
