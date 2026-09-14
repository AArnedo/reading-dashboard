import express from 'express'
import { Book } from '../models/Book.js'

const router = express.Router()

//Traer todos los libros
router.get('/', async (req, res) =>{
    try{
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: 'Error al traer los libros' })
    }
});

//Crear un libro
router.post('/', async (req, res) => {
    try{
        const { title, author, status } = req.body || {}

        if (!title || !author){
            return res.status(400).json({ message: "El titulo y el autor son obligatorios" })
        }
        const newBook = await Book.create({ title, author, status })
        res.status(201).json(newBook, { message: 'Libro creado correctamente'})
    
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});


//Editar un libro
router.put('/:id', async (req, res) =>{
    try{
        const { id } = req.params
        const { title, author, status } = req.body || {}
        const updateBook = await Book.findByIdAndUpdate(
            id,
            { title, author, status },
            { new: true, runValidators: true}
        )

        if (!updateBook) {
            res.status(404).json({ message: 'Libro no encontrado' })
        }
        res.status(200).json({ updateBook, message: 'Libro actualizado correctamente'})
    } catch (error) {
        res.status(400).json({message: 'Error al actualizar el libro', error})
    }
})


//Eliminar un libro
router.delete('/:id', async (req, res) =>{
    try{
        const { id } = req.params
        const deleteBook = await Book.findByIdAndDelete(
            id,
        )
        if(!deleteBook) {
            res.status(404).json({ message: 'No se encontro el libro'})
        }
        res.status(200).json({message:'Libro eliminado correctamente'})
    } catch (error) {
        res.status(400).json({message: 'Error al eliminar libro', error})
    }
})


export default router