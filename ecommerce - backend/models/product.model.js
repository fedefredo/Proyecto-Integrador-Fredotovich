const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 80
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 500
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 100000000
    },
    image: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category", 
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    procesador: {
        type: String,
        required: false
    },
    batería: {
        type: String,
        required: false
    },
    peso: {
        type: String,
        required: false
    },
    pantalla: {
        type: String,
    }
})

module.exports = mongoose.model("Product", productSchema)