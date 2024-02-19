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
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const email_1 = __importDefault(require("../utils/email"));
const appError_1 = __importDefault(require("../utils/appError"));
const correctPassword_1 = require("../middlewares/correctPassword");
const createAndSendToken_1 = require("../middlewares/createAndSendToken");
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const crypto_1 = __importDefault(require("crypto"));
const LinkModel_1 = __importDefault(require("../models/LinkModel"));
const verifyJwt_1 = require("../middlewares/verifyJwt");
class AuthController {
    constructor() {
        this.activateUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const hashedToken = crypto_1.default.createHash('sha256').update(req.params.token).digest('hex');
            const activeLinks = yield LinkModel_1.default.find({ active: true });
            const user = yield UserModel_1.default.findOne({
                activationToken: hashedToken,
                activationTokenExpires: { $gt: Date.now() },
            });
            if (!user) {
                return next(new appError_1.default('Token is invalid or has expired', 400));
            }
            user.activationToken = undefined;
            user.activationTokenExpires = undefined;
            user.availableLinks = activeLinks || [];
            user.active = true;
            yield user.save();
            (0, createAndSendToken_1.createAndSendToken)(user, 200, req, res);
        }));
        this.signup = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const highestReferralCode = yield UserModel_1.default.findOne({}, 'referralCode', { sort: { referralCode: -1 } }).lean();
                const parentUser = yield UserModel_1.default.findOne({ _id: req.body.parent });
                const grandparentUser = yield UserModel_1.default.findOne({ _id: parentUser === null || parentUser === void 0 ? void 0 : parentUser.parent });
                const granderparentUser = yield UserModel_1.default.findOne({ _id: grandparentUser === null || grandparentUser === void 0 ? void 0 : grandparentUser.parent });
                const newUser = yield UserModel_1.default.create(Object.assign(Object.assign({}, req.body), { referralCode: highestReferralCode.referralCode + 1, level: parentUser ? parentUser.level + 1 : 1 }));
                if (parentUser)
                    yield UserModel_1.default.updateOne({ _id: parentUser._id }, { $push: { children_level_1: newUser._id } });
                if (grandparentUser)
                    yield UserModel_1.default.updateOne({ _id: grandparentUser._id }, { $push: { children_level_2: newUser._id } });
                if (granderparentUser)
                    yield UserModel_1.default.updateOne({ _id: granderparentUser._id }, { $push: { children_level_3: newUser._id } });
                const resetToken = newUser.createActivationToken();
                yield newUser.save({ validateBeforeSave: false });
                // const url = `${req.protocol}://${req.get('host')}/signup?referralCode=${parentUser?.referralCode}`;
                const url = `http://192.168.0.33:5173/activate-account/${resetToken}`;
                // const url = `http://192.168.20.189:5173/activate-account/${resetToken}`; // BANDULA SYSTEM
                // const url = `http://172.20.10.3:5173/activate-account/${resetToken}`; // MOBILNET
                yield new email_1.default(newUser, url).sendWelcome();
                res.status(201).json({
                    status: 'success',
                });
            }
            catch (err) {
                if (err instanceof mongoose_1.default.Error.ValidationError) {
                    const errorMessages = [];
                    for (const field in err.errors) {
                        if (err.errors[field].kind === 'required') {
                            errorMessages.push(`${field}: ${err.errors[field].message}`);
                        }
                    }
                    res.status(400).json({
                        status: 'error',
                        errors: errorMessages,
                    });
                    return next(new appError_1.default('Something went wrong.', 404));
                }
                else if (err.code === 11000) {
                    console.log('error');
                    res.status(400).json({
                        status: 'error',
                        message: 'Email address is already in use.',
                        item: 'email',
                    });
                    return next(new appError_1.default('Email address is already in use.', 400));
                }
                else {
                    res.status(500).json({
                        status: 'error',
                        message: 'An error occurred',
                    });
                    return next(new appError_1.default('Something went wrong.', 500));
                }
            }
        }));
        this.getReferralCode = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { referralCode } = req.params;
                const user = yield UserModel_1.default.findOne({ referralCode });
                if (!user) {
                    res.status(404).json({
                        status: 'error',
                        message: 'Could not find user with this referral code.',
                        item: 'referralCode',
                    });
                    return next(new appError_1.default('Could not find user with this referral code.', 404));
                }
                else {
                    res.status(201).json({
                        status: 'success',
                        user: user === null || user === void 0 ? void 0 : user.id,
                    });
                }
            }
            catch (err) {
                console.error(err);
            }
        }));
        this.signin = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({
                        status: 'error',
                        message: 'Please provide us your email and password.',
                    });
                    return next(new appError_1.default('Please provide us your email and password.', 400));
                }
                const user = yield UserModel_1.default.findOne({ email }).select('+password');
                if (!user) {
                    res.status(404).json({
                        status: 'error',
                        message: 'No user found with this email.',
                        item: 'email',
                    });
                    return next(new appError_1.default('No user found with this email.', 404));
                }
                if (!user.active) {
                    const resetToken = user.createPasswordResetToken();
                    yield user.save({ validateBeforeSave: false });
                    const url = `http://192.168.0.33:5173/activate-account/${resetToken}}`;
                    // const url = `http://192.168.20.189:5173/activate-account/${resetToken}`; // BANDULA SYSTEM
                    yield new email_1.default(user, url).sendWelcome();
                    res.status(401).json({
                        status: 'error',
                        message: 'Please activate your account first. We just sent an activation email.',
                    });
                    return next(new appError_1.default('Please activate your account first. We just sent an activation email.', 401));
                }
                if (!(yield (0, correctPassword_1.correctPassword)(password, user.password))) {
                    res.status(401).json({
                        status: 'error',
                        message: 'Incorrect password',
                        item: 'password',
                    });
                    return next(new appError_1.default('Incorrect password.', 401));
                }
                yield (0, createAndSendToken_1.createAndSendToken)(user, 200, req, res);
                req.user = user;
            }
            catch (err) {
                console.log(err);
            }
        }));
        this.handleRefreshToken = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const refreshToken = req.cookies.jwt || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
            console.log('handleRefreshToken', refreshToken);
            if (!refreshToken) {
                res.status(401).json({ message: 'No token found', status: 'error' });
                return next(new appError_1.default('No token found', 404));
            }
            res.clearCookie('jwt');
            const user = (yield UserModel_1.default.findOne({ refreshToken }).exec());
            if (!user) {
                const decoded = (yield (0, verifyJwt_1.jwtVerifyPromisified)(refreshToken, validateEnv_1.default.JWT_SECRET, res));
                const currentUser = yield UserModel_1.default.findById(decoded.id);
                if (currentUser) {
                    currentUser.refreshToken = '';
                    yield currentUser.save();
                }
                res.sendStatus(403);
            }
            yield (0, createAndSendToken_1.createAndSendToken)(user, 200, req, res);
            req.user = user;
        }));
        this.signout = (_req, res) => {
            try {
                res.cookie('jwt', 'loggedout', {
                    expires: new Date(Date.now() + 10 * 1000),
                });
                res.status(200).json({ status: 'success' });
            }
            catch (err) {
                console.log(err);
            }
        };
        this.forgotPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const user = yield UserModel_1.default.findOne({ email });
            if (!user) {
                res.status(404).json({
                    status: 'error',
                    message: 'No user found with this email.',
                    item: 'email',
                });
                return next(new appError_1.default('No user found with this email.', 404));
            }
            const resetToken = user.createPasswordResetToken();
            yield user.save({ validateBeforeSave: false });
            try {
                const url = `http://192.168.0.33:5173/reset-password/${resetToken}`;
                yield new email_1.default(user, url).sendPasswordReset();
                res.status(200).json({
                    status: 'success',
                    message: 'Token sent to email!',
                });
            }
            catch (err) {
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                yield user.save({ validateBeforeSave: false });
                return next(new appError_1.default('There was an error sending the email. Try again later!', 500));
            }
        }));
        this.resetPassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const hashedToken = crypto_1.default.createHash('sha256').update(req.params.token).digest('hex');
            console.log(hashedToken);
            const user = yield UserModel_1.default.findOne({
                passwordResetToken: hashedToken,
                passwordResetExpires: { $gt: Date.now() },
            });
            if (!user) {
                return next(new appError_1.default('Token is invalid or has expired', 400));
            }
            user.password = req.body.password;
            user.passwordConfirm = req.body.passwordConfirm;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            yield user.save();
            (0, createAndSendToken_1.createAndSendToken)(user, 200, req, res);
        }));
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map