import express from 'express'
import { Book } from '../models/Book.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.use(protect)
//Traer todos los libros
router.get('/', async (req, res) =>{
    try{
        const books = await Book.find({ user: req.userId })
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({ message: 'Error al traer los libros' })
    }
});

//Crear un libro
router.post('/', async (req, res) => {
    try{
        const { title, author, status, cover } = req.body || {}
        if (!title || !author){
            return res.status(400).json({ message: "El titulo y el autor son obligatorios" })
        }
        const newBook = await Book.create({ title, author, status, cover, user: req.userId })
        res.status(201).json({ book: newBook, message: 'Libro creado correctamente' })
    
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//Editar un libro
router.put('/:id', async (req, res) =>{
    try{
        const { id } = req.params
        const { title, author, status } = req.body || {}
        const updateBook = await Book.findOneAndUpdate(
            {_id: id, user: req.userId },
            { $set: {title, author, status} },
            { new: true, runValidators: true}
        )

        if (!updateBook) {
            return res.status(404).json({ message: 'Libro no encontrado' })
        }
        res.status(200).json({ updateBook, message: 'Libro actualizado correctamente'})
    } catch (error) {
        return res.status(400).json({message: 'Error al actualizar el libro', error: error.message})
    }
})

//Eliminar un libro
router.delete('/:id', async (req, res) =>{
    try{
        const { id } = req.params
        const deleteBook = await Book.findOneAndDelete({ _id: id, user: req.userId })
        if(!deleteBook) {
            return res.status(404).json({ message: 'No se encontro el libro'})
        }
        res.status(200).json({message:'Libro eliminado correctamente'})
    } catch (error) {
        return res.status(400).json({message: 'Error al eliminar libro', error: error.message})
    }
})


export default router