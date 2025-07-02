/**
 * Defines the routes for user-related operations in the API.
 *
 * @param {object} app - The Express application instance.
 * @property {object} app.controllers.user - The user controller containing route handlers.
 *
 * Routes:
 * - GET /: Retrieves a list of users.
 * - POST /: Creates a new user.
 * - DELETE /:regid: Deletes a user by their registration ID.
 * - PUT /:regid: Updates a user by their registration ID.
 * - GET /:regid: Retrieves a single user by their registration ID.
 */

import { Router } from 'express';
const router = Router({mergeParams: true});
import { listarItems, saveItem, removeItem, updateItem, getOneItem } from '../controllers/user-controller.js';

// Rotas para operações CRUD de recursos

// User api route.
router.route("/")
    .get(listarItems)
    .post(saveItem);

router.route('/:id')
    .delete(removeItem)
    .put(updateItem)
    .get(getOneItem);


export default router;

