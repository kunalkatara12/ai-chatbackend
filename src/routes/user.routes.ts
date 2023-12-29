import { Router } from "express";
import {
  getAllUsers,
  userSignup,
  userLogin,
  verifyUser,
  userLogout,
  changePassword,
  userSignupGoogle,
  userLoginGoogle,
} from "../controllers/user.controllers";
import {
  loginValidator,
  passwordValidator,
  signupValidator,
  validate,
} from "../utils/validators.utils";
import { verifyToken } from "../utils/token-manager.utils";

const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, userLogout);
userRouter.post(
  "/change-password",
  verifyToken,
  validate(passwordValidator),
  changePassword
);
userRouter.post("/google-signup", userSignupGoogle);
userRouter.post("/google-login", userLoginGoogle);

export default userRouter;
