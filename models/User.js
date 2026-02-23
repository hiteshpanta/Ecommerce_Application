import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email address!`
        },
        required: true,
    },
    password: {
        type: String,
        minlength: [4, 'minimum 4 characters required'],
        required: true,
    },
    role: {
        type: String,
        enum: {
            values: ['admin','user'],
            message: '{VALUE} is not supported'

        },
        default: 'user'
    },
    order: [
        {
            products: [
                {
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product',
                        required: true,
                    },
                    quantity: {
                            type: Number,
                            required: true,
                    }
                    
                }
            ],
            totalAmount: {
                type: Number,
                required: true
            }

        }
    ]
}, {timestamps: true});

const User = mongoose.model('User', UserSchema) ;

export default User;