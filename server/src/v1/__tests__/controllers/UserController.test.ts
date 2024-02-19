import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

describe('UserController', () => {
   let token: string; // This will store the authentication token for the user

   const url = 'http://192.168.0.33:8000/api/v1';

   let con: MongoClient;
   let mongoServer: MongoMemoryServer;

   beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      con = await MongoClient.connect(mongoServer.getUri(), {});

      const response = await request(url)
         .post('/auth/signin')
         .send({ email: 'borsodi.dm@gmail.com', password: 'test1234' });

      token = response.body.token;
   });

   afterAll(async () => {
      if (con) {
         await con.close();
      }
      if (mongoServer) {
         await mongoServer.stop();
      }
   });

   describe('getCurrentUser', () => {
      it('should return the current user', async () => {
         const response = await request(url).get('/user/current-user').set('Authorization', `Bearer ${token}`);
         expect(response.status).toBe(200);
         expect(response.body.status).toBe('success');
      });
      // Add more tests for different scenarios
   });

   describe('markNotifications', () => {
      it('should mark all notifications as read for the current user', async () => {
         const response = await request(url).patch('/user/mark-notifications').set('Authorization', `Bearer ${token}`);
         expect(response.status).toBe(200);
         expect(response.body.status).toBe('success');
         // Add more assertions as needed
      });
      // Add more tests for different scenarios
   });

   describe('update user password', () => {
      it('should update password with correct current password and valid new password', async () => {
         const newPasswordData = {
            passwordCurrent: 'test1234',
            password: 'newPassword123',
            passwordConfirm: 'newPassword123',
         };
         const response = await request(url)
            .patch('/user/update-password')
            .set('Authorization', `Bearer ${token}`)
            .send(newPasswordData);
         expect(response.status).toBe(200);
         expect(response.body.status).toBe('success');
         // Add more assertions as needed
      });

      it('should return 401 if incorrect current password is provided', async () => {
         const incorrectPasswordData = {
            passwordCurrent: 'incorrectPassword',
            password: 'newPassword123',
            passwordConfirm: 'newPassword123',
         };
         const response = await request(url)
            .patch('/user/update-password')
            .set('Authorization', `Bearer ${token}`)
            .send(incorrectPasswordData);
         expect(response.status).toBe(401);
         expect(response.body.status).toBe('error');
         // Add more assertions as needed
      });
      it('should return 400 if request body is incomplete', async () => {
         const incompleteData = {
            password: 'newPassword123',
            // Missing passwordCurrent and passwordConfirm fields
         };
         const response = await request(url)
            .patch('/user/update-password')
            .set('Authorization', `Bearer ${token}`)
            .send(incompleteData);
         expect(response.status).toBe(400);
         expect(response.body.status).toBe('error');
         // Add more assertions as needed
      });
   });

   // Add tests for other functions (deleteUsersLink, markNotifications, markNotification, updateMe, getUserImage, updatePassword, deleteAllNotifications)
});
