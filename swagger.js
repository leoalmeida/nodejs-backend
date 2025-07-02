import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: "1.0.0",
        title: "api-nodejs",
        description: "Projeto de exemplo..."
    },
    servers: [
        {
        url: 'localhost:8080',
        description: ''      
        },
    ],
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Article",
            "description": "Article Endpoints"
        },
        {
            "name": "User",
            "description": "User Endpoints"
        },
        {
            "name": "Resource",
            "description": "Resource Endpoints"
        }
    ],
    components: {
        schemas: {
            Article: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The article ID.',
                        example: '60d5ec49f1d2f2001c8b4567'
                    },
                    title: {
                        type: 'string',
                        description: 'The title of the article.',
                        example: 'My Awesome Article'
                    },
                    content: {
                        type: 'string',
                        description: 'The content of the article.',
                        example: 'This is the content of the awesome article.'
                    },
                    author: {
                        type: 'string',
                        description: 'The author of the article.',
                        example: 'John Doe'
                    }
                }
            },
            ArticlePayload: {
                type: 'object',
                required: ['title', 'content', 'author'],
                properties: {
                    title: {
                        type: 'string',
                        description: 'The title of the article.',
                        example: 'My New Article'
                    },
                    content: {
                        type: 'string',
                        description: 'The content of the article.',
                        example: 'This is the content.'
                    },
                    author: {
                        type: 'string',
                        description: 'The author of the article.',
                        example: 'John Doe'
                    }
                }
            },
            ResourceId: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The resource ID.',
                        example: '60d5ec49f1d2f2001c8b4567'
                    }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    status: {
                        type: 'integer',
                        description: 'The HTTP status code.',
                        example: 400
                    },
                    message: {
                        type: 'string',
                        description: 'A human-readable error message.',
                        example: 'Bad Request'
                    }
                }
            },
            User: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The user ID.',
                        example: '60d5ec49f1d2f2001c8b4568'
                    },
                    name: {
                        type: 'string',
                        description: 'The name of the user.',
                        example: 'Jane Doe'
                    },
                    birthDate: {
                        type: 'string',
                        description: 'The birth date of the user.',
                        example: '1990-05-15'
                    },
                    phone: {
                        type: 'string',
                        description: 'The phone number of the user.',
                        example: '+1-555-123-4567'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'The email address of the user.',
                        example: 'jane.doe@example.com'
                    },
                    occupation: {
                        type: 'string',
                        description: 'The occupation of the user.',
                        example: 'Software Engineer'
                    },
                    state: {
                        type: 'string',
                        description: 'The state of residence.',
                        example: 'CA'
                    },
                    createdBy: {
                        type: 'string',
                        description: 'The user who created this record.',
                        example: 'system'
                    },
                    createdAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'The creation timestamp.',
                        example: '2023-01-01T12:00:00Z'
                    },
                    lastModifiedBy: {
                        type: 'string',
                        description: 'The user who last modified this record.',
                        example: 'admin'
                    },
                    lastModifiedAt: {
                        type: 'string',
                        format: 'date-time',
                        description: 'The last modification timestamp.',
                        example: '2023-01-02T15:30:00Z'
                    }
                }
            },
            UserPayload: {
                type: 'object',
                required: ['name', 'createdBy', 'createdAt'],
                properties: {
                    name: {
                        type: 'string',
                        description: 'The name of the user.',
                        example: 'John Smith'
                    },
                    birthDate: {
                        type: 'string',
                        description: 'The birth date of the user.',
                        example: '1985-08-20'
                    },
                    phone: {
                        type: 'string',
                        description: 'The phone number of the user.',
                        example: '+44-20-7946-0958'
                    },
                    email: {
                        type: 'string',
                        format: 'email',
                        description: 'The email address of the user.',
                        example: 'john.smith@example.co.uk'
                    },
                    occupation: {
                        type: 'string',
                        description: 'The occupation of the user.',
                        example: 'Project Manager'
                    },
                    state: {
                        type: 'string',
                        description: 'The state of residence.',
                        example: 'NY'
                    }
                }
            },
            Resource: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'The resource ID.',
                        example: '60d5ec49f1d2f2001c8b4569'
                    },
                    name: {
                        type: 'string',
                        description: 'The name of the resource.',
                        example: 'Server A'
                    },
                    type: {
                        type: 'string',
                        description: 'The type of the resource.',
                        example: 'Virtual Machine'
                    },
                    location: {
                        type: 'string',
                        description: 'The location of the resource.',
                        example: 'us-central1-a'
                    },
                    status: {
                        type: 'string',
                        description: 'The status of the resource.',
                        example: 'active'
                    }
                }
            },
            ResourcePayload: {
                type: 'object',
                required: ['name', 'type', 'status', 'createdBy', 'createdAt'],
                properties: {
                    name: { type: 'string' },
                    type: { type: 'string' },
                    location: { type: 'string' },
                    status: { type: 'string' },
                    createdBy: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' }
                }
            }
        }
    }
};

const outputFile = './config/swagger.json';
//const endpointsFiles = ['./api/route/article-routes.js','./api/route/resource-routes.js', './api/route/status-routes.js', './api/route/user-routes.js'];
const endpointsFiles = [
    './app.js'];
const options = {
    openapi: '3.0.0'
}
swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(async () => {
    await import('./index.js');           // Your project's root file
});
