function isAdmin(req, res, next) {
    if(req.user.role !== 'ADMIN_ROLE') {
        return res.status(403).send({
            ok: false,
            message: 'No tienes permisos para realizar esta acción'
        })
    }

    next()
}

module.exports = isAdmin;
