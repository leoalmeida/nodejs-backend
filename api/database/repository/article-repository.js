import internalException from '../../errors/internal-exception.js';
import resource from '../model/article-model.js';

export default class ArticleRepository {
  async createArticle({ title, content, author, createdAt }) {
    try {
      const article = await resource.model.create({ title, content, author, createdAt });

      return article;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async findByFilter(
    filter,
    sort = {},
    select = [],
    populate = []
  ) {
    try {
      const options = {
        populate,
        select,
        sort,
      };

      const articles = await resource.model.find(
        {
          ...filter,
        },
        options
      );
      return articles;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async findAll(select = [], populate = []) {
    try {
      const article = await resource.model.find({})
        .select(select)
        .populate(populate);
      return article;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async findById(id, select = [], populate = []) {
    try {
      const article = await resource.model.findOne({
        _id: id,
      })
        .select(select)
        .populate(populate);
      return article;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async deleteById(id) {
    try {
      const article = await resource.model.findOneAndDelete(
        { _id: id }
      );
      return article;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async updateOneByFilter(
    filter,
    update_data = {},
    increament_data = {},
    append_data = {},
    pull_data = {}
  ) {
    try {
      const article = await resource.model.findOneAndUpdate(
        { ...filter },
        {
          $set: update_data,
          $inc: increament_data,
          $push: append_data,
          $pull: pull_data,
        },
        { new: true }
      );
      return article;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async updateManyByFilter(
    filter,
    update_data = {},
    increament_data = {},
    append_data = {}
  ) {
    try {
      const article = await resource.model.updateMany(
        { ...filter },
        { $set: update_data, $inc: increament_data, $push: append_data }
      );
      return article;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }

  async countDocument(filter) {
    try {
      const article_count = await resource.model.countDocuments(filter);

      return article_count;
    } catch (error) {
      throw new internalException(error.message, error);
    }
  }
}