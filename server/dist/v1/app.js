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
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const LinkRoute_1 = __importDefault(require("./routes/LinkRoute"));
const NotificationRoute_1 = __importDefault(require("./routes/NotificationRoute"));
const AuthRoute_1 = __importDefault(require("./routes/AuthRoute"));
const appError_1 = __importDefault(require("./utils/appError"));
const ErrorController_1 = require("./controllers/ErrorController");
const crypto_1 = __importDefault(require("crypto"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const NotificationController_1 = require("./controllers/NotificationController");
const nonce = crypto_1.default.randomBytes(16).toString('hex');
const app = (0, express_1.default)();
exports.server = (0, http_1.createServer)(app);
app.enable('trust proxy');
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: '*', credentials: true, methods: ['GET', 'POST', 'PATCH', 'DELETE'] }));
app.options('*', (0, cors_1.default)());
// const io = new Server(server, { cors: { origin: 'http://192.168.20.189:5173' } }); // BANDULA
const io = new socket_io_1.Server(exports.server, { cors: { origin: 'http://192.168.0.33:5173' } });
io.on('connection', socket => {
    socket.on('send_message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, NotificationController_1.handleSocketNotification)(data);
        socket.broadcast.emit('notification_created', res);
    }));
    io.on('connect_error', err => {
        console.log(`connect_error due to ${err.message}`);
    });
});
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.set('view engine', 'pug');
app.set('views', path_1.default.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'strict-dynamic'", `'nonce-${nonce}'`, 'http:', 'https:'],
            objectSrc: ["'none'"],
            baseUri: ["'none'"],
            requireTrustedTypesFor: ["'script'"],
        },
    },
}));
if (validateEnv_1.default.NODE_ENV === 'development')
    app.use((0, morgan_1.default)('dev'));
app.use(`/api/${validateEnv_1.default.VERSION}/auth`, AuthRoute_1.default);
app.use(`/api/${validateEnv_1.default.VERSION}/user`, UserRoute_1.default);
app.use(`/api/${validateEnv_1.default.VERSION}/link`, LinkRoute_1.default);
app.use(`/api/${validateEnv_1.default.VERSION}/notification`, NotificationRoute_1.default);
app.all('*', (req, _res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(ErrorController_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map