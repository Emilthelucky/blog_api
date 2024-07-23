import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
})

export const imageModel = mongoose.model('images', imageSchema)
