import express, {Express,Request,Response} from 'express'

const app:Express=express();
const PORT=4000;

app.get('/test',(req:Request,res:Response)=>{
    const {name}=req.query;
    const {age}=req.query;
    res.send({"name": name,"age": age});
})

app.post('/test/:userId/:siblings',(req:Request,res:Response)=>{
    const {userId,siblings}=req.params;
    res.send({"userid":userId,"siblings":siblings});
})

app.use('/',(req:Request,res:Response)=>{
    res.send("bye bye bye");
})

app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
})