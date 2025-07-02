/**
 * Defines the routes for the resource API.
 *
 * @param {object} app - The application instance.
 * @property {object} app.controllers.resource - The resource controller containing the route handlers.
 *
 * Routes:
 * - GET /: Retrieves a list of resources.
 * - POST /: Creates a new resource.
 * - DELETE /:regid: Deletes a specific resource by ID.
 * - PUT /:regid: Updates a specific resource by ID.
 * - GET /:regid: Retrieves a specific resource by ID.
 */

// routes/resourceRoutes.js

import { Router } from 'express';
const router = Router({mergeParams: true});
import { createResource, getAllResources, getResourceById, updateResourceById, deleteResourceById } from '../controllers/resource-controller.js';

// Rotas para operações CRUD de recursos
router.route("/")
    .get(getAllResources)
    .post(createResource);

router.route('/:id')
    .delete(deleteResourceById)
    .put(updateResourceById)
    .get(getResourceById);

export default router;