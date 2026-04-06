import { db } from "./db.js";

async function createTable(){
    await db.query(`CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
)`)
}

createTable()
