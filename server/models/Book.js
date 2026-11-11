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
    cover: {
        type: String,
        
    },
    status: {
        type: String,
        enum: {
            values: ['leido', 'leyendo', 'quiero-leer'],
            message: `{VALUE} no es un estado valido`
        },
        default: 'quiero-leer'
    },
    // Clave de la obra en Open Library (ej: "/works/OL45883W"), sirve para traer la sinopsis
    olKey: {
        type: String
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'La descripción no puede superar los 1000 caracteres']
    },
    rating: {
        type: Number,
        min: [1, 'La puntuación mínima es 1'],
        max: [10, 'La puntuación máxima es 10'],
        validate: {
            validator: (value) => value === null || Number.isInteger(value),
            message: 'La puntuación tiene que ser un número entero'
        },
        default: null
    },
    review: {
        type: String,
        trim: true,
        maxlength: [2000, 'La nota no puede superar los 2000 caracteres'],
        default: ''
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Book = mongoose.model('Book', bookSchema)