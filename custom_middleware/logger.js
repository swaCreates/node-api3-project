
module.exports= function logger(req, res, next) {
    console.log(`\n ${new Date().toISOString()} ${req.ip} ${req.method} ${req.url} \n`)
    next();
}

