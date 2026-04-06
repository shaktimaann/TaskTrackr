import {db} from "./db.js";


async function viewTable(){
    const data = await db.query(`SELECT * FROM Tasks`)
    console.log(data.rows)


}


viewTable()