"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = exports.messageValidator = exports.signupValidator = exports.loginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.isEmpty()) {
                break;
            }
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({
            message: "Bad request in validator.utils.ts",
            errors: errors,
        });
    };
};
exports.validate = validate;
exports.loginValidator = [
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Email is invalid"),
    (0, express_validator_1.body)("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];
exports.signupValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required"),
    ...exports.loginValidator,
];
exports.messageValidator = [
    (0, express_validator_1.body)("message").notEmpty().withMessage("Message is required"),
];
exports.passwordValidator = [
    (0, express_validator_1.body)("newPassword")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
];
//# sourceMappingURL=validators.utils.js.map