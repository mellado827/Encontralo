const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    // autorización por el header
    const authHeader = req.get('Authorization')

    if (!authHeader) {
        const error = new Error('No autenticado, no hay JWT')
        error.statusCode = 401
        throw error
    }

    // obtener el token y verificarlo
    const token = authHeader.split(' ')[1]
    let revisarToken

    try {
        revisarToken = jwt.verify(token, 'LLAVESECRETA')

    } catch (error) {
        error.statusCode = 500
        throw error
    }

    //Si es un token válido pero hay algún error
    if (!revisarToken) {
        const error = new Error('No autenticado')
        error.statusCode = 401
        throw error
    }

    next()

}