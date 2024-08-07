import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount:{
    type: Number,
    required: true,
  },
  from:{
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to:{
    type: mongoose.Schema.Types.ObjectId,
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