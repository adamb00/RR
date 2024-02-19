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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importStar(require("../controllers/UserController"));
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const uploadImage_1 = require("../middlewares/uploadImage");
const router = (0, express_1.Router)();
const userController = new UserController_1.default();
router.get('/current-user', authenticateUser_1.default, UserController_1.getCurrentUser);
router.patch('/update-password', authenticateUser_1.default, UserController_1.updatePassword);
router.patch('/mark-notifications', authenticateUser_1.default, UserController_1.markNotifications);
router.patch('/mark-one-notification', authenticateUser_1.default, UserController_1.markNotification);
router.patch('/delete-notifications', authenticateUser_1.default, UserController_1.deleteAllNotifications);
router.post('/upload-image', userController.uploadImage, (0, uploadImage_1.resizeImage)(300), authenticateUser_1.default, UserController_1.updateMe);
router.get('/get-image/:key', UserController_1.getUserImage);
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getOneUser).patch(userController.updateOneUser);
exports.default = router;
//# sourceMappingURL=UserRoute.js.map