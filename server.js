import express from "express";
import {db} from "./db/db.js";
import cors from 'cors';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleware } from "./authMiddleware.js";

const server = express()
const PORT = 8000
const SECRET = "orangepineapple";

server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ limit: "10mb", extended: true }))
server.use(cors({
  origin: "*",
}));




server.get('/api/tasks/all',async(req,res)=>{

  const response = await db.query(`SELECT * FROM Tasks`)
  res.json(response.rows)

})

server.get('/api/tasks/getAllStats',async(req,res)=>{

  let response = await db.query(`SELECT COUNT(*) FROM Tasks`)
  const allTasks = response.rows[0].count
  response = await db.query(`SELECT COUNT(*) FROM Tasks WHERE status=$1`,["pending"])
  const pendingTasks = response.rows[0].count
  response = await db.query(`SELECT COUNT(*) FROM Tasks WHERE status=$1`,["in-progress"])
  const inProgressTasks = response.rows[0].count
  response = await db.query(`SELECT COUNT(*) FROM Tasks WHERE status=$1`,["completed"])
  const completedTasks = response.rows[0].count
  
  const allStats = {"all":`${allTasks}`,"pending":`${pendingTasks}`,"inprogress":`${inProgressTasks}`,"completed":`${completedTasks}`}
  res.json(allStats)

})




server.get('/api/tasks',async (req,res)=>{

  const {id, status} = req.query
  await db.query(`UPDATE Tasks SET status = $1 WHERE id = $2`,[status,id])
  
    res.send("done")

    
})



server.get('/api/task/:id', async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    "SELECT * FROM Tasks WHERE id = $1",
    [id]
  );

  res.json(result.rows[0]);
});








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


    const email = req.user.email;

     const result = await db.query(
    "SELECT * FROM Tasks WHERE status = $1 AND email = $2",
    ["completed", email]
  );

  res.json(result.rows);
    
})



server.get('/api/getAllEmployees',async (req,res)=>{

     const result = await db.query(
    "SELECT * FROM Users WHERE role = $1",
    ["employee"]
  );

  res.json(result.rows);
    
})


server.post('/api/addTask',async (req,res)=>{
  console.log("adding task")
    const {user,title,description,date} = req.body
    await db.query(`INSERT INTO Tasks (title, description, email, date, status)
VALUES ($1,$2,$3,$4,$5)
`,[title,description,user.email,date,'pending'])
console.log("task added")
  res.json({ message: "Task added" });
})


server.post('/api/task/update',async (req,res)=>{
  console.log("updating task")
    const {id,title,description,email,date,status} = req.body
    await db.query(`UPDATE Tasks SET title=$1, description= $2, email=$3, date=$4,status = $5 WHERE id=$6
      `,[title,description,email,date,status,id])

  res.json({ message: "Task updated" });
})


server.post('/api/task/submit',async (req,res)=>{
  console.log("submitting task")
    const {id,description,beforeImg,afterImg,location} = req.body
    const latitude = location.latitude
    const longitude = location.longitude
    await db.query(`INSERT INTO Submission (task_id,beforeImage,afterImage,latitude,longitude, comment)
VALUES ($1,$2,$3,$4,$5,$6)
`,[parseInt(id),beforeImg,afterImg,latitude,longitude,description])
console.log("task submitted")
await db.query(`UPDATE Tasks SET status = $1 WHERE id = $2`,["completed",id])
console.log("task status updated")
  res.json({ message: "Task submitted" });
})





server.get('/api/task/:id/submission', async (req, res) => {
  const { id } = req.params;

  const result = await db.query(
    "SELECT * FROM Submission WHERE task_id = $1",
    [id]
  );

    if (result.rows.length === 0) {
    return res.json(null)
  }

  res.json(result.rows[0]);
});


server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})