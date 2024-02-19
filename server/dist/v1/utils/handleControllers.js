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
exports.deleteOne = exports.getOne = exports.updateOne = exports.createOne = exports.getAll = void 0;
const catchAsync_1 = __importDefault(require("./catchAsync"));
const apiFeatures_1 = __importDefault(require("./apiFeatures"));
const appError_1 = __importDefault(require("./appError"));
const getAll = (Model, filterFn) => {
    return (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        let filter = {};
        if (filterFn) {
            filter = filterFn(req);
        }
        const totalItems = (yield Model.find()).length;
        const features = new apiFeatures_1.default(Model.find(filter), req.query).filter().sort().limitFields().paginate();
        const doc = yield features.query;
        res.status(200).json({
            status: 'success',
            totalItems,
            doc,
        });
    }));
};
exports.getAll = getAll;
const createOne = (Model, customizeRequestBody) => {
    return (0, catchAsync_1.default)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (customizeRequestBody) {
                customizeRequestBody(req);
            }
            const doc = yield Model.create(req.body);
            res.status(201).json({
                status: 'success',
                doc,
            });
        }
        catch (error) {
            res.send(500).json({ status: 'error', message: error });
        }
    }));
};
exports.createOne = createOne;
const updateOne = (Model) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doc = yield Model.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
            if (!doc) {
                return next(new appError_1.default('No document found with that ID', 404));
            }
            res.status(200).json({
                status: 'success',
                data: {
                    data: doc,
                },
            });
        }
        catch (err) {
            console.log(err);
        }
    }));
};
exports.updateOne = updateOne;
const getOne = (Model) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let query = Model.findById(req.params.id);
            const doc = (yield query.exec());
            if (!doc) {
                return next(new appError_1.default('No document found with that ID', 404));
            }
            res.status(200).json({
                status: 'success',
                doc,
            });
        }
        catch (err) {
            res.sendStatus(404);
        }
    }));
};
exports.getOne = getOne;
const deleteOne = (Model) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doc = yield Model.findByIdAndDelete(req.params.id);
            if (!doc) {
                return next(new appError_1.default('No document found with that ID', 404));
            }
            res.status(204).json({
                status: 'success',
                data: null,
            });
        }
        catch (err) {
            console.log(err);
        }
    }));
};
exports.deleteOne = deleteOne;
//# sourceMappingURL=handleControllers.js.map