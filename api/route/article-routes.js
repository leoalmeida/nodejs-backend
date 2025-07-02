/**
 * Defines the articleRoutes for the article API.
 *
 * @param {object} app - The application instance.
 * @property {object} app.controllers.article - The article controller containing the route handlers.
 *
 * Routes:
 * - GET /: Retrieves a list of article.
 * - POST /: Creates a new article.
 * - DELETE /:id: Deletes a specific article by ID.
 * - PUT /:id: Updates a specific article by ID.
 * - GET /:id: Retrieves a specific article by ID.
 */

// route/articleRoutes.js

import { Router } from 'express';
import { createArticle, getAll, getOneById, deleteArticleById, updateArticleById } from '../controllers/article-controller.js';

const router = Router({mergeParams: true});

// Rotas para operações CRUD de recursos
router.route("/")
    .get(getAll)
    .post(createArticle);

router.route('/:article_id')
    .delete(deleteArticleById)
    .put(updateArticleById)
    .get(getOneById);

export default router;