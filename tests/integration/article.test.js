import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js'; // Assuming your express app is exported from app.js
import resource from '../../api/database/model/article-model.js';

const request = supertest(app);

describe('Article API Endpoints', () => {
  // Before running the tests, ensure the database is connected.
  // Your app's setup should handle connecting to a TEST database when NODE_ENV=test
  beforeAll(async () => {
    // It's good practice to wait for the mongoose connection to be established
    await new Promise(resolve => mongoose.connection.once('open', resolve));
  });

  // Clean up the articles collection after each test to ensure test isolation
  afterEach(async () => {
    await resource.model.deleteMany({});
  });

  // After all tests are done, close the database connection
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('POST /api/v1/articles/', () => {
    it('should create a new article and return 201', async () => {
      const res = await request
        .post('/api/v1/articles/')
        .send({
          title: 'Integration Test Article',
          content: 'This is the content for the integration test.',
          author: 'Supertest',
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.message).toBe('Success');

      // Verify the article was actually created in the database
      const article = await resource.model.findById(res.body.data.id);
      expect(article).not.toBeNull();
      expect(article.title).toBe('Integration Test Article');
    });

    it('should return 422 for a request with missing required fields', async () => {
      const res = await request
        .post('/api/v1/articles/')
        .send({
          content: 'This content will fail.',
          author: 'Supertest',
        });

      // Mongoose validation errors typically result in a 4xx status.
      // Your badRequestException defaults to 422.
      expect(res.statusCode).toBe(422);
      expect(res.body).toEqual({
        status: 422,
        // The exact message can be brittle, so we check for the presence of the required field's error message
        message: expect.stringContaining('article title required'),
      });
    });
  });

  describe('GET /api/v1/articles/', () => {
    it('should return all articles and status 200', async () => {
      await resource.model.create({
        title: 'Test Get All',
        content: 'Content for get all.',
        author: 'Jest',
      });

      const res = await request.get('/api/v1/articles/');

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].title).toBe('Test Get All');
    });
  });

  describe('GET /api/v1/articles/:article_id', () => {
    it('should return a single article and status 200', async () => {
      const article = await resource.model.create({
        title: 'Test Get One',
        content: 'Content for get one.',
        author: 'Jest',
      });
      const articleId = article._id.toString();

      const res = await request.get(`/api/v1/articles/${articleId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(articleId);
      expect(res.body.data.title).toBe('Test Get One');
    });

    it('should return 404 if an article is not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toHexString();
      const res = await request.get(`/api/v1/articles/${nonExistentId}`);

      // This test verifies that your API correctly handles "not found" cases,
      // as documented in your swagger comments.
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        status: 404,
        message: 'Article not found.',
      });
    });
  });

  describe('PUT /api/v1/articles/:article_id', () => {
    it('should update an article and return 200', async () => {
      const article = await resource.model.create({ title: 'To Be Updated' });
      const articleId = article._id.toString();

      const res = await request
        .put(`/api/v1/articles/${articleId}`)
        .send({ title: 'Updated Title' });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(articleId);

      const updatedArticle = await resource.model.findById(articleId);
      expect(updatedArticle.title).toBe('Updated Title');
    });

    it('should return 404 if the article to update is not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toHexString();
      const res = await request.put(`/api/v1/articles/${nonExistentId}`).send({ title: 'Wont work' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        status: 404,
        message: 'Article not found.',
      });
    });
  });

  describe('DELETE /api/v1/articles/:article_id', () => {
    it('should delete an article and return 200', async () => {
      const article = await resource.model.create({ title: 'To Be Deleted' });
      const articleId = article._id.toString();

      const res = await request.delete(`/api/v1/articles/${articleId}`);

      // This verifies the fix to return the correct ID of the deleted article.
      expect(res.statusCode).toBe(200);
      expect(res.body.data.id).toBe(articleId);

      const deletedArticle = await resource.model.findById(articleId);
      expect(deletedArticle).toBeNull();
    });

    it('should return 404 if the article to delete is not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toHexString();
      const res = await request.delete(`/api/v1/articles/${nonExistentId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        status: 404,
        message: 'Article not found.',
      });
    });
  });
});