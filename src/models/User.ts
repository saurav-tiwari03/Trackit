import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  accountNo:{
    type: Number,
    required: true,
    unique: true
  },
  role:{  
    type: String,
    required: true,
    enum: ["admin", "user"],
    default: "user"
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  },
  balance:{
    type: Number,
    required: true,
  },
  transactions :[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
    default:[]
  }],
  qrCodeUrl:{
    type: String,
    default: null,
  }
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;