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
exports.deleteAllNotifications = exports.updatePassword = exports.getUserImage = exports.updateMe = exports.markNotification = exports.markNotifications = exports.deleteUsersLink = exports.getCurrentUser = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const handler = __importStar(require("./../utils/handleControllers"));
const uploadImage_1 = require("../middlewares/uploadImage");
const s3_1 = require("../s3");
const appError_1 = __importDefault(require("../utils/appError"));
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const correctPassword_1 = require("../middlewares/correctPassword");
const createAndSendToken_1 = require("../middlewares/createAndSendToken");
const unlinkFile = util_1.default.promisify(fs_1.default.unlink);
class UserController {
    constructor() {
        this.uploadImage = uploadImage_1.upload.single('image');
        this.getAllUsers = handler.getAll(UserModel_1.default);
        this.getOneUser = handler.getOne(UserModel_1.default);
        this.createUser = handler.createOne(UserModel_1.default);
        this.updateOneUser = handler.updateOne(UserModel_1.default);
        this.deleteOneUser = handler.deleteOne(UserModel_1.default);
    }
}
exports.default = UserController;
exports.getCurrentUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = req.user;
    res.status(200).json({
        status: 'success',
        currentUser,
    });
}));
exports.deleteUsersLink = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const usersToUpdate = yield UserModel_1.default.find({ 'availableLinks.link': req.params.id });
    const updatePromises = usersToUpdate.map((user) => __awaiter(void 0, void 0, void 0, function* () {
        yield UserModel_1.default.findOneAndUpdate({ _id: user._id }, { $pull: { availableLinks: { link: req.params.id } } }, { runValidators: false });
    }));
    yield Promise.all(updatePromises);
    next();
}));
exports.markNotifications = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const updatedUser = yield UserModel_1.default.findByIdAndUpdate(userId, { $set: { 'notifications.$[].read': true } }, { new: true });
    if (!updatedUser) {
        res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }
    res.status(200).json({
        status: 'success',
    });
}));
exports.markNotification = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const notificationIdToUpdate = req.body.id;
    const updatedUser = yield UserModel_1.default.findOneAndUpdate({ _id: userId, 'notifications._id': notificationIdToUpdate }, { $set: { 'notifications.$.read': true } }, { new: true });
    if (updatedUser) {
        res.status(200).json({
            status: 'success',
            notificationIdToUpdate,
        });
    }
}));
const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el))
            newObj[el] = obj[el];
    });
    return newObj;
};
exports.updateMe = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        res.status(404).json({
            status: 'error',
            message: 'No file provided',
        });
        return next(new appError_1.default('No file provided', 400));
    }
    if (req.body.password || req.body.passwordConfirm) {
        return next(new appError_1.default('This route is not for password updates. Please use /updateMyPassword.', 400));
    }
    const uploadImage = yield (0, s3_1.upload)(req.file);
    const filteredBody = filterObj(req.body, 'name', 'email');
    if (req.file) {
        filteredBody.photo = uploadImage.Key;
        yield unlinkFile(req.file.path);
    }
    const updatedUser = yield UserModel_1.default.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true,
    });
    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser,
        },
    });
}));
exports.getUserImage = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.params.key;
    try {
        const readStream = (0, s3_1.download)(key);
        readStream.pipe(res);
        readStream.on('error', error => {
            console.error(error);
            res.status(404).send('Image not found');
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}));
exports.updatePassword = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findById(req.user._id).select('+password');
    if (!user) {
        res.status(404).json({
            status: 'error',
            message: 'No user found...',
            item: 'email',
        });
        return next(new appError_1.default('No user found...', 404));
    }
    if (!(yield (0, correctPassword_1.correctPassword)(req.body.passwordCurrent, user === null || user === void 0 ? void 0 : user.password))) {
        res.status(401).json({
            status: 'error',
            message: 'Your current password is wrong',
            item: 'passwordCurrent',
        });
        return next(new appError_1.default('Your current password is wrong.', 401));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    yield user.save();
    (0, createAndSendToken_1.createAndSendToken)(user, 200, req, res);
}));
exports.deleteAllNotifications = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    user.notifications = [];
    yield user.save();
    res.status(201).json({
        status: 'success',
        message: 'All notifications deleted successfully.',
    });
}));
//# sourceMappingURL=UserController.js.map