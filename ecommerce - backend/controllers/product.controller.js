const Product = require('../models/product.model')
const Category = require("../models/category.model")

async function getProducts(req, res) {
    try {
        const id = req.params.id;

        if(id) {
            const product = await Product.findById(id).populate("category", "name")

            return res.send({
                ok: true,
                message: 'Producto encontrado',
                product: product
            })
        }

        // const limit = parseInt(req.query.limit) || 3;
        // const page = parseInt(req.query.page) || 0;

        // const [total, products] = await Promise.all([
        //     Product.countDocuments(),
        //     Product.find().select({__v: 0}).limit(limit).skip(page * limit).sort({name: 1}).collation({locale: 'es'}).populate("category", "name")
        // ])

        const products = await Product.find().populate("category", "name")

        return res.status(200).send({
            ok: true,
            message: 'Productos obtenidos correctamente',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'Error al obtener los productos'
        })
    }
}

async function createProduct(req, res) {
    try {
        const product = new Product(req.body)

        req.file?.filename ? product.image = req.file.filename : null;

        const productDB = await product.save()

        return res.status(200).send({
            ok: true,
            message: 'Producto creado correctamente',
            product: productDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'Error al crear el producto'
        })
    }
}

async function updateProduct(req, res) {
    try {
        const id = req.params.id

        const body = req.body;

        const product = await Product.findById(id)

        if(!product) {
            return res.status(404).send({
                ok: false,
                message: 'Producto no encontrado'
            })
        }

        req.file?.filename ? body.image = req.file.filename : null;

        const updatedProduct = await Product.findByIdAndUpdate(id, body, {new: true})

        return res.status(200).send({
            ok: true,
            message: "Producto actualizado correctamente",
            product: updatedProduct
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar el producto"
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id

        const product = await Product.findByIdAndDelete(id)

        if(!product) {
            return res.status(404).send({
                ok: false,
                message: 'Producto no encontrado'
            })
        }

        return res.status(200).send({
            ok: true,
            message: 'El producto fue eliminado correctamente'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: 'Error al eliminar el producto'
        })
    }
}

async function searchProduct(req, res) {
    try {
        const search = new RegExp(req.params.search, 'i')

        const products = await Product.find({
            $or: [
                {name: search},
            ]
        })

        return res.send({
            ok: true,
            message: 'Productos encontrados',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'No se pudo buscar el producto'
        })
    }
}

module.exports = {getProducts, createProduct, updateProduct, deleteProduct, searchProduct}