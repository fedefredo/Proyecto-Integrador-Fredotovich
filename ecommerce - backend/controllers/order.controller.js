const Order = require('../models/order.model')

async function createOrder(req, res) {
    try {
        const order = new Order(req.body)

        const orderDB = await order.save()

        res.status(201).send({
            ok: true,
            message: 'Orden creada correctamente',
            order: orderDB
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'Error al crear la orden'
        })
    }
}

async function getOrders(req, res) {
    try {
        if(req.user?.role === 'ADMIN_ROLE') {
            const orders = await Order.find().populate('userId', 'name email').populate('products.productId')
            return res.status(200).send({
                ok: true,
                orders
            })
        }

        const orders = await Order.find({userId: req.user._id}).populate('products.productId')
        return res.status(200).send({
            ok: true,
            orders
        })
    } catch (error) { 
        console.log(error)
        res.status(500).send({
            ok: false,
            message: 'Error al obtener las ordenes'
        })
    }
}

module.exports = {
    createOrder,
    getOrders
}