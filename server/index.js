import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json())

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


