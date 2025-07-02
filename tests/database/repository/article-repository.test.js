import mockingoose from 'mockingoose';
import ArticleRepository from '../../../api/database/repository/article-repository.js';
import resource from '../../../api/database/model/article-model.js';
import internalException from '../../../api/errors/internal-exception.js';

// Mock the internalException to track calls without throwing an actual error in tests
jest.mock('../../errors/internal-exception.js');

describe('ArticleRepository', () => {
  let articleRepository;

  beforeEach(() => {
    mockingoose.resetAll();
    internalException.mockClear();
    articleRepository = new ArticleRepository();
  });

  describe('createArticle', () => {
    it('should create and return an article', async () => {
      const articleData = { title: 'Test', content: 'Content', author: 'Author', createdAt: new Date() };
      const expectedArticle = { ...articleData, _id: '60d5ec49f1d2f2001c8b4567' };

      mockingoose(resource.model).toReturn(expectedArticle, 'create');

      const result = await articleRepository.createArticle(articleData);

      // mockingoose returns a proxy, so we check properties
      expect(result.title).toBe(expectedArticle.title);
      expect(result._id.toString()).toBe(expectedArticle._id);
    });

    it('should throw an internalException on creation failure', async () => {
      const error = new Error('DB create error');
      mockingoose(resource.model).toReturn(error, 'create');

      await expect(articleRepository.createArticle({})).rejects.toThrow(internalException);
      expect(internalException).toHaveBeenCalledWith(error.message, error);
    });
  });

  describe('findByFilter', () => {
    it('should find and return articles based on a filter', async () => {
      const articles = [{ title: 'Article 1' }, { title: 'Article 2' }];
      mockingoose(resource.model).toReturn(articles, 'find');

      const result = await articleRepository.findByFilter({ author: 'Test Author' });

      expect(result).toHaveLength(2);
      expect(result[0].title).toBe('Article 1');
    });

    it('should throw an internalException on find failure', async () => {
      const error = new Error('DB find error');
      mockingoose(resource.model).toReturn(error, 'find');

      await expect(articleRepository.findByFilter({})).rejects.toThrow(internalException);
      expect(internalException).toHaveBeenCalledWith(error.message, error);
    });
  });

  describe('findById', () => {
    it('should find and return an article by its ID', async () => {
      const articleId = '60d5ec49f1d2f2001c8b4567';
      const article = { _id: articleId, title: 'Found Article' };
      mockingoose(resource.model).toReturn(article, 'findOne');

      const result = await articleRepository.findById(articleId);

      expect(result._id.toString()).toBe(articleId);
      expect(result.title).toBe('Found Article');
    });

    it('should return null if article is not found', async () => {
      const articleId = 'non-existent-id';
      mockingoose(resource.model).toReturn(null, 'findOne');

      const result = await articleRepository.findById(articleId);

      expect(result).toBeNull();
    });
  });

  describe('deleteById', () => {
    it('should delete an article by its ID and return it', async () => {
      const articleId = '60d5ec49f1d2f2001c8b4567';
      const article = { _id: articleId, title: 'Deleted Article' };
      mockingoose(resource.model).toReturn(article, 'findOneAndDelete');

      const result = await articleRepository.deleteById(articleId);

      expect(result._id.toString()).toBe(articleId);
    });
  });

  describe('updateOneByFilter', () => {
    it('should update an article and return the new version', async () => {
      const filter = { _id: '60d5ec49f1d2f2001c8b4567' };
      const updateData = { title: 'Updated Title' };
      const updatedArticle = { ...filter, ...updateData };
      mockingoose(resource.model).toReturn(updatedArticle, 'findOneAndUpdate');

      const result = await articleRepository.updateOneByFilter(filter, updateData);

      expect(result.title).toBe('Updated Title');
    });
  });
});