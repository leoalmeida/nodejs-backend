import ArticleDBService from '../database/db-service/article-db-service.js';
import badRequestException from"../errors/bad-request-exception.js";
import NotFoundException from '../errors/not-found-exception.js';

export default class ArticleService {
  constructor() {
    this.db_service = new ArticleDBService();
  }

  async createArticle(title, content, author) {
    try {
      const createdAt = new Date();
      const article = await this.db_service.createArticle({ title, content, author, createdAt});
      return article;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async getAll() {
    try {
      const articles = await this.db_service.getAllArticles();
      return articles;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async getOneById(id) {
    try {
      const article = await this.db_service.getArticleById(id);
      if (!article) {
        throw new NotFoundException('Article not found.');
      }
      return article;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new badRequestException(error.message, error.status);
    }
  }

  async updateArticle(id, title, content, author) {
    try {
      const lastModifiedAt = new Date();
      const updatedArticle = await this.db_service.updateOneArticleByFilter(
        { _id: id },
        { title, content, author, lastModifiedAt }
      );
      if (!updatedArticle) {
        throw new NotFoundException('Article not found.');
      }
      return updatedArticle;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new badRequestException(error.message, error.status);
    }
  }
  async deleteArticleById(id) {
    try {
      const deletedArticle = await this.db_service.deleteById(id);
      if (!deletedArticle) {
        throw new NotFoundException('Article not found.');
      }
      return deletedArticle;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new badRequestException(error.message, error.status);
    }
  }
}
