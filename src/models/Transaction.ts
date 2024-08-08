import mongoose from "mongoose";

const from = new mongoose.Schema({
  name:{
    type: String,
  },
  email:{
    type: String,
  },
  accountNo:{
    type: Number,
  }
},{_id:false})

const to = new mongoose.Schema({
  name:{
    type: String,
  },
  email:{
    type: String,
  },
  accountNo:{
    type: Number,
  }
},{_id:false})

const transactionSchema = new mongoose.Schema({
  amount:{
    type: Number,
    required: true,
  },
  from:{
    type:from,
    ref: "from",
    required: true,
  },
  to:{
    type: to,
    ref: "User",
    required: true,
  },
  status:{
    type:String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  }
},{timestamps : true})

const Transaction = mongoose.models.transaction || mongoose.model('transaction',transactionSchema);


export default Transaction;