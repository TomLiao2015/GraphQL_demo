const Koa = require('koa');
const KoaStatic = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')

require('./mongodb')

const router = require('./router')

const app = new Koa()

const port = 4000

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));



// router.use('', GraphqlRouter.routes())

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(port);

console.log('GraphQL-demo server listen port: ' + port)