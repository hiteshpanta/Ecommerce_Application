import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';

const app = express();

const port = 6000;

mongoose.connect('mongodb+srv://hiteshpant50:alright@cluster0.fbhzw9j.mongodb.net/Ercel_Store').then((val)=>{
    app.listen(port,()=>{
        console.log(`connected and server running on port ${port}`)
    });
}).catch((err)=>{
    console.log(err);
});

app.use(express.json());

app.get('/', (req,res)=>{
    return res.status(200).json({
        status: 'success',
        data: 'wellcome to server E-commerce'
    })
})



// app.use((req,res,next)=>{
//     const {title} =req.body ?? {};
//     if(!title){
//         return res.status(400).json({
//             status: 'Error',
//             data: 'title is required'
//         });

//     }
//     next();
    
// });

app.use(cors());
app.use(userRoutes)
app.use(productRoutes);




