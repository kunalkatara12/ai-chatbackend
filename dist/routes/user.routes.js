"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const validators_utils_1 = require("../utils/validators.utils");
const token_manager_utils_1 = require("../utils/token-manager.utils");
const userRouter = (0, express_1.Router)();
userRouter.get("/", user_controllers_1.getAllUsers);
userRouter.post("/signup", (0, validators_utils_1.validate)(validators_utils_1.signupValidator), user_controllers_1.userSignup);
userRouter.post("/login", (0, validators_utils_1.validate)(validators_utils_1.loginValidator), user_controllers_1.userLogin);
userRouter.get("/auth-status", token_manager_utils_1.verifyToken, user_controllers_1.verifyUser);
userRouter.get("/logout", token_manager_utils_1.verifyToken, user_controllers_1.userLogout);
userRouter.post("/change-password", token_manager_utils_1.verifyToken, (0, validators_utils_1.validate)(validators_utils_1.passwordValidator), user_controllers_1.changePassword);
userRouter.post("/google-signup", user_controllers_1.userSignupGoogle);
userRouter.post("/google-login", user_controllers_1.userLoginGoogle);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map