import Product, { brands, categories } from "../models/Product.js";
import fs from 'fs';

export const getProducts = async (req,res) => {

    try {

        const excludeFields = ['page', 'limit','sort', 'fields', 'skip', 'search'];
        let queryObj = {...req.query};

        excludeFields.forEach((val) => {
            delete queryObj[val];
        })



        if (req.query.search) {
            const searchText = req.query.search;

            if (categories.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
                queryObj.category = { $regex: searchText, $options: 'i'};
            } else if (brands.some((name) => name.toLowerCase() === searchText.toLowerCase())) {
                queryObj.brand = { $regex: searchText, $options: 'i'};
            } else {
                queryObj.title = { $regex: searchText, $options: 'i'}
            }
        };




        // { 'rating[gt]': '4'}
        // {rating: {$gt: 4 }}
        const output = Object.entries(queryObj).reduce((acc, [key,value]) => {
            const match = key.match(/^(.+)\[(.+)\]$/);
            if(match) {
                const fields =match[1];
                const operator = `$${match[2]}`;
                const parsedValue = isNaN(value) ? value : Number(value);

                acc[fields] = { [operator]: parsedValue };
            } else {
                acc[key] = value;
            }
            return acc;
        }, {});

        console.log(output)




        let query = Product.find(output);

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);


        }

        const page = req.query.page || 1;
        // const limit = req.top5 ? 5 : req.query.limit || 10;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * 10;
        // query = query.skip(skip).limit(limit);

        const total = await Product.countDocuments();


        const products = await query.skip(skip).limit(limit);

        return res.status(200).json({
            status: 'success',
            total,
            products,
            totalPages: Math.ceil(total / limit)
        });
    } catch (err) {
        return res.status(404).json({
            status: 'Error',
            data: err
        })
    }
};


export const getProduct = async(req,res) => {
    try {
        const isExist = await Product.findById(req.id);
        if(!isExist) return res.status(404).json({status: 'Error',
            data: 'Product not found'});

        return res.status(200).json({
            status: 'Success',
            product: isExist
        })
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            message: err.message
        })
    }
};


export const createProduct = async(req,res) => {
    const {title, price, detail, image, category, stock, brand} = req.body ?? {};
    // const file = req.files.image;
    // file.mv(`./uploads/${file.name}`,(err)=>{

    // })
    // console.log(req.imagePath);

    try {
        await Product.create({
            title,
            price,
            detail,
            image: req.imagePath,
            category,
            stock,
            brand
        })
        res.status(201).json({
            status: 'Success',
            data: 'Product added successfully'

        })
        
    } catch (err) {
        fs.unlink(`./uploads/${req.imagePath}`, (error)=> {
            return res.status(400).json({
                status: 'Error',
                message: err.message
            })
        });
        
        
    }
};


export const updateProduct = async(req,res) => {
    const {title, price, detail, category, stock, brand} = req.body ?? {};

    try {
        const isExist = await Product.findById(req.id);

        if(!isExist) {
            if(req.imagePath) {
                fs.unlinkSync(`./uploads/${req.imagePath}`);
                    return res.status(404).json({
                        status: 'success',
                        data: 'Product not found'
                    });
            } else {
                return res.status(404).json({
                    status: 'Error',
                    data: 'Product not found'
                })
            }
        }
        

        isExist.title = title || isExist.title;
        isExist.price =price || isExist.price;
        isExist.detail =detail || isExist.detail;
        isExist.category = category || isExist.category;
        isExist.stock = stock || isExist.stock;
        isExist.brand = brand || isExist.brand;
        await isExist.save();

        if(req.imagePath) {
            fs.unlink(`./uploads/${isExist.image}`, async (err)=> {
                
                isExist.image = req.imagePath
                await isExist.save();
                return res.status(200).json({
                    status: 'Success',
                    data: 'Product successfully updated'
                });
            })

        } else {
            return res.status(200).json({
                status: 'Success',
                data: 'Product successfully updated'
            })
        }
        

        

    } catch (err) {
        if(req.imagePath) {
                fs.unlink(`./uploads/${req.imagePath}`, (error)=> {
                    return res.status(500).json({
                        status: 'success',
                        message: err.message
                    });
                });
            }else {
                return res.status(500).json({
                    status: 'Error',
                    message: err.message
                });
            }
        
    }
};


export const deleteProduct = async (req,res) => {
    try {
        const isExist = await Product.findById(req.id);
        if(!isExist) return res.status(404).json({
            status: 'Error',
            data: 'Product not found'
        });
        fs.unlink(`./uploads/${isExist.image}`, async (err)=> {
            await isExist.deleteOne();
            return res.status(200).json({
                status: 'Success',
                data: 'Product deleted successfully'
            });
        })
        
    } catch (err) {
        return res.status(500).json({
            status: 'Error',
            message: err.message
        })
    }
};