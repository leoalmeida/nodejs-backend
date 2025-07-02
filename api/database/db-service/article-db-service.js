import badRequestException from '../../errors/bad-request-exception.js';
import ArticleRepository from '../repository/article-repository.js';
import RedisRepository from '../redis-repository.js';

class ArticleDBService {
  constructor() {
    this.db_repository = new ArticleRepository();
    this.redis_repository = new RedisRepository();
    this.service = 'article';
  }

  async createArticle({ title, content, author }) {
    try {
      const article = await this.db_repository.createArticle({
        title, content, author 
      });

      this.redis_repository.delKey(this.service);

      return article;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async getArticle(sort = {}, select = []) {
    try {
      const hash_key = `all-${JSON.stringify()}-${JSON.stringify(select)}`;

      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const articles = await this.db_repository.findByFilter(
        {},
        sort,
        select
      );

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(articles)
      );

      return articles;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async getAllArticles(select = [], populate = []) {
    try {
      
      const hash_key = `all-${JSON.stringify(select)}-${JSON.stringify(populate)}`;
      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const article = await this.db_repository.findAll(
        select,
        populate
      );

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(article)
      );

      return article;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async getArticleById(id, select = [], populate = []) {
    try {
      const hash_key = `id-${id}-${JSON.stringify(select)}-${JSON.stringify(populate)}`;
      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const article = await this.db_repository.findById(
        id,
        select,
        populate
      );

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(article)
      );

      return article;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async deleteArticleById(id) {
    try {
      const article = await this.db_repository.deleteById(id);
        this.redis_repository.delKey(this.service);
        return article;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async getArticleByFilter(filter, sort = {}, select = []) {
    try {
      const hash_key = `${JSON.stringify(
        filter
      )}-${JSON.stringify(sort)}-${JSON.stringify(select)}`;

      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const article = await this.db_repository.findByFilter(
        filter,
        sort,
        select
      );

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(article)
      );

      return article;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }


  async updateOneArticleByFilter(
    filter = {},
    update_data = {},
    increament_data = {},
    append_data = {},
    pull_data = {}
  ) {
    try {
      const course = await this.db_repository.updateOneByFilter(
        filter,
        update_data,
        increament_data,
        append_data,
        pull_data
      );

      this.redis_repository.delKey(this.service);

      return course;
    } catch (error) {
      console.log(error);
      throw new badRequestException(error.message, error.status);
    }
  }

  async updateManyArticlesByFilter(
    filter,
    update_data,
    increament_data,
    append_data
  ) {
    try {
      const update = await this.db_repository.updateManyByFilter(
        filter,
        update_data,
        increament_data,
        append_data
      );

      this.redis_repository.delKey(this.service);

      return update;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }

  async countArticle(filter = {}) {
    try {
      const hash_key = `count-${JSON.stringify(filter)}`;

      const cached_response = await this.redis_repository.getHashField(
        this.service,
        hash_key
      );

      if (cached_response) {
        return JSON.parse(cached_response);
      }

      const courses_count = await this.db_repository.countDocument(filter);

      this.redis_repository.setHashField(
        this.service,
        hash_key,
        JSON.stringify(courses_count)
      );

      return courses_count;
    } catch (error) {
      throw new badRequestException(error.message, error.status);
    }
  }
}

export default ArticleDBService;