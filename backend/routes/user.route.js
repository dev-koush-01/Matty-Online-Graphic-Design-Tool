import express from "express";
import {
    
    login,
    logout,
    register,
} from "../controller/usercontroller.js";

import { isAuthenticated } from "../middleware/authUser.js";

import passport from "passport";
import createTokenAndSaveCookies from "../jwt/AuthToken.js";
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    // Successful authentication
    res.json({ message: "Google login successful", user: req.user });
  }
);




router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
 



export default router;