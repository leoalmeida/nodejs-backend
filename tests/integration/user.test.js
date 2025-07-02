import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import { model as UserModel } from '../../api/database/model/user-model.js';

const request = supertest(app);

describe('User API Endpoints', () => {
  beforeAll(async () => {
    await new Promise(resolve => mongoose.connection.once('open', resolve));
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const validUserData = {
    name: 'Test User',
    email: 'test@example.com',
    createdBy: 'integration-test', // Required by model
  };

  describe('POST /api/v1/users/', () => {
    it('should create a new user and return 201', async () => {
      const res = await request
        .post('/api/v1/users/')
        .send(validUserData);

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.message).toBe('Success');

      const user = await UserModel.findById(res.body.data.id);
      expect(user).not.toBeNull();
      expect(user.name).toBe(validUserData.name);
    });

    it('should return 422 for a request with missing required fields', async () => {
      const res = await request
        .post('/api/v1/users/')
        .send({ email: 'bad@request.com' }); // Missing 'name' and 'createdBy'

      expect(res.statusCode).toBe(422);
      expect(res.body).toEqual({
        status: 422,
        message: expect.stringContaining('User validation failed: name: Path `name` is required.'),
      });
    });
  });

  describe('GET /api/v1/users/', () => {
    it('should return all users and status 200', async () => {
      await UserModel.create(validUserData);
      const res = await request.get('/api/v1/users/');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe(validUserData.name);
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return a single user and status 200', async () => {
      const user = await UserModel.create(validUserData);
      const userId = user._id.toString();

      const res = await request.get(`/api/v1/users/${userId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data._id).toBe(userId);
      expect(res.body.data.name).toBe(validUserData.name);
    });

    it('should return 404 if a user is not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toHexString();
      const res = await request.get(`/api/v1/users/${nonExistentId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        status: 404,
        message: 'User not found.',
      });
    });
  });

  describe('PUT /api/v1/users/:id', () => {
    it('should update a user and return 200', async () => {
      const user = await UserModel.create(validUserData);
      const userId = user._id.toString();

      const res = await request
        .put(`/api/v1/users/${userId}`)
        .send({ name: 'Updated User Name' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(userId);

      const updatedUser = await UserModel.findById(userId);
      expect(updatedUser.name).toBe('Updated User Name');
    });

    it('should return 404 if the user to update is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toHexString();
        const res = await request.put(`/api/v1/users/${nonExistentId}`).send({ name: 'Wont work' });
  
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          status: 404,
          message: 'User not found.',
        });
      });
  });

  describe('DELETE /api/v1/users/:id', () => {
    it('should delete a user and return 200', async () => {
      const user = await UserModel.create(validUserData);
      const userId = user._id.toString();

      const res = await request.delete(`/api/v1/users/${userId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(userId);

      const deletedUser = await UserModel.findById(userId);
      expect(deletedUser).toBeNull();
    });

    it('should return 404 if the user to delete is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toHexString();
        const res = await request.delete(`/api/v1/users/${nonExistentId}`);
  
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          status: 404,
          message: 'User not found.',
        });
      });
  });
});