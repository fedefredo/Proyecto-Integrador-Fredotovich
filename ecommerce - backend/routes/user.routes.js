const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controllers');
const jwtVerify = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin')
const uploadImage = require('../middlewares/uploadUserImage')

router.get('/users/:id?', userController.getUsers)

router.post('/users', [jwtVerify, isAdmin, uploadImage], userController.createUser)

router.delete('/users/:idUser', [jwtVerify, isAdmin], userController.deleteUser)

router.put('/users/:id', [jwtVerify, isAdmin, uploadImage], userController.updateUser)

router.post('/login', userController.login)

router.get('/users/search/:search', userController.searchUser)

module.exports = router;