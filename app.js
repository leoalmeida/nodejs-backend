import express from 'express';
import bodyParser from 'body-parser';
//import get from 'config';
//import sanitizeNosqlQuery from 'express-mongo-sanitize';

import en from './api/locale/en.js';
import notFoundException from './api/errors/not-found-exception.js';
import errorHandler from './api/errors/error-handler.js';
// Importando as rotas da aplicação relacionadas às tarefas
import routes from './api/route/index.js';
//import articleRoutes from './api/route/article-routes.js';
//import resourceRoutes from './api/route/resource-routes.js';
//import statusRoutes from './api/route/status-routes.js';
//import userRoutes from './api/route/user-routes.js';

import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './config/swagger.json'  with { type: "json" };

/**
 * Configuração do servidor Express.
 *
 * Este arquivo configura o servidor Express, define as rotas da API e inicializa a conexão com o banco de dados.
 *
 * @module config/express
 */

// Inicializando a aplicação Express
const app = express();

// Definindo variáveis que o servidor deverá usar
app.set('port', process.env.PORT || app.get('server.port'));
app.set('db_url', process.env.DATABASE_URL || app.get('server.db.url'));

//app.use(sanitizeNosqlQuery());

// Configurando as rotas disponibilizadas pela aplicação
app.use('/api/v1', routes);

app.get('/health', (req, res) => {
  res.send('OK');
});

//Configure Swagger UI 
var options = {
    swaggerOptions: {
        url: "/api-docs/swagger.json",
    },
}
app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));
//app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/api-docs', serve, setup(swaggerDocument, options));

app.use((req, res, next) => {
  next(new notFoundException(en['page-not-found']));
});

app.use(errorHandler);

export { app };