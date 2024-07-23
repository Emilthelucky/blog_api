import mongoose from 'mongoose'

const textSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
})

export const textModel = mongoose.model('texts', textSchema)
