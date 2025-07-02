import ArticleDBService from '../../../api/database/db-service/article-db-service.js';
import ArticleRepository from '../../../api/database/repository/article-repository.js';
import RedisRepository from '../../../api/database/redis-repository.js';
import badRequestException from '../../../api/errors/bad-request-exception.js';

// Mock the modules
jest.mock('../repository/article-repository.js');
jest.mock('../redis-repository.js');
jest.mock('../../errors/bad-request-exception.js');

describe('ArticleDBService', () => {
  let dbService;
  let mockArticleRepo;
  let mockRedisRepo;

  beforeEach(() => {
    // Clear mocks before each test
    ArticleRepository.mockClear();
    RedisRepository.mockClear();
    badRequestException.mockClear();

    dbService = new ArticleDBService();
    // Get the mock instances to control their behavior
    mockArticleRepo = ArticleRepository.mock.instances[0];
    mockRedisRepo = RedisRepository.mock.instances[0];
  });

  describe('createArticle', () => {
    it('should call the repository to create an article and delete the cache key on success', async () => {
      const articleData = { title: 'New Article', content: 'Content', author: 'Author' };
      const createdArticle = { ...articleData, _id: '1' };
      mockArticleRepo.createArticle.mockResolvedValue(createdArticle);

      const result = await dbService.createArticle(articleData);

      expect(mockArticleRepo.createArticle).toHaveBeenCalledWith(articleData);
      expect(mockRedisRepo.delKey).toHaveBeenCalledWith('article');
      expect(result).toEqual(createdArticle);
    });

    it('should throw a badRequestException if the repository fails', async () => {
      const errorMessage = 'Database creation failed';
      mockArticleRepo.createArticle.mockRejectedValue(new Error(errorMessage));

      await expect(dbService.createArticle({})).rejects.toThrow(badRequestException);
      expect(badRequestException).toHaveBeenCalledWith(errorMessage, undefined);
    });
  });

  describe('getArticle', () => {
    it('should return cached articles if they exist in Redis', async () => {
      const cachedArticles = JSON.stringify([{ title: 'Cached Article' }]);
      mockRedisRepo.getHashField.mockResolvedValue(cachedArticles);

      const result = await dbService.getArticle();

      expect(mockRedisRepo.getHashField).toHaveBeenCalledWith('article', expect.any(String));
      expect(mockArticleRepo.findByFilter).not.toHaveBeenCalled();
      expect(result).toEqual(JSON.parse(cachedArticles));
    });

    it('should fetch from the DB, cache the result, and return articles if not in Redis', async () => {
      const dbArticles = [{ title: 'DB Article' }];
      mockRedisRepo.getHashField.mockResolvedValue(null);
      mockArticleRepo.findByFilter.mockResolvedValue(dbArticles);

      const result = await dbService.getArticle();

      expect(mockRedisRepo.getHashField).toHaveBeenCalled();
      expect(mockArticleRepo.findByFilter).toHaveBeenCalledWith({}, {}, []);
      expect(mockRedisRepo.setHashField).toHaveBeenCalledWith('article', expect.any(String), JSON.stringify(dbArticles));
      expect(result).toEqual(dbArticles);
    });

    it('should throw a badRequestException if fetching from the repository fails', async () => {
        const errorMessage = 'Database fetch failed';
        mockRedisRepo.getHashField.mockResolvedValue(null);
        mockArticleRepo.findByFilter.mockRejectedValue(new Error(errorMessage));
  
        await expect(dbService.getArticle()).rejects.toThrow(badRequestException);
        expect(badRequestException).toHaveBeenCalledWith(errorMessage, undefined);
      });
  });

  describe('getArticleById', () => {
    const articleId = 'some-id';
    it('should return a cached article by ID if it exists in Redis', async () => {
        const cachedArticle = JSON.stringify({ _id: articleId, title: 'Cached Article' });
        mockRedisRepo.getHashField.mockResolvedValue(cachedArticle);
  
        const result = await dbService.getArticleById(articleId);
  
        expect(mockRedisRepo.getHashField).toHaveBeenCalledWith('article', expect.stringContaining(`id-${articleId}`));
        expect(mockArticleRepo.findById).not.toHaveBeenCalled();
        expect(result).toEqual(JSON.parse(cachedArticle));
      });
  
      it('should fetch from DB, cache, and return an article by ID if not in Redis', async () => {
        const dbArticle = { _id: articleId, title: 'DB Article' };
        mockRedisRepo.getHashField.mockResolvedValue(null);
        mockArticleRepo.findById.mockResolvedValue(dbArticle);
  
        const result = await dbService.getArticleById(articleId);
  
        expect(mockRedisRepo.getHashField).toHaveBeenCalled();
        expect(mockArticleRepo.findById).toHaveBeenCalledWith(articleId, [], []);
        expect(mockRedisRepo.setHashField).toHaveBeenCalledWith('article', expect.any(String), JSON.stringify(dbArticle));
        expect(result).toEqual(dbArticle);
      });
  });

  describe('deleteArticleById', () => {
    it('should delete an article, invalidate cache, and return the deleted document', async () => {
        const articleId = 'some-id';
        const deletedArticle = { _id: articleId, title: 'Deleted Article' };
        mockArticleRepo.deleteById.mockResolvedValue(deletedArticle);

        const result = await dbService.deleteArticleById(articleId);

        expect(mockArticleRepo.deleteById).toHaveBeenCalledWith(articleId);
        expect(mockRedisRepo.delKey).toHaveBeenCalledWith('article');
        expect(result).toEqual(deletedArticle);
    });
  });
});