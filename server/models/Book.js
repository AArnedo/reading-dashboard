import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: {
            values: ['leido', 'leyendo', 'quiero-leer'],
            message: `{VALUE} no es un estado valido`
        },
        default: 'quiero-leer'
    }
})

export const Book = mongoose.model('Book', bookSchema)