"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NotificationController_1 = __importDefault(require("../controllers/NotificationController"));
const authenticateUser_1 = __importDefault(require("../middlewares/authenticateUser"));
const restrictTo_1 = __importDefault(require("../middlewares/restrictTo"));
const router = (0, express_1.Router)();
const notificationController = new NotificationController_1.default();
router.use(authenticateUser_1.default);
// router.route('/').get(notificationController.getAllNotifications).post(restrictTo('Admin'), createNotification);
router.route('/').get(notificationController.getAllNotifications);
router
    .route('/:id')
    .get(notificationController.getOneNotification)
    .patch((0, restrictTo_1.default)('Admin'), notificationController.updateOneNotification);
exports.default = router;
//# sourceMappingURL=NotificationRoute.js.map