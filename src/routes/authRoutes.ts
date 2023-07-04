import express from "express";
const router = express.Router();

import { auth } from "../controllers/authController";

router.post("/auth", auth);

export default router;
