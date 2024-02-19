"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const notificationSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
    created_by: {
        type: String,
    },
});
const Notification = (0, mongoose_1.model)('Notification', notificationSchema);
exports.default = Notification;
//# sourceMappingURL=NotificationModel.js.map