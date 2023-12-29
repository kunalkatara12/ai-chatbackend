"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginGoogle = exports.userSignupGoogle = exports.changePassword = exports.userLogout = exports.verifyUser = exports.userLogin = exports.userSignup = exports.getAllUsers = void 0;
const User_models_1 = __importDefault(require("../models/User.models"));
const bcrypt_1 = require("bcrypt");
const token_manager_utils_1 = require("../utils/token-manager.utils");
const constant_utils_1 = require("../utils/constant.utils");
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_models_1.default.find();
        return res.status(200).json({
            message: "Ok",
            users,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            cause: error.message,
        });
    }
};
exports.getAllUsers = getAllUsers;
const userSignup = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        //existing user
        const exUser = await User_models_1.default.findOne({ email });
        if (exUser)
            return res.status(401).json({
                message: "User is already registered",
            });
        // password and confirm password should match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password and confirm password do not match in user.controllers.ts",
            });
        }
        if (password === "" || password === null || password === undefined)
            return res.status(404).json({
                message: "password is empty",
            });
        //hashing password
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        //saving user
        const user = await new User_models_1.default({
            name,
            email,
            password: hashedPassword,
        }).save();
        // clear previous cookies
        res.clearCookie(constant_utils_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        // expire date
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //create token
        const token = (0, token_manager_utils_1.createToken)(user._id.toString(), user.email, "7d");
        res.cookie(constant_utils_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            // sameSite:"lax",
            // secure:process.env.NODE_ENV==="production"?true:false
        });
        return res.status(200).json({
            message: "Ok",
            // id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.userSignup = userSignup;
const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User_models_1.default.findOne({
            email,
        });
        if (!user) {
            return res.status(401).json({
                message: "User is not registered",
            });
        }
        //compare Password
        const isPasswordCorrect = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "Incorrect Password",
            });
        }
        // clear previous cookies
        res.clearCookie(constant_utils_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        // expire date
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //create token
        const token = (0, token_manager_utils_1.createToken)(user._id.toString(), user.email, "7d");
        res.cookie(constant_utils_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            // sameSite:"lax",
            // secure:process.env.NODE_ENV==="production"?true:false
        });
        return res.status(200).json({
            message: "Ok",
            // id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.userLogin = userLogin;
const verifyUser = async (req, res, next) => {
    try {
        const user = await User_models_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered or Token Malfunctioned",
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Permissions did not match",
            });
        }
        //  console.log(user._id.toString(),res.locals.jwtData.id)
        return res.status(200).json({
            message: "Ok",
            // id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.verifyUser = verifyUser;
const userLogout = async (req, res, next) => {
    try {
        const user = await User_models_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered or Token Malfunctioned",
            });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({
                message: "Permissions did not match",
            });
        }
        // clear cookies
        res.clearCookie(constant_utils_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        //  console.log(user._id.toString(),res.locals.jwtData.id)
        return res.status(200).json({
            message: "Ok",
            // id: user._id.toString(),
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.userLogout = userLogout;
const changePassword = async (req, res, next) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const user = await User_models_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json({
                message: "User not registered or Token Malfunctioned",
            });
        }
        //compare Password
        const isPasswordCorrect = await (0, bcrypt_1.compare)(oldPassword, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: "Incorrect Password",
            });
        }
        //hashing password
        const hashedPassword = await (0, bcrypt_1.hash)(newPassword, 10);
        //saving password in userData
        await User_models_1.default.updateOne({
            _id: user.id, // Filter based on the id
        }, {
            password: hashedPassword, // Set the new hashed password
        });
        // clear previous cookies
        res.clearCookie(constant_utils_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        // expire date
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //create token
        const token = (0, token_manager_utils_1.createToken)(user._id.toString(), user.email, "7d");
        res.cookie(constant_utils_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            // sameSite:"lax",
            // secure:process.env.NODE_ENV==="production"?true:false
        });
        //  console.log(user._id.toString(),res.locals.jwtData.id)
        return res.status(200).json({
            message: "Ok",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in change password in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.changePassword = changePassword;
const userSignupGoogle = async (req, res, next) => {
    try {
        const { name, email, jti } = req.body;
        //existing user
        const exUser = await User_models_1.default.findOne({ email });
        if (exUser)
            return res.status(401).json({
                message: "User is already registered",
            });
        //saving user
        const user = await new User_models_1.default({
            name,
            email,
            isGoogleAccount: true,
        }).save();
        // clear previous cookies
        res.clearCookie(constant_utils_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        // expire date
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //create token
        const token = (0, token_manager_utils_1.createToken)(user._id.toString(), user.email, "7d");
        res.cookie(constant_utils_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            // sameSite:"lax",
            // secure:process.env.NODE_ENV==="production"?true:false
        });
        return res.status(200).json({
            message: "Ok",
            // id: user._id.toString(),
            name: user.name,
            email: user.email,
            isGoogleAccount: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.userSignupGoogle = userSignupGoogle;
const userLoginGoogle = async (req, res, next) => {
    try {
        const { name, email, jti } = req.body;
        //existing user
        const exUser = await User_models_1.default.findOne({
            email,
        });
        if (!exUser) {
            return res.status(401).json({
                message: "User is not registered",
            });
        }
        // clear previous cookies
        res.clearCookie(constant_utils_1.COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        // expire date
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        //create token
        const token = (0, token_manager_utils_1.createToken)(exUser._id.toString(), exUser.email, "7d");
        res.cookie(constant_utils_1.COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            // sameSite:"lax",
            // secure:process.env.NODE_ENV==="production"?true:false
        });
        return res.status(200).json({
            message: "Ok",
            // id: exUser._id.toString(),
            name: exUser.name,
            email: exUser.email,
            isGoogleAccount: true,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error in user.controllers.ts",
            cause: error.message,
        });
    }
};
exports.userLoginGoogle = userLoginGoogle;
//# sourceMappingURL=user.controllers.js.map