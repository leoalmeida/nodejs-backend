/**
 * Defines the routes for the status API.
 *
 * @param {object} app - The Express application instance.
 * @property {object} app.controllers.status - The controller for handling status-related logic.
 *
 * Routes:
 * - GET /: Retrieves a list of status entries.
 * - PUT /:regid: Updates a specific status entry by its ID.
 * - GET /:regid: Retrieves a specific status entry by its ID.
 */
// routes/statusRoutes.js

import { Router } from 'express';
const router = Router({mergeParams: true});
import {listarItems,getOneItem,updateItem} from '../controllers/status-controller.js';

// Rotas para operações de gestão de status dos recursos

// Status api route.
router.route("/")
    .get(listarItems);

router.route('/:id')
    .get(getOneItem);

router.route('/:id/:status')  
    .put(updateItem)

export default router;