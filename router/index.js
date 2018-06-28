// import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
const {fetchCustomers} = require('../controllers/customers');
// import {saveStudent, fetchStudent, fetchStudentDetail} from '../controllers/student'
// import { saveCourse, fetchCourse } from '../controllers/course'
// const { saveCourse, fetchCourse } = require()'../controllers/course'
const Router = require('koa-router');
// import schema from '../graphql/schema'

// ROUTES
const router = new Router({
    prefix: '/rest/demo'
});


router.get('/customers', fetchCustomers)
      // .get('/info', fetchInfo)
      // .post('/savestudent', saveStudent)
      // .get('/student', fetchStudent)
      // .get('/studentDetail', fetchStudentDetail)
      // .post('/savescourse', saveCourse)
      // .get('/course', fetchCourse)




// router.post('/graphql', async (ctx, next) => {
//         await graphqlKoa({schema: schema})(ctx, next)
//       })
//       .get('/graphql', async (ctx, next) => {
//         await graphqlKoa({schema: schema})(ctx, next)
//       })
//       .get('/graphiql', async (ctx, next) => {
//         await graphiqlKoa({endpointURL: '/graphql'})(ctx, next)
//       })

module.exports = router
