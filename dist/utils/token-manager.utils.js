"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const constant_utils_1 = require("./constant.utils");
const createToken = (id, email, expiresIn) => {
    const payload = {
        id,
        email,
    };
    const token = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn });
    // console.log(token)
    return token;
};
exports.createToken = createToken;
const verifyToken = async (req, res, next) => {
    const token = req.signedCookies[`${constant_utils_1.COOKIE_NAME}`];
    // console.log(token)
    if (!token || token.trim() === "") {
        return res.status(401).json({
            message: "Token not recieved in token-manager.utils.ts",
        });
    }
    return new Promise((resolve, reject) => {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err);
                return res.status(401).json({
                    message: "Token expired in token-manager.utils.ts",
                });
            }
            else {
                console.log("Token verified in token-manager.utils.ts");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=token-manager.utils.js.map