import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'blogs',
        },
    ],
    lastBlog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs',
    },
})

export const userModel = mongoose.model('users', userSchema)
