import express, {Express,Request,Response} from 'express'

const app:Express=express();
const PORT=4000;

app.use('/',(req:Request,res:Response)=>{
    res.send("bye bye bye");
})

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})