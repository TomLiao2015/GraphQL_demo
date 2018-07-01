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

module.exports.delete_Id = (data) => {

  if (data instanceof Array) {
    data.forEach(item => {
      delete item._id;
    });
  } else {
    if (data) {
      delete data._id;
    }
  }
  return data;
};