import { useEffect, useState } from 'react';

function App() {
  const [movies, setMovies] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    genre: '',
    director: '',
    releaseDate: '',
    rating: '',
    actors: '',
    posterUrl: '',
  });
  const [editId, setEditId] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await fetch(`${API_URL}/movies`);
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      console.error("Error al obtener películas:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      ...form,
      actors: form.actors.split(',').map(actor => actor.trim()),
    };

    try {
      const method = editId ? 'PUT' : 'POST';
      const endpoint = editId ? `${API_URL}/movies/${editId}` : `${API_URL}/movies`;

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });

      if (res.ok) {
        fetchMovies();
        resetForm();
        setFormVisible(false);
      }
    } catch (error) {
      console.error("Error al guardar película:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/movies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMovies(movies.filter(m => m._id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const handleEdit = (movie) => {
    setForm({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      director: movie.director,
      releaseDate: movie.releaseDate.slice(0, 10),
      rating: movie.rating,
      actors: movie.actors.join(', '),
      posterUrl: movie.posterUrl,
    });
    setEditId(movie._id);
    setFormVisible(true);
  };

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      genre: '',
      director: '',
      releaseDate: '',
      rating: '',
      actors: '',
      posterUrl: '',
    });
    setEditId(null);
  };

  return (
    <div className="app-container">
   <h1 className="app-title">
      <span className="emoji-popcorn">🍿</span> El Mejor Cine
   </h1>

      <div className="toggle-form">
        {!formVisible ? (
          <button onClick={() => setFormVisible(true)} className="btn green">
            ➕ Añadir Película
          </button>
        ) : (
          <button
            onClick={() => {
              setFormVisible(false);
              resetForm();
            }}
            className="btn blue"
          >
            📃 Ver Películas
          </button>
        )}
      </div>

      {formVisible ? (
        <form onSubmit={handleSubmit} className="movie-form">
          <h2>{editId ? "✏️ Editar Película" : "➕ Añadir Película"}</h2>
          {["title", "description", "genre", "director", "releaseDate", "rating", "actors", "posterUrl"].map(field => (
            <div key={field} className="form-group">
              <label htmlFor={field}>{field === "posterUrl" ? "Poster URL" : field}</label>
              <input
                id={field}
                name={field}
                type={field === "releaseDate" ? "date" : "text"}
                value={form[field]}
                onChange={handleChange}
                placeholder={field === "actors" ? "Separados por coma" : ""}
                required={field !== "posterUrl"}
              />
            </div>
          ))}
          <button type="submit" className="btn purple">
            {editId ? "Actualizar Película" : "Añadir Película"}
          </button>
        </form>
      ) : (
        <div className="movie-list">
          {movies.length === 0 ? (
            <p className="empty">No hay películas aún.</p>
          ) : (
            movies.map(movie => (
              <div key={movie._id} className="movie-card">
                <div className="movie-info">
                  <div className="header">
                    <h2>{movie.title}</h2>
                    <span className="rating">⭐ {movie.rating}</span>
                  </div>
                  <p className="meta">Género: {movie.genre}</p>
                  <p className="meta">Director: {movie.director}</p>
                  <p className="meta">Estreno: {new Date(movie.releaseDate).toLocaleDateString()}</p>
                  <p>{movie.description}</p>
                  <p className="meta">Actores: {movie.actors.join(", ")}</p>
                  <div className="actions">
                    <button onClick={() => handleEdit(movie)} className="btn yellow">✏ Editar</button>
                    <button onClick={() => handleDelete(movie._id)} className="btn red">🗑 Eliminar</button>
                  </div>
                </div>
                {movie.posterUrl && (
                  <img src={movie.posterUrl} alt={`Poster de ${movie.title}`} className="poster" />
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
