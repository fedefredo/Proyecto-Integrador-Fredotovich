const jwt = require('jsonwebtoken')
const secret = 'alfabeta'

function jwtVerify(req, res, next) {
    const token = req.headers.authorization

    if(!token) {
        return res.status(400).send({
            ok: false,
            message: "No se proporcionó un token"
        })
    }

    jwt.verify(token, secret, (error, payload) => {
        if (error) {
            return res.status(401).send({
                ok: false,
                message: 'No tienes autorizacion'
            })
        }
        req.user = payload.user
        next()
    })
}

module.exports = jwtVerify;