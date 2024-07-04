import express from 'express'
import dotenv from 'dotenv'
import connectToMongoDb from './db/connectToMongoDb.js'
import taskRouter from './routes/task.route.js'
import cors from 'cors'

const app=express()
app.use(cors())
dotenv.config()
app.use(express.json())


//routes
app.use('/Tasks',taskRouter)


connectToMongoDb().then(()=>{

    app.listen(process.env.PORT | 3000,(req,res)=>{
                console.log(`Server is running on port ${process.env.PORT}`)                
    })
}).catch((err)=>{
    console.log("Error connecting to database",err.message)
  
})

