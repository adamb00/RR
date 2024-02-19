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
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const appError_1 = __importDefault(require("../utils/appError"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const verifyJwt_1 = require("./verifyJwt");
exports.default = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split('=')[1]) || ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]) || req.cookies.jwt;
        if (!token) {
            return next(new appError_1.default('You are not logged in! Please log in to get access.', 401));
        }
        const decoded = (yield (0, verifyJwt_1.jwtVerifyPromisified)(token, validateEnv_1.default.JWT_SECRET, res));
        if (!decoded.id || !decoded)
            return next(new appError_1.default('Something went wrong', 404));
        const currentUser = yield UserModel_1.default.findById(decoded.id);
        if (!currentUser) {
            return next(new appError_1.default('The user belonging to this token does no longer exist.', 401));
        }
        req.user = currentUser;
        next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return next(new appError_1.default('Your token has expired! Please log in again.', 401));
        }
        // Handle other JWT errors
        return next(new appError_1.default('Invalid token. Please log in again!', 401));
    }
});
//# sourceMappingURL=authenticateUser.js.map