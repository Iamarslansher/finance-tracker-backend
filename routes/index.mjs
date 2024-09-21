import express from "express";
import users from "./user.mjs";
import transactions from "./transaction.mjs";
import totalAmount from "./totalAmount.mjs";

const router = express.Router();

router.use("/users", users);
router.use("/transactions", transactions);
router.use("/totalamount", totalAmount);

export default router;
