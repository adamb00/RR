"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateString = exports.handleError = exports.getErrorMessage = void 0;
const getErrorMessage = (error) => {
    let message;
    if (error instanceof Error)
        message = error.message;
    else if (error && typeof error === 'object' && 'message' in error) {
        message = String(error.message);
    }
    else if (typeof error === 'string') {
        message = error;
    }
    else if (error && typeof error === 'object' && 'data' in error) {
        message = String(error.data.message);
        return { message };
    }
    else {
        message = 'Something went very wrong!';
    }
    return message;
};
exports.getErrorMessage = getErrorMessage;
const handleError = (error, item) => {
    if (!error)
        return '';
    if (typeof error === 'string')
        return error;
};
exports.handleError = handleError;
const generateString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let result = ' ';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.generateString = generateString;
//# sourceMappingURL=helpers.js.map