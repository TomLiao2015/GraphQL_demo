const Koa = require('koa');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors');
const path = require('path');
require('./mongodb');

const router = require('./router');

const app = new Koa();

const port = process.env.PORT || 4000;

app.use(bodyParser());

// app.use(KoaStatic(path.join(__dirname, 'public')));
// CORS
app.use(cors({ origin: '*', allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'] }));

app.use(router.routes())
  .use(router.allowedMethods());





app.listen(port);

console.log('GraphQL-demo server listen port: ' + port);
