"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const app_1 = require("./app");
process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
const DB = validateEnv_1.default.MONGO_DB.replace('<PASSWORD>', validateEnv_1.default.MONGO_PWD);
mongoose_1.default.connect(DB).then(() => console.log('DB connection successful!'));
const port = validateEnv_1.default.PORT || 3000;
// const server = app.listen(port, () => {
//    console.log(`App running on port ${port}...`);
// });
const server = app_1.server.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
//# sourceMappingURL=server.js.map