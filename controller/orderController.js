import Order from "../models/Order.js";



export const getOrders = async (req, res) => {
    
    try {
        if(req.role === 'admin'){
                const orders = await Order.find({}).populate([{
                path: 'products.productId',
                model: 'Product',
            },{
                path: 'userId',
                model: 'User',
                select: '-password'
            }]);

        }else {
            const orders = await Order.find({userId: req.userId}).populate([{
                path: 'products.productId',
                model: 'Product',
            },{
                path: 'userId',
                model: 'User',
                select: '-password'
            }]);

        }
        
        return res.status(201).json({
            status: 'success',
            orders
        })
        
    } catch (err) {
         return res.status(500).json({
            status: 'error',
            message: err.message
         })
        
    }
};


export const createOrder = async (req, res) => {
    const { products, totalAmount } = req.body ?? {};

    try {
        await Order.create({
            products,
            userId: req.userId,
            totalAmount,
        });
        return res.status(201).json({
            status: 'success',
            data: 'Order created successfully'
        })
        
    } catch (err) {
         return res.status(500).json({
            status: 'error',
            message: err.message
         })
        
    }
};

