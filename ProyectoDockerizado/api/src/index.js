import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // 👈 importa cors
import Movie from './models/Movie.js';

dotenv.config();

const app = express();

app.use(cors()); // 👈 permite todas las conexiones por defecto
app.use(express.json());
// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas CRUD
// Obtener todas las películas
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error("Error al obtener las películas:", err);
    res.status(500).json({ message: "Error al obtener las películas", error: err });
  }
});

// Crear una nueva película
app.post('/movies', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    console.error("Error al crear la película:", err);
    res.status(500).json({ message: "Error al crear la película", error: err });
  }
});

// Actualizar una película existente
app.put('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.json(movie);
  } catch (err) {
    console.error("Error al actualizar la película:", err);
    res.status(500).json({ message: "Error al actualizar la película", error: err });
  }
});

// Eliminar una película
app.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error al eliminar la película:", err);
    res.status(500).json({ message: "Error al eliminar la película", error: err });
  }
});

// Puerto de la API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en el puerto ${PORT}`);
});
