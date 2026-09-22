import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe una cuenta con ese email' })
    }

    const newUser = await User.create({ name, email, password })

    const userObject = newUser.toObject()
    const { password: _, ...userWithoutPassword } = userObject

    res.status(201).json({ message: 'Usuario creado correctamente', user: userWithoutPassword })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al registrar usuario' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'El email o la contraseña fue incorrecta' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'El email o la contraseña fue incorrecta' })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    const userObject = user.toObject()
    const { password: _, ...userWithoutPassword } = userObject

    res.status(200).json({ message: 'Login exitoso', token, user: userWithoutPassword })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
})

export default router