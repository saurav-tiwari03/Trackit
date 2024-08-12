import mongoose, { Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  accountNo: number;
  role: "admin" | "user";
  email: string;
  password: string;
  balance: number;
  transactions: mongoose.Types.ObjectId[];
  qrCodeUrl?: string | null;
  otp?: number | null;
  accountVerified: boolean;
  accountVerifiedToken:string | null;
}
  
const userSchema:Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  accountNo: {
    type: Number,
    required: true,
    unique: true
  },
  role: {  
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user"
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
  },
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    default: []
  }],
  qrCodeUrl: {
    type: String,
    default: null,
  },
  otp: {
    type: Number,
    default: null 
  },
  accountVerified: {
    type: Boolean,
    default: false
  },
  accountVerifiedToken : {
    type: String,
    required: true,
  }
})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
