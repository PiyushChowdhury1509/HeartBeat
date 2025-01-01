import "dotenv/config";
import cors from "cors";
import compression from "compression";
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { PrismaClient, Gender, Prisma } from "@prisma/client";

const app: Express = express();
const PORT: number = 4000;
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.post("/test", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = await prisma.user.create({
      data: body,
    });
    res.status(200).json({ message: "registration successfull", user: user });
  } catch (err) {
    const error = err as Error;
    console.log(`an error occurred: ${error}`);
    res
      .status(500)
      .json({
        message: "an error occurred while registering",
        error: error.message,
      });
  }
});

app.get("/test", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ users: users });
  } catch (err) {
    const error = err as Error;
    console.log(`an error occurred: ${error}`);
    res.status(500).json({ message: `an error occurred: ${error}` });
  }
});

app.patch("/test/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: body,
    });
    res
      .status(200)
      .json({ message: "data updated successfully", updatedUser: updatedUser });
  } catch (err) {
    const error = err as Error;
    console.log(`an error occurred during updation: ${error}`);
    res.status(500).json({ message: `an error occurred: ${error.message}` });
  }
});

app.delete('/test/:firstName', async (req:Request,res:Response)=>{
  try{
    const { firstName }=req.params;
    const deletedUser = await prisma.user.deleteMany({
      where:{
        firstName:firstName,
      }
    })
    res.status(200).json({message:"user successfully deleted",deletedUser:deletedUser});
  } catch(err){
    const error=err as Error;
    console.log(`an error occurred: ${error.message}`);
    res.status(500).json({message: `an error occurred: ${error.name}`});
  }
})

app.use("/", (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log("an error occurred: ", err);
    res.status(500).send("something went wrong");
  }
});

app.listen(PORT,()=>{
  console.log(`server is listening on PORT ${PORT}`);
})
