"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndSendToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, validateEnv_1.default.JWT_SECRET, { expiresIn: '30m' });
};
exports.signToken = signToken;
const createAndSendToken = (user, statusCode, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, exports.signToken)(user._id);
    if (!req.user)
        req.user = user;
    res.clearCookie('jwt');
    res.cookie('jwt', token, {
        httpOnly: false,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });
    user.password = undefined;
    const updatedUser = yield UserModel_1.default.findByIdAndUpdate(user.id, { refreshToken: token });
    res.status(statusCode).json({
        status: 'success',
        token,
        data: updatedUser,
    });
});
exports.createAndSendToken = createAndSendToken;
//# sourceMappingURL=createAndSendToken.js.map