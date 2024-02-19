"use strict";
// import request from 'supertest';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import { MongoClient } from 'mongodb';
// import crypto from 'crypto';
// const url = 'http://192.168.0.33:8000/api/v1';
// let con: MongoClient;
// let mongoServer: MongoMemoryServer;
// jest.mock('../../utils/email', () => ({
//    __esModule: true,
//    default: jest.fn().mockImplementation(() => ({
//       sendPasswordReset: jest.fn(),
//    })),
// }));
// beforeAll(async () => {
//    mongoServer = await MongoMemoryServer.create();
//    con = await MongoClient.connect(mongoServer.getUri(), {});
// });
// afterAll(async () => {
//    if (con) {
//       await con.close();
//    }
//    if (mongoServer) {
//       await mongoServer.stop();
//    }
// });
// describe('AuthController', () => {
//    // describe('signup', () => {
//    // it('should create a new user with valid data', async () => {
//    //    const db = con.db(mongoServer.instanceInfo!.dbName);
//    //    const userData = {
//    //       email: 'test@test.com',
//    //       password: 'test1234',
//    //       passwordConfirm: 'test1234',
//    //       name: 'Borsodi Adam',
//    //    };
//    //    const response = await request(url).post('/auth/signup').send(userData);
//    //    expect(response.status).toBe(201);
//    //    expect(response.body.status).toBe('success');
//    // });
//    // it('should return 400 if no valid email or password is provided', async () => {
//    //    const userData = {
//    //       email: 'test@test.com',
//    //       name: 'Borsodi Adam',
//    //    };
//    //    const response = await request(url).post('/auth/signup').send(userData);
//    //    expect(response.status).toBe(400);
//    //    expect(response.body.status).toBe('error');
//    // });
//    //    it('should return 400 if passwords do not match', async () => {
//    //       const userData = {
//    //          email: 'test@test.com',
//    //          password: 'test1234',
//    //          passwordConfirm: 'test12345',
//    //          name: 'Borsodi Adam',
//    //       };
//    //       const response = await request(url).post('/auth/signup').send(userData);
//    //       expect(response.status).toBe(400);
//    //       expect(response.body.status).toBe('error');
//    //    });
//    // });
//    describe('getReferralCode', () => {
//       it('should return user ID for a valid referral code', async () => {
//          const referralCode = 1;
//          const response = await request(url).get(`/auth/get-referralCode/${referralCode}`);
//          expect(response.status).toBe(201);
//          expect(response.body.status).toBe('success');
//       });
//    });
//    describe('signin', () => {
//       it('should authenticate a user with valid credentials', async () => {
//          const userData = {
//             email: 'borsodi.dm@gmail.com',
//             password: 'test1234',
//          };
//          const response = await request(url).post('/auth/signin').send(userData);
//          expect(response.status).toBe(200);
//          expect(response.body.status).toBe('success');
//       });
//       it('should return 404 if no user found', async () => {
//          const userData = {
//             email: 'borsodi.dm1@gmail.com',
//             password: 'test1234',
//          };
//          const response = await request(url).post('/auth/signin').send(userData);
//          expect(response.status).toBe(404);
//          expect(response.body.status).toBe('error');
//       });
//       it('should return 401 if incorrect password', async () => {
//          const userData = {
//             email: 'borsodi.dm@gmail.com',
//             password: 'test12345',
//          };
//          const response = await request(url).post('/auth/signin').send(userData);
//          expect(response.status).toBe(401);
//          expect(response.body.status).toBe('error');
//       });
//       it('should return 401 if not able to signin with inactive user', async () => {
//          const inactiveUserData = {
//             email: 'test@test.com',
//             password: 'test1234',
//          };
//          const response = await request(url).post('/auth/signin').send(inactiveUserData);
//          expect(response.status).toBe(401);
//          expect(response.body.status).toBe('error');
//       });
//       it('should return authentication token for signin with active user', async () => {
//          const activeUserData = {
//             email: 'borsodi.dm@gmail.com',
//             password: 'test1234',
//             active: true,
//          };
//          const response = await request(url).post('/auth/signin').send(activeUserData);
//          expect(response.status).toBe(200);
//          expect(response.body.token).toBeDefined();
//       });
//       // Add more tests for different scenarios (e.g., incorrect password, inactive user)
//    });
//    describe('forgotPassword', () => {
//       it('should send a password reset token to the user email', async () => {
//          const response = await request(url).post('/auth/forgot-password').send({ email: 'test@test.com' });
//          expect(response.status).toBe(200);
//          expect(response.body.status).toBe('success');
//          expect(response.body.message).toBe('Token sent to email!');
//       });
//       it('should return 404 if no user found with the provided email', async () => {
//          const response = await request(url).post('/auth/forgot-password').send({ email: 'nonexistent@test.com' });
//          expect(response.status).toBe(404);
//          expect(response.body.status).toBe('error');
//          expect(response.body.message).toBe('No user found with this email.');
//       });
//    });
//    // Add tests for other functions (e.g., handleRefreshToken, signout, forgotPassword, resetPassword)
// });
//# sourceMappingURL=AuthController.test.js.map