import express, { json } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import nodemailer from 'nodemailer';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

const port = 5000;

dotenv.config({ quiet: true })

mongoose.connect(process.env.DB_URL).then((val)=>{
    app.listen(port,()=>{
        console.log(`connected and server running on port ${port}`)
    });
}).catch((err)=>{
    console.log(err);
});

app.use(cors({
    origin: [ 'https://ecommerce-application-peach.vercel.app/', 'http://localhost:5173']
}   
));
app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 5 * 1024 * 1024 },
}));


app.use(express.static('uploads'))

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'pantahitesh@gmail.com',
        pass: 'app password'
    }
})

app.get('/', (req,res)=>{
    return res.status(200).json({
        status: 'success',
        data: 'wellcome to server E-commerce'
    })
});


app.post('/send-email', async(req,res) => {
    const { to, subject, text} =req.body ?? {};
    try {
        const info = await transporter.sendMail({
            from: 'Hello jee <pantahitesh@gmail.com>',
            to,
            subject,
            text
        });
        return res.status(200).json({
            status: 'Success',
            data: info
        });
    } catch (err) {
        return res.status(500).json({
            error: err.message
        });
        
    }
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


app.use(userRoutes)
app.use(productRoutes);
app.use(orderRoutes);




