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
const supertest_1 = __importDefault(require("supertest"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongodb_1 = require("mongodb");
describe('UserController', () => {
    let token; // This will store the authentication token for the user
    const url = 'http://192.168.0.33:8000/api/v1';
    let con;
    let mongoServer;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        con = yield mongodb_1.MongoClient.connect(mongoServer.getUri(), {});
        const response = yield (0, supertest_1.default)(url)
            .post('/auth/signin')
            .send({ email: 'borsodi.dm@gmail.com', password: 'test1234' });
        token = response.body.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        if (con) {
            yield con.close();
        }
        if (mongoServer) {
            yield mongoServer.stop();
        }
    }));
    describe('getCurrentUser', () => {
        it('should return the current user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(url).get('/user/current-user').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
        }));
        // Add more tests for different scenarios
    });
    describe('markNotifications', () => {
        it('should mark all notifications as read for the current user', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(url).patch('/user/mark-notifications').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            // Add more assertions as needed
        }));
        // Add more tests for different scenarios
    });
    describe('update user password', () => {
        it('should update password with correct current password and valid new password', () => __awaiter(void 0, void 0, void 0, function* () {
            const newPasswordData = {
                passwordCurrent: 'test1234',
                password: 'newPassword123',
                passwordConfirm: 'newPassword123',
            };
            const response = yield (0, supertest_1.default)(url)
                .patch('/user/update-password')
                .set('Authorization', `Bearer ${token}`)
                .send(newPasswordData);
            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            // Add more assertions as needed
        }));
        it('should return 401 if incorrect current password is provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const incorrectPasswordData = {
                passwordCurrent: 'incorrectPassword',
                password: 'newPassword123',
                passwordConfirm: 'newPassword123',
            };
            const response = yield (0, supertest_1.default)(url)
                .patch('/user/update-password')
                .set('Authorization', `Bearer ${token}`)
                .send(incorrectPasswordData);
            expect(response.status).toBe(401);
            expect(response.body.status).toBe('error');
            // Add more assertions as needed
        }));
        it('should return 400 if request body is incomplete', () => __awaiter(void 0, void 0, void 0, function* () {
            const incompleteData = {
                password: 'newPassword123',
                // Missing passwordCurrent and passwordConfirm fields
            };
            const response = yield (0, supertest_1.default)(url)
                .patch('/user/update-password')
                .set('Authorization', `Bearer ${token}`)
                .send(incompleteData);
            expect(response.status).toBe(400);
            expect(response.body.status).toBe('error');
            // Add more assertions as needed
        }));
    });
    // Add tests for other functions (deleteUsersLink, markNotifications, markNotification, updateMe, getUserImage, updatePassword, deleteAllNotifications)
});
//# sourceMappingURL=UserController.test.js.map