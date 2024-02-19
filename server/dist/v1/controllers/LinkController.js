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
const LinkModel_1 = __importDefault(require("../models/LinkModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const handler = __importStar(require("./../utils/handleControllers"));
const appError_1 = __importDefault(require("../utils/appError"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
class UserController {
    constructor() {
        this.getAllLinks = handler.getAll(LinkModel_1.default);
        this.getOneLink = handler.getOne(LinkModel_1.default);
        this.deleteOneLink = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const linkToDelete = yield LinkModel_1.default.findById(req.params.id);
            if (!linkToDelete) {
                return next(new appError_1.default('No document found with that ID', 404));
            }
            const orderToDelete = linkToDelete.order;
            yield LinkModel_1.default.findByIdAndDelete(req.params.id);
            try {
                yield UserModel_1.default.updateMany({ $pull: { availableLinks: { _id: linkToDelete._id } } });
            }
            catch (error) {
                console.error('Error removing link from users:', error);
                return next(new appError_1.default('Failed to remove link from users', 500));
            }
            yield LinkModel_1.default.updateMany({ order: { $gt: orderToDelete } }, { $inc: { order: -1 } });
            res.status(204).json({
                status: 'success',
                message: 'Link deleted successfully',
            });
        }));
        this.createLink = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // let highestOrder = await Link.findOne({}, 'order', { sort: { order: -1 } }).lean();
            // const link = await Link.create({ ...req.body, order: highestOrder ? highestOrder.order + 1 : 0 });
            yield LinkModel_1.default.updateMany({}, { $inc: { order: 1 } });
            // Create the new link with order 0
            const link = yield LinkModel_1.default.create(Object.assign(Object.assign({}, req.body), { order: 0 }));
            res.status(201).json({
                status: 'success',
                link,
            });
        }));
        this.updateOneLink = (0, catchAsync_1.default)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield LinkModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!doc) {
                return next(new appError_1.default('No document found with that ID', 404));
            }
            if ('active' in req.body) {
                if (req.body.active) {
                    // await User.updateMany({ $addToSet: { availableLinks: doc } });
                    yield UserModel_1.default.updateMany({ $addToSet: { availableLinks: Object.assign(Object.assign({}, doc), { order: 0 }) } });
                    // Increment the order of other active links
                    yield UserModel_1.default.updateMany({ 'availableLinks.active': true, 'availableLinks._id': { $ne: doc._id } }, { $inc: { 'availableLinks.$.order': 1 } });
                }
                else {
                    yield UserModel_1.default.updateMany({ $pull: { availableLinks: { _id: doc._id } } });
                }
            }
            else {
                const updatedLink = yield LinkModel_1.default.findById(req.params.id);
                if (!updatedLink) {
                    return next(new appError_1.default('No document found with that ID', 404));
                }
                yield UserModel_1.default.updateMany({ 'availableLinks._id': doc._id }, { $set: { 'availableLinks.$': updatedLink } });
            }
            res.status(200).json({
                status: 'success',
                doc,
            });
        }));
    }
}
exports.default = UserController;
//# sourceMappingURL=LinkController.js.map