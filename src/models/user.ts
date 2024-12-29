import mongoose,{ Document} from "mongoose";

interface IUser extends Document{
    firstName:string,
    lastName:string,
    email:string,
    gender: 'Male' | 'Female' | 'Others'
}

const UserSchema = new mongoose.Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['Male', 'Female', 'Others'], required: true },
});

const User=mongoose.model<IUser>('User',UserSchema);

export default User;