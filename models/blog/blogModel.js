import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        image: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'images',
        },
        text: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'texts',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
        },
        category: {
            type: String,
        },
    },
    { timestamps: true }
)

export const blogModel = mongoose.model('blogs', blogSchema)
