// const btnAnterior = document.getElementById("btnAnterior");
// const btnSiguiente = document.getElementById("btnSiguiente");

// btnSiguiente.addEventListener("click", () => {
//   if (pagina < 1000) {
//     pagina += 1;
//     cargarPeliculas();
//   }
// });

// btnAnterior.addEventListener("click", () => {
//   if (pagina > 1) {
//     pagina -= 1;
//     cargarPeliculas();
//   }
// });

const config = {
  method: 'GET',
  headers: {
    acept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDQyZjMyNzJjYTFlYjNiNGI3ZDRmNWFiMWM3ODM5NSIsInN1YiI6IjY1M2JkYzQ0NTE5YmJiMDBhYjY3ZjQ5MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZdRUQjb9-DY8AyhMD0SDqobbkCdjsypQYZLLH6ipmIU',
  },
};

let page = 1;

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/trednding/all/?page=${page}&language=en-us`,
      config
    );

    console.log(respuesta);

    if (datos.status === 200) {
      const datos = await respuesta.json();

      let peliculas = '';
      datos.results.forEach(pelicula => {
        peliculas =
          peliculas +
          `
        <div class="">
        <img class="" src="https://api.themoviedb.org/3/collection/images">
        </div>
        <h3 class="">${pelicula.title}</h3>`;
      });

      document.querySelector('.user-list').innerHTML = peliculas;
    } else if (datos.status === 401) {
      console.log('se copio mal la llave');
    } else if (datos.status === 404) {
      console.log('la pelicula no existe');
    } else {
      console.log('no se sabe cual es el error');
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
