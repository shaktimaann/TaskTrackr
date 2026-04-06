import express from "express";
import {db} from "./db/db.js";
import cors from 'cors';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "./authMiddleware.js";

const server = express()
const PORT = 8000
const SECRET = "orangepineapple";

server.use(express.json());
server.use(cors());



server.get('/api/tasks',async (req,res)=>{

  const {id, status} = req.query
  await db.query(`UPDATE Tasks SET status = $1 WHERE id = $2`,[status,id])
  console.log("done")
    res.send("done")

    
})



server.post('/api/signup',async (req,res)=>{
    const {email, password, role} = req.body

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
    "INSERT INTO Users (email, password, role) VALUES ($1, $2, $3)",
    [email, hashedPassword, role]
  );
  res.json({ message: "User created" });
})



server.post('/api/login', async (req,res) => {


    const {email, password} = req.body

    const result = await db.query(`SELECT * FROM Users WHERE email=$1`,[email])
    

    if (result.rows.length === 0) {
    return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0]

    const userPassword = result.rows[0].password

    const validation = await bcrypt.compare(password,userPassword)

    if(!validation){
        return res.status(400).json({ error: "Invalid Password" });

    }

    const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token, role:user.role })
    
})


server.get('/api/tasks/pending',authMiddleware,async (req,res)=>{



    const email = req.user.email;

     const result = await db.query(
    "SELECT * FROM Tasks WHERE status = $1 AND email = $2",
    ["pending", email]
  );

  res.json(result.rows);
    
})


server.get('/api/tasks/in-progress',authMiddleware,async (req,res)=>{



    const email = req.user.email;

     const result = await db.query(
    "SELECT * FROM Tasks WHERE status = $1 AND email = $2",
    ["in-progress", email]
  );


  res.json(result.rows);
    
})




server.get('/api/tasks/completed',authMiddleware,async (req,res)=>{

    console.log("inside completed")

    const email = req.user.email;

     const result = await db.query(
    "SELECT * FROM Tasks WHERE status = $1 AND email = $2",
    ["completed", email]
  );

  res.json(result.rows);
    
})



server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})