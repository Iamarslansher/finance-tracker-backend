import express from "express";
import Transactions from "../modles/Transaction.mjs";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Transactions.find();

    res.send({ message: "All Transactions!", data });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/add", async (req, res) => {
  try {
    await Transactions.create(req.body);
    res.send({ message: "Transaction added successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
