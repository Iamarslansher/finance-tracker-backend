import express from "express";
import TotalAmount from "../modles/TotalAmount.mjs";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const totalAmount = await TotalAmount.findOne();
    res.send({ message: "Your Total Amount!", totalAmount });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/add", async function (req, res) {
  try {
    const { userId, totalAmount } = req.body;

    const total_amount = await TotalAmount.findOne({ userId });

    if (!total_amount) {
      await TotalAmount.create({ userId, totalAmount });
      res.send({ message: "Amount added!" });
    } else {
      await TotalAmount.findOneAndUpdate(
        { userId },
        { totalAmount: total_amount.totalAmount + +totalAmount }
      );
      res.send({ message: "Amount Updated!" });
    }
  } catch (error) {
    console.log(error.message, 32);
    res.status(500).send({ message: "Server Error", error: error.message });
  }
});

router.put("/update/:userId", async function (req, res) {
  try {
    const { userId } = req.params;

    const updatedAmount = await TotalAmount.findOneAndUpdate(
      { userId },
      req.body,
      { new: true }
    );
    if (!updatedAmount) {
      return res.status(404).send({ message: "User not found!" });
    }

    res.send({ message: "Amount Updated Successfully!", updatedAmount });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
export default router;
