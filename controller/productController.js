import Product from "../models/Product.js";

export const getProducts = (req,res) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: 'all Products',
        })
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err
        })
    }
};


export const getProduct = (req,res) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: 'single Product'
        })
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err
        })
    }
};


export const createProduct = async(req,res) => {

    try {
        await Product.create({
            title: 'hello jee',
            detail: 'sello jee',
            price: 9000,
        })
        res.status(201).json({
            status: 'success',
            data: 'Product added successfully'

        })
        
    } catch (err) {
        return res.status(400).json({
            statuas: 'Error',
            data: err.message
        })
        
    }
};


export const updateProduct = (req,res) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: 'Product updated'
        })
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err
        })
    }
};


export const deleteProduct = (req,res) => {
    try {
        return res.status(200).json({
            status: 'success',
            data: 'Product deleted'
        })
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err
        })
    }
};