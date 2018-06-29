module.exports.onError = (ctx, ex) => {
  ctx.status = ex.httpStatus || 422;

  ctx.body = {
    errors: [
      {
        code: ex.code || 1000,
        message: ex.message
      }
    ]
  };
};