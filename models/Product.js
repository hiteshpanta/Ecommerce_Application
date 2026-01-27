import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['food','clothes','tech','jewellery'],
        required: true,
    },
    brand: {
        type: String,
        enum: ['adidas','samsung','tanishq','kfc','iphone'],
        required: true,
    },
    // eggs: {
    //     type: Number,
    //     min: [6, 'Too few eggs'],
    //     max: 12
    // },
    rating: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },

}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);

export default Product;