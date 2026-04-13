import Order from "../models/Order.js";


export const getOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order =await Order.findById(req.id).populate([
            {
                path: 'Products.product',
                model: 'Product',
            }
        ])
        
        return res.status(201).json({
            status: 'success',
            order
        })
        
    } catch (err) {
         return res.status(500).json({
            status: 'error',
            message: err.message
         })
        
    }

}

export const getOrders = async (req, res) => {
    
    try {
        if(req.role === 'admin'){
                const orders = await Order.find({}).populate([{
                path: 'products.product',
                model: 'Product',
            },{
                path: 'userId',
                model: 'User',
                select: '-password'
            }]);

        }else {



            const orders = await Order.find({userId: req.userId}).populate([{
                path: 'products.product',
                model: 'Product',
            },{
                path: 'userId',
                model: 'User',
                select: '-password'
            }]);

            return res.status(201).json({
            status: 'success',
            orders
        });

        }
        
        
        
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

