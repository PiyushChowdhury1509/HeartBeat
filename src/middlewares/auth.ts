import { Request,Response,NextFunction } from "express"

export const UserAuth=(req:Request,res:Response,next:NextFunction)=>{
    console.log('user middleware called');
    const token:string='abc';
    const usertoken:string='abc';
    if(token!=usertoken){
        res.status(500).send('wrong credentials');
    }
    next();
}

export const AdminAuth=(req:Request,res:Response,next:NextFunction)=>{
    console.log('admin middleware called');
    const token:string='xyz';
    const admintoken:string='xyz';
    if(token!=admintoken){
        res.status(500).send('wrong credentials');
    }
    next();
}