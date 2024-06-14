import express from "express";
import { register, login, profile } from "./controllers.js";
import { authenticateJWT } from "./middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticateJWT, profile);

export default router;
