"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.message).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new appError_1.default(message, 400);
};
const handleJWTError = () => new appError_1.default('Invalid token. Please log in again!', 401);
const handleJWTExpiredError = () => new appError_1.default('Your token has expired! Please log in again.', 401);
const sendErrorDev = (err, req, res) => {
    console.log('err', err);
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        console.error('ERROR 💥', err);
        res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message,
        });
    }
};
const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }
        return res.status(500).json({
            status: err.status,
            message: err.message,
        });
    }
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went very wrong!',
            msg: err.message,
        });
    }
    return res.status(err.statusCode).render('error', {
        title: 'Something went very wrong!',
        msg: 'Please try again later.',
    });
};
const globalErrorHandler = (err, req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (validateEnv_1.default.NODE_ENV === ' development') {
        sendErrorDev(err, req, res);
        console.log('ErrorController', err);
    }
    else if (validateEnv_1.default.NODE_ENV === 'production') {
        let error = Object.assign({}, err);
        error.message = err.message;
        if (error.name === 'CastError')
            error = handleCastErrorDB(error);
        if (error.code === 11000)
            error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (error.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        sendErrorProd(error, req, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
//# sourceMappingURL=ErrorController.js.map