//Crear el servidor
const express = require('express');
const app = express();
// Que tome el puerto establecido a la nube (render )
const puerto = process.env.PORT || 3000;
app.use(express.json()); //Habilitacion para recibir datos

// Arreglo de objetos de películas (sustituye esto por una base de datos real en producción)
let peliculas = [
    {
        id: 1,
        titulo: "El Rey León",
        director: "Roger Allers, Rob Minkoff",
        anoLanzamiento: 1994,
        genero: "Animación/Música",
        calificacion: 8.5
    },
    {
        id: 2,
        titulo: "La Sirenita",
        director: "Ron Clements, John Musker",
        anoLanzamiento: 1989,
        genero: "Animación/Música",
        calificacion: 7.6
    },
    {
        id: 3,
        titulo: "La Bella y la Bestia",
        director: "Gary Trousdale, Kirk Wise",
        anoLanzamiento: 1991,
        genero: "Animación/Música",
        calificacion: 8.0
    },
    {
        id: 4,
        titulo: "Aladdin",
        director: "Ron Clements, John Musker",
        anoLanzamiento: 1992,
        genero: "Animación/Música",
        calificacion: 8.0
    },
    {
        id: 5,
        titulo: "Mulan",
        director: "Tony Bancroft, Barry Cook",
        anoLanzamiento: 1998,
        genero: "Animación/Aventuras",
        calificacion: 7.6
    },
    {
        id: 6,
        titulo: "Frozen",
        director: "Chris Buck, Jennifer Lee",
        anoLanzamiento: 2013,
        genero: "Animación/Aventuras",
        calificacion: 7.4
    },
    {
        id: 7,
        titulo: "Toy Story",
        director: "John Lasseter",
        anoLanzamiento: 1995,
        genero: "Animación/Aventuras",
        calificacion: 8.3
    },
    {
        id: 8,
        titulo: "Buscando a Nemo",
        director: "Andrew Stanton",
        anoLanzamiento: 2003,
        genero: "Animación/Aventuras",
        calificacion: 8.1
    },
    {
        id: 9,
        titulo: "Cenicienta",
        director: "Clyde Geronimi, Wilfred Jackson, Hamilton Luske",
        anoLanzamiento: 1950,
        genero: "Animación/Fantasía",
        calificacion: 7.3
    },
    {
        id: 10,
        titulo: "Zootopia",
        director: "Byron Howard, Rich Moore",
        anoLanzamiento: 2016,
        genero: "Animación/Aventuras",
        calificacion: 8.0
    }
];

app.get('/socios/v1/peliculas', (req, res) => {
  if (peliculas.length > 0) {
    res.status(200).json({
      estado: 1,
      mensaje: "Lista de películas",
      peliculas: peliculas
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "No se encontraron películas",
      peliculas: []
    });
  }
});

app.get('/socios/v1/peliculas/:id', (req, res) => {
  const peliculaId = parseInt(req.params.id);
  const peliculaEncontrada = peliculas.find(pelicula => pelicula.id === peliculaId);

  if (peliculaEncontrada) {
    res.status(200).json({
      estado: 1,
      mensaje: "Película encontrada",
      pelicula: peliculaEncontrada
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "Película no encontrada",
      pelicula: null
    });
  }
});

app.post('/socios/v1/peliculas', (req, res) => {
  const { titulo, director, anoLanzamiento, genero, calificacion } = req.body;
  const id = Math.round(Math.random() * 1000);

  if (!titulo || !director || !anoLanzamiento || !genero || !calificacion) {
    res.status(400).json({
      estado: 0,
      mensaje: "Faltan parámetros en la solicitud"
    });
  } else {
    const pelicula = {
      id: id,
      titulo: titulo,
      director: director,
      anoLanzamiento: anoLanzamiento,
      genero: genero,
      calificacion: calificacion
    };

    peliculas.push(pelicula);

    res.status(201).json({
      estado: 1,
      mensaje: "Película creada",
      pelicula: pelicula
    });
  }
});

app.put('/socios/v1/peliculas/:id', (req, res) => {
  const peliculaId = parseInt(req.params.id);
  const { titulo, director, anoLanzamiento, genero, calificacion } = req.body;

  if (!titulo || !director || !anoLanzamiento || !genero || !calificacion) {
    res.status(400).json({
      estado: 0,
      mensaje: "Faltan parámetros en la solicitud"
    });
  } else {
    const indiceActualizar = peliculas.findIndex(pelicula => pelicula.id === peliculaId);

    if (indiceActualizar !== -1) {
      peliculas[indiceActualizar] = {
        id: peliculaId,
        titulo: titulo,
        director: director,
        anoLanzamiento: anoLanzamiento,
        genero: genero,
        calificacion: calificacion
      };

      res.status(200).json({
        estado: 1,
        mensaje: "Película actualizada",
        pelicula: peliculas[indiceActualizar]
      });
    } else {
      res.status(404).json({
        estado: 0,
        mensaje: "Película no encontrada"
      });
    }
  }
});

app.delete('/socios/v1/peliculas/:id', (req, res) => {
  const peliculaId = parseInt(req.params.id);
  const indiceEliminar = peliculas.findIndex(pelicula => pelicula.id === peliculaId);

  if (indiceEliminar !== -1) {
    peliculas.splice(indiceEliminar, 1);

    res.status(200).json({
      estado: 1,
      mensaje: "Película eliminada con éxito"
    });
  } else {
    res.status(404).json({
      estado: 0,
      mensaje: "Película no encontrada"
    });
  }
});



app.listen(puerto, () => {
  console.log('Servidor corriendo en el puerto:', puerto);
});
