const rateLimit = require('express-rate-limit')
const { logEvenets } = require('./logger')

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // Equals to One Minute
    max: 5,
    message:
        { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },
    handler: (req, res, next, options) => {
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t
        ${req.headers.origin}`, 'error.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true, // This will return rate limit info in headers
    legacyHeaders: false, // This will disblae the rate limit headers
})

module.exports = loginLimiter