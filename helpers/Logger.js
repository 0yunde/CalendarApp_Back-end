const logger = (req = request, response, next) => {
    console.log(req.method, req.path, req.body, response.statusCode)
    next()
}

module.exports =  logger;