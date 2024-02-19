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
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const LinkModel_1 = require("./LinkModel");
const crypto_1 = __importDefault(require("crypto"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Please, provide us your full name.'],
    },
    email: {
        unique: true,
        lowercase: true,
        type: String,
        required: [true, 'Please, provide us, your email address.'],
        validate: [validator_1.default.isEmail, 'Please, provide a valid email address.'],
    },
    role: {
        type: String,
        default: 'User',
    },
    password: {
        type: String,
        minlength: 8,
        select: false,
        required: [true, 'Please provide a password'],
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    birthday: { type: Date },
    availablePoints: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    nationality: {
        type: String,
    },
    referralCode: {
        type: Number,
    },
    level: {
        type: Number,
    },
    parent: {
        type: String,
    },
    children_level_1: {
        type: [String],
    },
    children_level_2: {
        type: [String],
    },
    children_level_3: {
        type: [String],
    },
    photo: {
        type: String,
    },
    active: {
        type: Boolean,
        default: false,
    },
    activationToken: {
        type: String,
    },
    activationTokenExpires: {
        type: Date,
    },
    notifications: [
        {
            read: { type: Boolean, default: false },
        },
    ],
    accumulatedPoints: {
        type: Number,
        default: 0,
    },
    availableLinks: {
        type: [LinkModel_1.linkSchema],
    },
    refreshToken: String,
}, { validateBeforeSave: false });
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        this.passwordChangedAt = Date.now() - 1000;
        this.passwordConfirm = undefined;
        next();
    });
});
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto_1.default.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
userSchema.methods.createActivationToken = function () {
    const activationToken = crypto_1.default.randomBytes(32).toString('hex');
    this.activationToken = crypto_1.default.createHash('sha256').update(activationToken).digest('hex');
    this.activationTokenExpires = Date.now() + 10 * 60 * 1000;
    return activationToken;
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
//# sourceMappingURL=UserModel.js.map