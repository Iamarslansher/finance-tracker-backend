import mongoose from "mongoose";

const { Schema } = mongoose;

const transactionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
});

const Transactions = mongoose.model("Transaction", transactionSchema);

export default Transactions;
