const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller')
const jwtVerify = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
const uploadImage = require("../middlewares/uploadProductImage")

router.get('/products/:id?', productController.getProducts)

router.post('/products', [jwtVerify, isAdmin, uploadImage], productController.createProduct)

router.put('/products/:id', [jwtVerify, isAdmin, uploadImage], productController.updateProduct)

router.delete('/products/:id', [jwtVerify, isAdmin],productController.deleteProduct)

router.get('/products/search/:search', productController.searchProduct)

module.exports = router;