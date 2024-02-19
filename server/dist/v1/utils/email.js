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
const nodemailer_1 = __importDefault(require("nodemailer"));
const html_to_text_1 = require("html-to-text");
const validateEnv_1 = __importDefault(require("./validateEnv"));
const pug_1 = __importDefault(require("pug"));
class Email {
    constructor(user, url) {
        this.to = validateEnv_1.default.EMAIL_FROM;
        this.fullName = user.name;
        this.url = url;
        this.user = user;
        this.from = `Adam Borsodi <${validateEnv_1.default.EMAIL_FROM}`;
    }
    newTransport() {
        return nodemailer_1.default.createTransport({
            host: validateEnv_1.default.EMAIL_HOST,
            port: validateEnv_1.default.EMAIL_PORT,
            auth: {
                user: validateEnv_1.default.EMAIL_USERNAME,
                pass: validateEnv_1.default.EMAIL_PASSWORD,
            },
        });
    }
    send(subject, template) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = pug_1.default.renderFile(`${__dirname}/../views/email/${template}.pug`, {
                fullName: this.fullName,
                user: this.user,
                url: this.url,
                subject,
            });
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                html,
                text: (0, html_to_text_1.htmlToText)(html),
            };
            yield this.newTransport().sendMail(mailOptions);
        });
    }
    sendWelcome() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('Welcome', 'welcome');
        });
    }
    sendPasswordReset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.send('Your password reset token (valid for only 10 minutes)', 'passwordReset');
        });
    }
}
exports.default = Email;
//# sourceMappingURL=email.js.map