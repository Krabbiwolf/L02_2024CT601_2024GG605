import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({ mensaje: "Bievenido!" });
})

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT + "!");
})