import mongoose from "mongoose";

const { Schema } = mongoose;

const TotalAmountSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
});

const TotalAmount = mongoose.model("TotalAmount", TotalAmountSchema);

export default TotalAmount;
