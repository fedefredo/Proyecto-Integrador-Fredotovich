const Category = require('../models/category.model')

async function getCategories(req, res) {
    try {
        const categories = await Category.find()

        return res.send({ok: true, categories})
    } catch (error) {
        console.log(error)
        res.status(500).send({ok: false, message: 'Error del servidor'})
    }
}

async function postCategory(req, res) {
    try {
        const category = new Category(req.body) 

        const categoryDB = await category.save() 

        return res.status(201).send({
            ok: true,
            category: categoryDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({ok: false, message: 'Error del servidor'})
    }
}

module.exports = {getCategories, postCategory};