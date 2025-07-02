import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';
import { model as ResourceModel } from '../../api/database/model/resource-model.js';

const request = supertest(app);

describe('Resource API Endpoints', () => {
  beforeAll(async () => {
    await new Promise(resolve => mongoose.connection.once('open', resolve));
  });

  afterEach(async () => {
    await ResourceModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const validResourceData = {
    name: 'Test Resource',
    type: 'Test Type',
    status: 'active',
    createdBy: 'integration-test', // Required by model
  };

  describe('POST /api/v1/resources/', () => {
    it('should create a new resource and return 201', async () => {
      const res = await request
        .post('/api/v1/resources/')
        .send(validResourceData);

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.message).toBe('Success');

      const resource = await ResourceModel.findById(res.body.data.id);
      expect(resource).not.toBeNull();
      expect(resource.name).toBe(validResourceData.name);
    });

    it('should return 422 for a request with missing required fields', async () => {
      const res = await request
        .post('/api/v1/resources/')
        .send({ type: 'bad' }); // Missing 'name', 'status', 'createdBy'

      expect(res.statusCode).toBe(422);
      expect(res.body).toEqual({
        status: 422,
        message: expect.stringContaining('Resource validation failed: name: Path `name` is required.'),
      });
    });
  });

  describe('GET /api/v1/resources/', () => {
    it('should return all resources and status 200', async () => {
      await ResourceModel.create(validResourceData);
      const res = await request.get('/api/v1/resources/');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe(validResourceData.name);
    });
  });

  describe('GET /api/v1/resources/:id', () => {
    it('should return a single resource and status 200', async () => {
      const resource = await ResourceModel.create(validResourceData);
      const resourceId = resource._id.toString();

      const res = await request.get(`/api/v1/resources/${resourceId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data._id).toBe(resourceId);
      expect(res.body.data.name).toBe(validResourceData.name);
    });

    it('should return 404 if a resource is not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toHexString();
      const res = await request.get(`/api/v1/resources/${nonExistentId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        status: 404,
        message: 'Resource not found.',
      });
    });
  });

  describe('PUT /api/v1/resources/:id', () => {
    it('should update a resource and return 200', async () => {
      const resource = await ResourceModel.create(validResourceData);
      const resourceId = resource._id.toString();

      const res = await request
        .put(`/api/v1/resources/${resourceId}`)
        .send({ name: 'Updated Resource Name' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(resourceId);

      const updatedResource = await ResourceModel.findById(resourceId);
      expect(updatedResource.name).toBe('Updated Resource Name');
    });

    it('should return 404 if the resource to update is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toHexString();
        const res = await request.put(`/api/v1/resources/${nonExistentId}`).send({ name: 'Wont work' });
  
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          status: 404,
          message: 'Resource not found.',
        });
      });
  });

  describe('DELETE /api/v1/resources/:id', () => {
    it('should delete a resource and return 200', async () => {
      const resource = await ResourceModel.create(validResourceData);
      const resourceId = resource._id.toString();

      const res = await request.delete(`/api/v1/resources/${resourceId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(resourceId);

      const deletedResource = await ResourceModel.findById(resourceId);
      expect(deletedResource).toBeNull();
    });

    it('should return 404 if the resource to delete is not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId().toHexString();
        const res = await request.delete(`/api/v1/resources/${nonExistentId}`);
  
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({
          status: 404,
          message: 'Resource not found.',
        });
      });
  });
});