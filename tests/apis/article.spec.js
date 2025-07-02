import request from 'supertest';
import { app } from '../../index';
import { setup } from '../setup';
setup();

describe('Article API', () => {
    
  it('Should successfully create an article and return its id', async () => {
    const response = await request(app)
      .post('/api/v1/articles')
      .send({
          "title": "Hello World",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "author": "John",
      });
  
    expect(response.body.data.id).toBe(article_id);
    expect(response.body.status).toBe(201);
    expect(response.body.message).toBe("Success");
  });

  it('should return the all articles', async () => {
    await request(app)
      .post('/api/v1/articles')
      .send({
          "title": "Hello World",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "author": "John",
      });

    await request(app)
      .post('/api/v1/articles')
      .send({
          "title": "projai795460",
          "content": "Lorem ipsum dolor sit amet",
          "author": "Medvedev",
      });

    const response = await request(app)
      .get('/api/v1/articles')
      .send();

    expect(response.body.data).toHaveLength(2);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe("Success");
  });

  it('should return one article', async () => {
    const articleResponse = await request(app)
      .post('/api/v1/articles')
      .send({
          "title": "Hello World",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "author": "John",
      });

    const article_id = articleResponse.body.data.id;

    const response = await request(app)
      .get(`/api/v1/articles/${article_id}`)
      .send();

    expect(response.body.data.id).toBe(article_id);
    expect(response.body.data.status).toBe(200);
    expect(response.body.data.message).toBe("Success");
  });

  it('Should successfully change an article and return its id', async () => {
    const articleResponse = await request(app)
      .post('/api/v1/articles')
      .send({
          "title": "Hello World",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "author": "John",
      });

    const article_id = articleResponse.body.data.id;

    const response = await request(app)
      .put(`/api/v1/articles/${article_id}`)
      .send({
          "title": "Changed world",
          "author": "Marlon",
        });
      
    expect(response.body.data.id).toBe(article_id);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe("Success");
  });
  
  it('Should successfully remove an article and return its id', async () => {
    const articleResponse = await request(app)
      .post('/api/v1/articles')
      .send({
          "title": "Hello World",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          "author": "John",
      });

    const article_id = articleResponse.body.data.id;

    const response = await request(app)
      .delete(`/api/v1/articles/${article_id}`)
      .send();
      
    expect(response.body.data.id).toBe(article_id);
    expect(response.body.status).toBe(200);
    expect(response.body.message).toBe("Success");
  });

}); 