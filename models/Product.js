import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    detail: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: [true, 'Why no bacon?'],
    },
    price: {
        type: Number,
        required: true,
    },

}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);

export default Product;