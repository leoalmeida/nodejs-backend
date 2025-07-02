import ArticleService from '../../../api/services/article-service.js';
import ArticleDBService from '../../../api/database/db-service/article-db-service.js';
import badRequestException from '../../../api/errors/bad-request-exception.js';

// Mock the dependencies
jest.mock('../database/db-service/article-db-service.js');
jest.mock('../errors/bad-request-exception.js');

describe('ArticleService', () => {
  let articleService;
  let mockDbService;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods before each test
    ArticleDBService.mockClear();
    badRequestException.mockClear();

    articleService = new ArticleService();
    // Get the mock instance of the DB service to control its behavior
    mockDbService = ArticleDBService.mock.instances[0];
  });

  describe('createArticle', () => {
    it('should create an article and return it on success', async () => {
      const articleData = { title: 'Test Title', content: 'Test Content', author: 'Test Author' };
      const expectedArticle = { ...articleData, _id: '1', createdAt: expect.any(Date) };
      
      mockDbService.createArticle.mockResolvedValue(expectedArticle);

      const result = await articleService.createArticle(articleData.title, articleData.content, articleData.author);

      expect(mockDbService.createArticle).toHaveBeenCalledWith({
        ...articleData,
        createdAt: expect.any(Date),
      });
      expect(result).toEqual(expectedArticle);
    });

    it('should throw a badRequestException if the database service fails', async () => {
      const errorMessage = 'Database error';
      mockDbService.createArticle.mockRejectedValue(new Error(errorMessage));

      await expect(articleService.createArticle('t', 'c', 'a')).rejects.toThrow(badRequestException);
      expect(badRequestException).toHaveBeenCalledWith(errorMessage, undefined);
    });
  });

  describe('getAll', () => {
    it('should return all articles from the database service', async () => {
      const articles = [{ title: 'Article 1' }, { title: 'Article 2' }];
      mockDbService.getArticle.mockResolvedValue(articles);

      const result = await articleService.getAll();

      expect(mockDbService.getArticle).toHaveBeenCalled();
      expect(result).toEqual(articles);
    });

    it('should throw a badRequestException if the database service fails', async () => {
        const errorMessage = 'Database error';
        mockDbService.getArticle.mockRejectedValue(new Error(errorMessage));
  
        await expect(articleService.getAll()).rejects.toThrow(badRequestException);
        expect(badRequestException).toHaveBeenCalledWith(errorMessage, undefined);
    });
  });

  describe('getOneById', () => {
    it('should return a single article by id', async () => {
      const article = { _id: '1', title: 'Test Article' };
      mockDbService.getArticleById.mockResolvedValue(article);

      const result = await articleService.getOneById('1');

      expect(mockDbService.getArticleById).toHaveBeenCalledWith('1');
      expect(result).toEqual(article);
    });

    it('should throw a badRequestException if the database service fails', async () => {
        const errorMessage = 'Database error';
        mockDbService.getArticleById.mockRejectedValue(new Error(errorMessage));
  
        await expect(articleService.getOneById('1')).rejects.toThrow(badRequestException);
        expect(badRequestException).toHaveBeenCalledWith(errorMessage, undefined);
    });
  });

  describe('updateArticle', () => {
    it('should update an article and return the updated document', async () => {
      const articleId = '1';
      const updateData = { title: 'Updated Title', content: 'Updated Content' };
      const expectedUpdatedArticle = { ...updateData, _id: articleId, lastModifiedAt: expect.any(Date) };

      mockDbService.updateOneArticleByFilter.mockResolvedValue(expectedUpdatedArticle);

      const result = await articleService.updateArticle(articleId, updateData.title, updateData.content);

      expect(mockDbService.updateOneArticleByFilter).toHaveBeenCalledWith({ _id: articleId }, expect.any(Object));
      expect(result).toEqual(expectedUpdatedArticle);
    });
  });

  describe('deleteArticleById', () => {
    it('should delete an article and return the deleted document', async () => {
      const articleId = '1';
      const deletedArticle = { _id: articleId, title: 'Deleted Article' };
      mockDbService.deleteById.mockResolvedValue(deletedArticle);

      const result = await articleService.deleteArticleById(articleId);

      expect(mockDbService.deleteById).toHaveBeenCalledWith(articleId);
      expect(result).toEqual(deletedArticle);
    });
  });
});