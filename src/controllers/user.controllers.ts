import { NextFunction, Request, Response } from "express";
import User from "../models/User.models";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.utils";
import { COOKIE_NAME } from "../utils/constant.utils";
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      message: "Ok",
      users,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      cause: error.message,
    });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    //existing user
    const exUser = await User.findOne({ email });
    if (exUser)
      return res.status(401).json({
        message: "User is already registered",
      });
    // password and confirm password should match
    if (password !== confirmPassword) {
      return res.status(400).json({
        message:
          "Password and confirm password do not match in user.controllers.ts",
      });
    }
    if (password === "" || password === null || password === undefined)
      return res.status(404).json({
        message: "password is empty",
      });

    //hashing password
    const hashedPassword = await hash(password, 10);
    //saving user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    // clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
    });
    // expire date
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    //create token
    const token = createToken(user._id.toString(), user.email, "7d");
    res.cookie(COOKIE_NAME, token, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
      // sameSite:"lax",
      // secure:process.env.NODE_ENV==="production"?true:false
    });

    return res.status(200).json({
      message: "Ok",
      // id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in user.controllers.ts",
      cause: error.message,
    });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(401).json({
        message: "User is not registered",
      });
    }
    //compare Password
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Incorrect Password",
      });
    }

    // clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
    });
    // expire date
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    //create token
    const token = createToken(user._id.toString(), user.email, "7d");
    res.cookie(COOKIE_NAME, token, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
      // sameSite:"lax",
      // secure:process.env.NODE_ENV==="production"?true:false
    });

    return res.status(200).json({
      message: "Ok",
      // id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in user.controllers.ts",
      cause: error.message,
    });
  }
};
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
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
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in user.controllers.ts",
      cause: error.message,
    });
  }
};
export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
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
    res.clearCookie(COOKIE_NAME, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
    });
    //  console.log(user._id.toString(),res.locals.jwtData.id)
    return res.status(200).json({
      message: "Ok",
      // id: user._id.toString(),
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in user.controllers.ts",
      cause: error.message,
    });
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({
        message: "User not registered or Token Malfunctioned",
      });
    }

    //compare Password
    const isPasswordCorrect = await compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Incorrect Password",
      });
    }

    //hashing password
    const hashedPassword = await hash(newPassword, 10);
    //saving password in userData
    await User.updateOne(
      {
        _id: user.id, // Filter based on the id
      },
      {
        password: hashedPassword, // Set the new hashed password
      }
    );

    // clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
    });
    // expire date
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    //create token
    const token = createToken(user._id.toString(), user.email, "7d");
    res.cookie(COOKIE_NAME, token, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
      // sameSite:"lax",
      // secure:process.env.NODE_ENV==="production"?true:false
    });

    //  console.log(user._id.toString(),res.locals.jwtData.id)
    return res.status(200).json({
      message: "Ok",
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message:
        "Internal server error in change password in user.controllers.ts",
      cause: error.message,
    });
  }
};

export const userSignupGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, jti } = req.body;
    //existing user
    const exUser = await User.findOne({ email });
    if (exUser)
      return res.status(401).json({
        message: "User is already registered",
      });

    //saving user
    const user = await new User({
      name,
      email,
      isGoogleAccount: true,
    }).save();

    // clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
    });
    // expire date
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    //create token
    const token = createToken(user._id.toString(), user.email, "7d");
    res.cookie(COOKIE_NAME, token, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
      // sameSite:"lax",
      // secure:process.env.NODE_ENV==="production"?true:false
    });

    return res.status(200).json({
      message: "Ok",
      // id: user._id.toString(),
      name: user.name,
      email: user.email,
      isGoogleAccount: true,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in user.controllers.ts",
      cause: error.message,
    });
  }
};

export const userLoginGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, jti } = req.body;
    //existing user
    const exUser = await User.findOne({
      email,
    });
    if (!exUser) {
      return res.status(401).json({
        message: "User is not registered",
      });
    }

    // clear previous cookies
    res.clearCookie(COOKIE_NAME, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
    });
    // expire date
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    //create token
    const token = createToken(exUser._id.toString(), exUser.email, "7d");
    res.cookie(COOKIE_NAME, token, {
      // path: "/",
      // domain: "calm-khapse-f64d9a.netlify.app",
      expires,
      httpOnly: true,
      signed: true,
      sameSite: "none",
      secure: true,
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
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error in user.controllers.ts",
      cause: error.message,
    });
  }
};
