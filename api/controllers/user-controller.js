import UserService from '../services/user-service.js';
import catchAsync from '../middleware/catch-async.js';
import formatResponse from '../utils/response-formatter.js';

const service = new UserService();

export const createUser = catchAsync(async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to create a new user.'
    /* #swagger.parameters['obj'] = { in: 'body', description: 'User information.', required: true, schema: { $ref: "#/components/schemas/UserPayload" } } */
    /* #swagger.responses[201] = { description: 'User successfully created.', schema: { $ref: "#/components/schemas/ResourceId" } } */
    /* #swagger.responses[400] = { description: 'Bad request.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    const result = await service.createUser(req.body);
    return formatResponse(res, 201, { id: result._id });
});

export const getAllUsers = catchAsync(async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to get all users.'
    /* #swagger.responses[200] = { description: 'Users successfully obtained.', schema: { type: 'array', items: { $ref: '#/components/schemas/User' } } } */
    const users = await service.getAllUsers();
    return formatResponse(res, 200, users);
});

export const getUserById = catchAsync(async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to get a specific user by ID.'
    /* #swagger.parameters['id'] = { in: 'path', description: 'User ID.', required: true } */
    /* #swagger.responses[200] = { description: 'User successfully obtained.', schema: { $ref: '#/components/schemas/User' } } */
    /* #swagger.responses[404] = { description: 'User not found.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    const { id } = req.params;
    const user = await service.getUserById(id);
    return formatResponse(res, 200, user);
});

export const updateUserById = catchAsync(async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to update a user by ID.'
    /* #swagger.parameters['id'] = { in: 'path', description: 'User ID.', required: true } */
    /* #swagger.parameters['obj'] = { in: 'body', description: 'User information to update.', required: true, schema: { $ref: "#/components/schemas/UserPayload" } } */
    /* #swagger.responses[200] = { description: 'User successfully updated.', schema: { $ref: "#/components/schemas/ResourceId" } } */
    /* #swagger.responses[400] = { description: 'Bad request.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    /* #swagger.responses[404] = { description: 'User not found.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    const { id } = req.params;
    const result = await service.updateUser(id, req.body);
    return formatResponse(res, 200, { id: result._id });
});

export const deleteUserById = catchAsync(async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Endpoint to delete a user by ID.'
    /* #swagger.parameters['id'] = { in: 'path', description: 'User ID.', required: true } */
    /* #swagger.responses[200] = { description: 'User successfully deleted.', schema: { $ref: "#/components/schemas/ResourceId" } } */
    /* #swagger.responses[404] = { description: 'User not found.', schema: { $ref: "#/components/schemas/ErrorResponse" } } */
    const { id } = req.params;
    const result = await service.deleteUserById(id);
    return formatResponse(res, 200, { id: result._id });
});