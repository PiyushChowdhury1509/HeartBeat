import mongoose from "mongoose";

type connectDBtype=()=>Promise<void>
const connectDB:connectDBtype = async()=>{
    await mongoose.connect(process.env.MONGODB_URI as string);
}

export default connectDB;