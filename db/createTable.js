import { db } from "./db.js";

async function createTable(){
    await db.query(`CREATE TABLE Submission (
  id SERIAL PRIMARY KEY,
  task_id INTEGER NOT NULL REFERENCES Tasks(id) ON DELETE CASCADE,
  beforeImage TEXT NOT NULL,
  afterImage TEXT NOT NULL,
  latitude INTEGER NOT NULL,
  longitude INTEGER NOT NULL,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); `)
}

createTable()
console.log("table created successfully")
