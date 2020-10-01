import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [songs, setSongs] = useState([]);

  const obtenerUsuarios = async () => {
    // obtiene los usuarios desde el backend
    const response = await fetch("http://localhost:4000/users/");
    const data = await response.json();
    setUsuarios(data);
  };

  useEffect(() => {
    // Esto se ejecuta al renderizar la pagina por primera vez
    obtenerUsuarios();
  }, []);

  const handleClick = async (e, usuario) => {
    e.preventDefault();
    console.log("Se hizo click en el usaurio ", usuario);
    // Se le pega a la API que trae las canciones
    const response = await fetch(`http://localhost:4000/songs/`);
    const data = await response.json();
    setSongs(data);
  };

  return (
    <div className="App">
      <div>
        <p>Lista de usuarios</p>
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
            <p className="Usuario" key={usuario._id}>
              {usuario.name}
              <button onClick={(e) => handleClick(e, usuario)}>
                Canciones
              </button>
            </p>
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </div>
      <div>
        <p>Lista de canciones</p>
        {songs.map((song) => (
          <p className="Song" key={song._id}>
            {song.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default App;
