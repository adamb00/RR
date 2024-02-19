"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = (0, express_1.Router)();
const authController = new AuthController_1.default();
router.post('/signin', authController.signin);
router.post('/signup', authController.signup);
router.post('/signout', authController.signout);
router.get('/refresh', authController.handleRefreshToken);
router.get('/get-referralCode/:referralCode', authController.getReferralCode);
router.get('/activate-account/:token', authController.activateUser);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
exports.default = router;
//# sourceMappingURL=AuthRoute.js.map