import 'dotenv/config'
import express from 'express';
import { connectDB } from './db/connect.js'
import booksRouter from './routes/books.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use('/api/books', booksRouter)

app.get('/api/health', (req, res) =>{
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});

const startServer = async () => {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  })
}
startServer();



