import express from "express";
import { getProdcuts } from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProdcuts);

export default router;
