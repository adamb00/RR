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
const appError_1 = __importDefault(require("../utils/appError"));
exports.default = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { role } = req.user;
        if (!roles.includes(role)) {
            res.status(403).json({
                status: 'error',
                message: 'You do not have permission to perform this action',
            });
            return next(new appError_1.default('You do not have permission to perform this action', 403));
        }
        next();
    });
};
//# sourceMappingURL=restrictTo.js.map