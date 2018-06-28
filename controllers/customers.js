const fetchCustomers = async (ctx, next) => {

    // const infos = await Info.find({})
    ctx.body = {
        success: true,
        data: {
            message: 'hihi'
        }
    }
}

module.exports.fetchCustomers  = fetchCustomers