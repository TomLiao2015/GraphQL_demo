const Koa = require('koa');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const path = require('path');
const swagger = require('swagger2');
const { validate, ui } = require('swagger2-koa');
require('./mongodb');

const router = require('./router');

const app = new Koa();

const port = process.env.PORT || 4000;

const document = require('./apiDoc');
// validate document
// if (!swagger.validateDocument(document)) {
//   throw Error(`./apispec.yml does not conform to the Swagger 2.0 schema`);
// }
// app.use(validate(document));

app.use(bodyParser());

// app.use(KoaStatic(path.join(__dirname, 'public')));
// CORS
app.use(cors({ origin: '*', allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'] }));

app.use(router.routes())
  .use(router.allowedMethods());

// API SPEC UI
app.use(ui(document, '/rest/demo/'));
app.swaggerDoc = document;

app.listen(port);

console.log('GraphQL-demo server listen port: ' + port);
