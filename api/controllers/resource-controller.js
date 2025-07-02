import ResourceService from '../services/resource-service.js';
import catchAsync from '../middleware/catch-async.js';
import formatResponse from '../utils/response-formatter.js';

const service = new ResourceService();

export const createResource = catchAsync(async (req, res) => {
    // #swagger.tags = ['Resource']
    // #swagger.description = 'Endpoint to create a new resource.'
    /* #swagger.parameters['obj'] = { in: 'body', description: 'Resource information.', required: true, schema: { $ref: "#/components/schemas/ResourcePayload" } } */
    /* #swagger.responses[201] = { description: 'Resource successfully created.', schema: { $ref: "#/components/schemas/ResourceId" } } */
    /* #swagger.responses[400] = { description: 'Bad request.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    const result = await service.createResource(req.body);
    return formatResponse(res, 201, { id: result._id });
});

export const getAllResources = catchAsync(async (req, res) => {
    // #swagger.tags = ['Resource']
    // #swagger.description = 'Endpoint to get all resources.'
    /* #swagger.responses[200] = { description: 'Resources successfully obtained.', schema: { type: 'array', items: { $ref: '#/components/schemas/Resource' } } } */
    const resources = await service.getAllResources();
    return formatResponse(res, 200, resources);
});

export const getResourceById = catchAsync(async (req, res) => {
    // #swagger.tags = ['Resource']
    // #swagger.description = 'Endpoint to get a specific resource by ID.'
    /* #swagger.parameters['id'] = { in: 'path', description: 'Resource ID.', required: true } */
    /* #swagger.responses[200] = { description: 'Resource successfully obtained.', schema: { $ref: '#/components/schemas/Resource' } } */
    /* #swagger.responses[404] = { description: 'Resource not found.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    const { id } = req.params;
    const resource = await service.getResourceById(id);
    return formatResponse(res, 200, resource);
});

export const updateResourceById = catchAsync(async (req, res) => {
    // #swagger.tags = ['Resource']
    // #swagger.description = 'Endpoint to update a resource by ID.'
    /* #swagger.parameters['id'] = { in: 'path', description: 'Resource ID.', required: true } */
    /* #swagger.parameters['obj'] = { in: 'body', description: 'Resource information to update.', required: true, schema: { $ref: "#/components/schemas/ResourcePayload" } } */
    /* #swagger.responses[200] = { description: 'Resource successfully updated.', schema: { $ref: "#/components/schemas/ResourceId" } } */
    /* #swagger.responses[400] = { description: 'Bad request.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    /* #swagger.responses[404] = { description: 'Resource not found.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    const { id } = req.params;
    const result = await service.updateResource(id, req.body);
    return formatResponse(res, 200, { id: result._id });
});

export const deleteResourceById = catchAsync(async (req, res) => {
    // #swagger.tags = ['Resource']
    // #swagger.description = 'Endpoint to delete a resource by ID.'
    /* #swagger.parameters['id'] = { in: 'path', description: 'Resource ID.', required: true } */
    /* #swagger.responses[200] = { description: 'Resource successfully deleted.', schema: { $ref: "#/components/schemas/ResourceId" } } */
    /* #swagger.responses[404] = { description: 'Resource not found.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    const { id } = req.params;
    const result = await service.deleteResourceById(id);
    return formatResponse(res, 200, { id: result._id });
});

