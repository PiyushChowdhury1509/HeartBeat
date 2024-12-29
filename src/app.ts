import "dotenv/config";
import cors from "cors";
import compression from "compression";
import express, { Express, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";
import User from "./models/user";
import { UserType } from "./schemas/userSchema";

const app: Express = express();
const PORT: number = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());

app.post("/user", async (req: Request, res: Response) => {
  try {
    const body = req.body as UserType;
    const newUser = new User(body);
    await newUser.save();
    res
      .status(200)
      .json({ message: "user created successfully", user: newUser });
  } catch (err) {
    const error = err as Error;
    console.error(`an error occurred: ${error}`);
    res
      .status(500)
      .json({ message: "an error occurred", error: error.message });
  }
});

app.use("/", (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    console.log("an error occurred: ", err);
    res.status(500).send("something went wrong");
  }
});

connectDB().then(() => {
  console.log("database successfully connected");
  app.listen(PORT, () => {
    console.log(`server is listening on PORT ${PORT}`);
  });
});
