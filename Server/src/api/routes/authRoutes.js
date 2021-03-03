import asyncHandler from "express-async-handler";
import express from "express";
import AuthService from "../../services/auth_service";

const router = express.Router();

/* Auth Router */

router.post(
  "/login",
  asyncHandler(async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const signIn = new AuthService(username, password);
      const { token } = await signIn.login();
      res.status(200).json({
        success: true,
        message: "Sign in successfully",
        token,
      });
      next();
    } catch (e) {
      throw new Error(e);
    }
  })
);

export default router;
