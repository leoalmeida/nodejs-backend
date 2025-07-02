import { listArticles, getOneArticle, saveArticle, removeArticle, updateArticle} from './articleController.js';

describe('listArticles', () => {
  it('should return 200 and articles data if exists any', () => {
    const mockRequest = {};
    const mockResponse = {
      status: jest.fn().mockReturnThis(), // Mock status to chain .json()
      json: jest.fn(),
    };

    listArticles(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 200,
        message: "Success",
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            content: expect.any(String),
            author: expect.any(String),
          })
        ])
      })
    );
  });

  it('should return 404 if article does not exist', () => {
    const mockRequest = { };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    listArticles(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: 404,
      message: 'Article not found.',
      data: null
    });
  });
});

describe('getOneArticle', () => {
  it('should return 200 and user data if user exists', () => {
    const mockRequest = { params: { article_id: '123' } };
    const mockResponse = {
      status: jest.fn().mockReturnThis(), // Mock status to chain .json()
      json: jest.fn(),
    };

    getOneArticle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 200,
      message: "Success",
      data: {
        id: expect.any(String),
        title: expect.any(String),
        content: expect.any(String),
        author: expect.any(String)
      }
    });
  });

  it('should return 404 if user does not exist', () => {
    const mockRequest = { params: { id: '456' } };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    getOneArticle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: 404,
      message: 'Article not found.',
      data: null
    });
  });
});

describe('saveArticle', () => {
  it('should return 201 and created article data id', () => {
    const mockRequest = {
      body: {
        title: 'New Article',
        content: 'This is a new article.',
        author: 'Author Name'
      }
    }
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    saveArticle(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 201,
      message: "Success",
      data: {
        id: expect.any(String) // Assuming the ID is generated and is a string
      }
    });
  });

  it('should return 400 if unable to save article', () => {
    const mockRequest = {
      body: {
        title: '',
        content: 'This is a new article.',
        author: 'Author Name'
      }}
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    saveArticle(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 400,
      message: 'Unable to save article to database!',
      data: null,
    });
  });
});

describe('removeArticle', () => {
  it('should return 200 and deleted article id', () => {
    const mockRequest = { params: { id: '123' } };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    removeArticle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 200,
      message: "Success",
      data: {
        id: '123'
      }
    });
  });

  it('should return 404 if article does not exist', () => {
    const mockRequest = { params: { id: '456' } };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    removeArticle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: 404,
      message: 'Article not found.',
      data: null
    });
  });
});

describe('updateArticle', () => {
  it('should return 200 and the id of updated article', () => {
    const mockRequest = {
      params: { id: '123' },
      body: {
        title: 'Updated Article',
        content: 'This is an updated article.',
        author: 'Updated Author'
      }
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    updateArticle(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 200,
      message: "Success",
      data: {
        id: '123'
      }
    });
  });
  it('should return 404 if article does not exist', () => {
    const mockRequest = { params: { id: '456' } };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    updateArticle(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.send).toHaveBeenCalledWith({
      status: 404,
      message: 'Article not found.',
      data: null
    });
  });
});