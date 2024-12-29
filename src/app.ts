import 'dotenv/config'
import express, { Express,Request,Response,NextFunction } from 'express'
import { UserAuth,AdminAuth } from './middlewares/auth';
import connectDB from './config/connectDB';

const app:Express=express();
const PORT:number=4000;

connectDB()
.then(()=>{
    console.log("database successfully connected");
    app.listen(PORT,()=>{
        console.log(`server is listening on PORT ${PORT}`)
    })
})

//middleware
app.get('/admin',AdminAuth,(req:Request,res:Response)=>{
    res.status(201).send('admin data');
})

app.get('/user',UserAuth,(req:Request,res:Response)=>{
    res.status(201).send('user data');
})

//error handling
app.get('/error',(req:Request,res:Response)=>{
    throw new Error('error occurred');
})

//request query and params
app.get('/test',(req:Request,res:Response)=>{
    const {name}=req.query;
    const {age}=req.query;
    res.send({"name": name,"age": age});
})

app.post('/test/:userId/:siblings',(req:Request,res:Response)=>{
    const {userId,siblings}=req.params;
    res.send({"userid":userId,"siblings":siblings});
})

//error handler
app.use('/',(err:Error,req:Request,res:Response,next:NextFunction)=>{
    if(err){
        console.log(err.message)
        res.status(500).send(`something went wrong: ${err}`)
    }
})
