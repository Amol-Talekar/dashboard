import express from "express";
import { getCustomers, getProdcuts } from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProdcuts);
router.get("/customers", getCustomers);

export default router;
