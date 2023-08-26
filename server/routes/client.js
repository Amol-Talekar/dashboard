import express from "express";
import {
  getCustomers,
  getProdcuts,
  getTransactions,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProdcuts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);

export default router;
