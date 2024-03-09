const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const secret = 'alfabeta'

async function getUsers(req, res) {
    try {
        const id = req.params.id;

        if (id) {
            const user = await User.findById(id, {password: 0})

            if (!user) {
                return res.status(404).send({
                ok: false,
                message: 'No se encontró el usuario'
            })}

            user.password = undefined

            return res.send({
                ok: true,
                message: 'Usuario encontrado',
                user: user
            })
        }

        const limit = parseInt(req.query.limit) || 3;
        const page = parseInt(req.query.page) || 0;

        const [total, users] = await Promise.all([
            User.countDocuments(),
            User.find().select({password: 0, __v: 0}).limit(limit).skip(page * limit).sort({name: 1}).collation({locale: 'es'})
        ])

        if (!users.length) {
            return res.status(404).send({
                ok: false,
                message: 'No se encontraron usuarios'
            })
        }

        res.send({
            users,
            message: "Usuarios obtenidos",
            ok: true,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error al obtener usuarios",
            ok: false
        })
    }
}

async function createUser(req, res) {
    try {

        const user = new User(req.body)

        if(req.file?.filename) {
            user.image = req.file.filename
        }

        user.password = await bcrypt.hash(user.password, saltRounds)

        const userSaved = await user.save()

        userSaved.password = undefined
    
        res.status(200).send({
            ok: true,
            message: 'Usuario creado correctamente',
            user: userSaved
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'No se pudo crear el usuario'
        })
    }
    
}

async function deleteUser(req, res) {

    try {
        if(req.user.role !== 'ADMIN_ROLE') {
            return res.status(403).send({
                ok: false,
                message: 'No tienes permisos para realizar esta acción'
            })
        }

        const id = req.params.idUser

        const userDeleted = await User.findByIdAndDelete(id)

        if(!userDeleted) {
            return res.status(404).send({
                ok: false,
                message: 'No se encontro el usuario'
            })
        }

        res.send({
            ok: true,
            message: 'Usuario borrado correctamente',
            user: userDeleted
        })
        
    } catch (error) {
        console.log(error)
        res.send('No se pudo borrar el usuario')
    }
}

async function updateUser(req, res) {
    try {
        if(req.user.role !== "ADMIN_ROLE") return res.status(403).send({ok: false, message: 'No tienes permisos para actualizar usuarios'})

        const id = req.params.id
        const nuevosValores = req.body
        nuevosValores.password = undefined

        console.log(nuevosValores)
        console.log("hola")

        req.file?.filename ? nuevosValores.image = req.file.filename : null;

        const userUpdated = await User.findByIdAndUpdate(id, nuevosValores, {new: true})

        console.log(userUpdated)

        res.send({
            ok: true,
            message: 'El usuario fue actualizado correctamente',
            user: userUpdated
        })

    } catch (error) {
        console.log(error)
        res.send({
            ok: false,
            message: 'El usuario no se pudo actualizar'
        })
    }
}

async function login(req, res) {
    try {
        const {password, email} = req.body

        if(!password || !email) {
            return res.status(400).send({
                ok: false,
                message: 'Faltan datos'
            })
        }

        const user = await User.findOne({email: email.toLowerCase()})

        if(!user) {
            return res.status(404).send({
                ok: false,
                message: 'Datos incorrectos'
            })
        }

        const verifiedUser = await bcrypt.compare(password, user?.password)

        if(!verifiedUser) {
            return res.status(404).send({
                ok: false,
                message: 'Datos incorrectos'
            })
        }

        user.password = undefined

        const token = jwt.sign({user}, secret, {expiresIn: '50m'})

        res.send({
            ok: true,
            message: 'Login correcto',
            user,
            token
        })   
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'No se pudo hacer el login'
        })
    }
}

async function searchUser(req, res) {
    try {
        const search = new RegExp(req.params.search, 'i') 

        const users = await User.find({
            $or: [
                {name: search},
                {email: search}
            ]
        })

        return res.send({
            ok: true,
            message: 'Usuarios encontrados',
            users
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'No se pudo buscar el usuario'
        })
    }
}

module.exports = {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    login,
    searchUser
}