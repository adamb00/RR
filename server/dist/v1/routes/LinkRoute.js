"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LinkController_1 = __importDefault(require("../controllers/LinkController"));
const restrictTo_1 = __importDefault(require("../middlewares/restrictTo"));
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
const linkController = new LinkController_1.default();
router.route('/').get(linkController.getAllLinks).post((0, restrictTo_1.default)('Admin'), linkController.createLink);
router
    .route('/:id')
    .get(linkController.getOneLink)
    .patch(linkController.updateOneLink)
    .delete(UserController_1.deleteUsersLink, linkController.deleteOneLink);
exports.default = router;
//# sourceMappingURL=LinkRoute.js.map