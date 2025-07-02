// Controlador para lidar com operações relacionadas aos artigos
import ArticleService from '../services/article-service.js';
import catchAsync from '../middleware/catch-async.js';
import formatResponse from '../utils/response-formatter.js';

const service = new ArticleService();

export const createArticle = catchAsync(async (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.description = 'Endpoint to create a new article.'
    /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Article information.',
            required: true,
            schema: { $ref: "#/components/schemas/ArticlePayload" }
    } */
    /* #swagger.responses[201] = {
            description: 'Article successfully created.',
            schema: { $ref: "#/components/schemas/ResourceId" }
    } */
    /* #swagger.responses[400] = { 
            description: 'Bad request.',
            schema: { $ref: "#/components/schemas/ErrorResponse" }
    } */
    const { title, content, author } = req.body;
    const result = await service.createArticle(title, content, author);
    return formatResponse(res, 201, { id: result._id });
});

export const getAll = catchAsync(async (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.description = 'Endpoint to get all articles.'
    /* #swagger.responses[200] = {
            description: 'Articles successfully obtained.',
            schema: { type: 'array', items: { $ref: '#/components/schemas/Article' } }
    } */
    /* #swagger.responses[404] = { 
            description: 'Articles not found.',
            schema: { $ref: "#/components/schemas/ErrorResponse" }
    } */
    const articles = await service.getAll();
    const responseData = articles.map(article => ({
      id: article._id,
      title: article.title,
      content: article.content,
      author: article.author
    }));
    return formatResponse(res, 200, responseData);
  });

export const getOneById = catchAsync(async (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.description = 'Endpoint to get a specific article by ID.'
    /* #swagger.parameters['article_id'] = {
            in: 'path',
            description: 'Article ID.',
            required: true
    } */
    /* #swagger.responses[200] = {
            description: 'Article successfully obtained.',
            schema: { $ref: '#/components/schemas/Article' }
    } */
    /* #swagger.responses[404] = { 
            description: 'Article not found.',
            schema: { $ref: "#/components/schemas/ErrorResponse" }
    } */
    const { article_id } = req.params;
    const article = await service.getOneById(article_id);
    const responseData = {
      id: article._id,
      title: article.title,
      content: article.content,
      author: article.author
    };
    return formatResponse(res, 200, responseData);
});

export const deleteArticleById = catchAsync(async (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.description = 'Endpoint to delete an article by ID.'
    /* #swagger.parameters['article_id'] = {
            in: 'path',
            description: 'Article ID.',
            required: true
    } */
    /* #swagger.responses[200] = {
            description: 'Article successfully deleted.',
            schema: { $ref: "#/components/schemas/ResourceId" }
    } */
    /* #swagger.responses[404] = { 
            description: 'Article not found.',
            schema: { $ref: "#/components/schemas/ErrorResponse" }
    } */
    const { article_id } = req.params;
    const article = await service.deleteArticleById(article_id);
    return formatResponse(res, 200, { id: article._id });
});

export const updateArticleById = catchAsync(async (req, res) => {
    // #swagger.tags = ['Article']
    // #swagger.description = 'Endpoint to update an article by ID.'
    /* #swagger.parameters['article_id'] = { in: 'path', description: 'Article ID.', required: true } */
    /* #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Article information to update.',
            required: true,
            schema: { $ref: "#/components/schemas/ArticlePayload" }
    } */
    /* #swagger.responses[200] = { description: 'Article successfully updated.', schema: { $ref: "#/components/schemas/ResourceId" } } */
    /* #swagger.responses[400] = { 
            description: 'Bad request.',
            schema: { $ref: "#/components/schemas/ErrorResponse" }
    } */
    /* #swagger.responses[404] = { 
            description: 'Article not found.',
            schema: { $ref: "#/components/schemas/ErrorResponse" }
    } */
    const { article_id } = req.params;
    const { title, content, author } = req.body;
    const article = await service.updateArticle(article_id, title, content, author);
    return formatResponse(res, 200, { id: article._id });
});

/*
// Função para listar Artigos
const listArticles = (req, res) => 
  resource.model.find({})
  .then((articles) => res.type('.json').status(200).json({
    status: 200,
    message: "Success",
    data: articles.map(article => ({
      id: article._id,
      title: article.title,
      content: article.content,
      author: article.author
    }))
  }))
  .catch(() => res.type('.json').status(404).json({
    status: 404,
    message: 'Article not found.',
    data: null
  }));

  
// Função para pesquisar 1 Article
const getOneArticle = (req, res) => 
  resource.model.findOne({ _id: req.params.article_id })
  .then((article) => res.type('.json').status(200).json({
    status: 200,
    message: "Success",
    data: {
        id: article._id,
        title: article.title,
        content: article.content,
        author: article.author
    }
  }))
  .catch(() => res.type('.json').status(404).json({
      status: 404,
      message: 'Article not found.',
      data: null
  }));

// Função para criar um novo Article
const saveArticle = (req, res) => 
  resource.model.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      createdAt: new Date()})
  .then((article) => res.type('.json').status(201).json({
    status: 201,
    message: "Success",
    result: 1,
    data:  {
      id: article._id
    }
  }))
  .catch((err) => res.type('.json').status(400).json({
    status: 400,
    message: 'Unable to save article: ' + err.errors,
    data: null,
  }));

// Função para excluir um Article
const removeArticle = (req, res) => 
  resource.model.findOneAndDelete({ _id: req.params.id })
  .then(
      res.type('.json').status(200).json({
        status: 200,
        message: "Success",
        data: {
          id: req.params.id
        }
      }))
  .catch((err) =>
      res.type('.json').status(400).json({
        status: 400,
        message: err,
        data: null
      }));

// Função para atualizar um Article existente
const updateArticle = (req, res) => 
  resource.model.findOneAndUpdate({ _id: req.params.id },{
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      lastModifiedAt: new Date()})
  .then((article) =>
      res.type('.json').status(200).json({
        status: 200,
        message: "Success",
        data: {
          id: article._id
        }
      }))
  .catch(() =>  
    res.type('.json').status(404).json({
      status: 404,
      message: 'Article not found.',
      data: null
    }))
  .catch((err) => 
    res.type('.json').status(400).json({
      status: 400,
      message: 'Unable to update article: ' + err,
      data: null
    }));

// Exportando os controladores para serem utilizados em outros arquivos
export default { listArticles, getOneArticle, saveArticle, removeArticle, updateArticle };
*/