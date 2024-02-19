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
exports.upload = exports.resizeImage = void 0;
const multer_1 = __importDefault(require("multer"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const multerStore = multer_1.default.memoryStorage();
const filter = (req, file, cb) => {
    req.file = file;
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const resizeImage = (resize) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file)
        return next();
    req.file.filename = `image_${Date.now()}.png`;
    const outputPath = path_1.default.join(__dirname, '../uploads', req.file.filename);
    req.file.path = outputPath;
    yield (0, sharp_1.default)(req.file.buffer)
        .rotate()
        .resize({
        width: resize,
        height: resize,
        fit: 'inside',
    })
        .withMetadata()
        .toFormat('png')
        .jpeg({ quality: 90 })
        .toFile(outputPath);
    req.body.image = req.file.filename;
    next();
}));
exports.resizeImage = resizeImage;
exports.upload = (0, multer_1.default)({
    fileFilter: filter,
    storage: multerStore,
});
//# sourceMappingURL=uploadImage.js.map