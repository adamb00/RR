"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkSchema = void 0;
const mongoose_1 = require("mongoose");
exports.linkSchema = new mongoose_1.Schema({
    link: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    active: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    versionKey: false,
});
const Link = (0, mongoose_1.model)('Link', exports.linkSchema);
exports.default = Link;
//# sourceMappingURL=LinkModel.js.map