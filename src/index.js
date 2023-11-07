
document.addEventListener("DOMContentLoaded", (e) => {
  const API_KEY = "d62e671e72a3270f6005a951e144404c"; // Reemplaza con tu clave de API de TMDb
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  e.preventDefault();
  
  // Elemento donde se mostrarán las películas
  const movieListContainer = document.getElementById("movie-list");
  const paginationNumbers = document.getElementById("pagination-numbers");
  let currentPage = 1;
  let totalPages = 0;
  let movieList = [];

  async function fetchPopularMovies(page) {
      try {
          const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
          const data = await response.json();
          movieListContainer.innerHTML = "";
          movieList = [];

          data.results.forEach(async (movie) => {
              if (!movieList.some(item => item.id === movie.id)) {
                  const movieContainer = document.createElement("div");
                  movieContainer.classList.add("movie");

                  const image = document.createElement("img");
                  image.src = IMAGE_BASE_URL + movie.poster_path;
                  image.alt = movie.title;

                  const title = document.createElement("h2");
                  title.textContent = movie.title;

                  const genre = document.createElement("p");
                  const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
                  const genresData = await genresResponse.json();
                  const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
                  genre.textContent = `${genreNames}`;

                  movieContainer.appendChild(image);
                  movieContainer.appendChild(title);
                  movieContainer.appendChild(genre);
                  movieListContainer.appendChild(movieContainer);

                  movieList.push(movie);
              }
          });

          totalPages = data.total_pages;
          buildPagination();
      } catch (error) {
          console.error("Error al obtener películas populares:", error);
      }
  }

  function buildPagination() {
      paginationNumbers.innerHTML = "";
      const maxPages = Math.min(totalPages, 5);

      for (let i = 1; i <= maxPages; i++) {
          const button = document.createElement("button");
          button.classList.add("pagination-number");
          button.textContent = i;
          if (i === currentPage) {
              button.classList.add("active");
          }
          button.addEventListener("click", () => {
              currentPage = i;
              fetchPopularMovies(currentPage);
          });
          paginationNumbers.appendChild(button);
      }

      if (totalPages > 5) {
          const dots = document.createElement("span");
          dots.textContent = "...";
          paginationNumbers.appendChild(dots);
      }
  }

  fetchPopularMovies(currentPage);

  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
          currentPage--;
          fetchPopularMovies(currentPage);
      }
  });

  nextButton.addEventListener("click", () => {
      if (currentPage < totalPages) {
          currentPage++;
          fetchPopularMovies(currentPage);
      }
  });
});

// const API_KEY = "d62e671e72a3270f6005a951e144404c";
// const API_URL = "https://api.themoviedb.org/3";
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// const movieListContainer = document.getElementById("movie-list");
//   movieListContainer.style.display = "flex";
//   movieListContainer.style.flexWrap = "wrap";
//   movieListContainer.style.justifyContent = "center";

// const moviesPerPage = 9;
// let currentPage = 1;

// const moviesShown = new Set(); // Usaremos un Set para evitar repeticiones

// async function fetchPopularMovies() {
//   try {
//     const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
//     const data = await response.json();

//     data.results.slice(0, moviesPerPage).forEach(async (movie) => {
//       const movieId = movie.id;

//       if (!moviesShown.has(movieId)) {
//         const movieContainer = document.createElement("div");
//         movieContainer.id = `movie-${movie.id}`;
//         movieContainer.classList.add("movie");
//         movieContainer.style.width = "274px";
//         movieContainer.style.height = "480px";
//         movieContainer.style.marginBottom = "-70px";
//         movieContainer.style.marginTop = "100px";
//         movieContainer.style.marginLeft = "40px";

//         const image = document.createElement("img");
//         image.src = IMAGE_BASE_URL + movie.poster_path;
//         image.alt = movie.title;
//         image.style.borderRadius = "5px";

//         const title = document.createElement("h2");
//         title.textContent = movie.title;
//         title.style.color = "black";
//         title.style.fontFamily = "Roboto";
//         title.style.fontWeight = "500px";
//         title.style.fontSize = "15px";

//         const divcontainerPreInfo = document.createElement("div");
//         divcontainerPreInfo.style.display = "flex";

//         const genre = document.createElement("p");
//         const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
//         const genresData = await genresResponse.json();
//         const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
//         genre.textContent = `${genreNames}     |`;
//         genre.style.color = "rgba(255, 107, 1, 1)";
//         genre.style.fontFamily = "Roboto";
//         genre.style.fontWeight = "500px";
//         genre.style.fontSize = "15px";

//         const releaseYear = document.createElement("p");
//         const releaseDate = new Date(movie.release_date);
//         releaseYear.textContent = `${releaseDate.getFullYear()}`;
//         releaseYear.style.color = "rgba(255, 107, 1, 1)";
//         releaseYear.style.fontFamily = "Roboto";
//         releaseYear.style.fontWeight = "500px";
//         releaseYear.style.fontSize = "15px";
//         releaseYear.style.marginLeft = "5px";
//         releaseYear.style.marginRight = "5px";

//         const containerRatingOrange = document.createElement("div");
//         containerRatingOrange.style.backgroundColor = "rgba(255, 107, 1, 1)";
//         containerRatingOrange.style.width = "36px";
//         containerRatingOrange.style.height = "16px";
//         containerRatingOrange.style.borderRadius = "5px";

//         const rating = document.createElement("p");
//         rating.textContent = `${movie.vote_average}`;
//         rating.style.color = "white";
//         rating.style.fontFamily = "Roboto";
//         rating.style.fontWeight = "500px";
//         rating.style.fontSize = "13px";
//         rating.style.textAlign = "center";

//         movieListContainer.appendChild(movieContainer);
//         movieContainer.appendChild(image);
//         movieContainer.appendChild(title);
//         movieContainer.appendChild(divcontainerPreInfo);
//         divcontainerPreInfo.appendChild(genre);
//         divcontainerPreInfo.appendChild(releaseYear);
//         divcontainerPreInfo.appendChild(containerRatingOrange);
//         containerRatingOrange.appendChild(rating);

//         const btnAbrirModal = movieContainer;
//         const btnCerrarModal = document.getElementById("btn-close-modal");
//         const modal = document.querySelector('#modal');

//         btnAbrirModal.addEventListener('click', () => {
//           modal.showModal();
//         });

//         btnCerrarModal.addEventListener('click', () => {
//           modal.close();
//         });
//       }
//     });
//     } catch (error) {
//       console.log("Error al obtener películas populares:", error);
//     }
// }
  
// fetchPopularMovies(currentPage);

// Boton my library 
import atributosMovies from "./atributosMovies";

document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "d62e671e72a3270f6005a951e144404c";
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const movieListContainer = document.getElementById("movie-list");
  const paginationNumbers = document.getElementById("pagination-numbers");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");

  let currentPage = 1;
  const moviesPerPage = 9;
  let totalMovies = 0;
  let totalPages = 0;

  let selectedMovies = JSON.parse(localStorage.getItem("selectedMovies")) || [];
  // Array para la cola
  let selectedQueueMovies = JSON.parse(localStorage.getItem("selectedQueueMovies")) || [];

  async function fetchPopularMovies(page) {
    try {
      const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      movieListContainer.innerHTML = "";

      if (page === 1) {
        totalMovies = data.total_results;
        totalPages = Math.ceil(totalMovies / moviesPerPage);
      }

      const startIndex = (page - 1) * moviesPerPage;
      const endIndex = startIndex + moviesPerPage;

      data.results.slice(startIndex, endIndex).forEach(async (movie) => {
        await atributosMovies(movie, API_URL, API_KEY, IMAGE_BASE_URL, movieListContainer);

        const btnAddWatched = document.getElementById("addToWatched");
        const btnAddQueue = document.getElementById("addToQueue");
        
        btnAddWatched.addEventListener("click", async () => {
          try {
            const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
            const genresData = await genresResponse.json();
            const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
            const selectedMovie = {
              title: movie.title,
              poster_path: IMAGE_BASE_URL + movie.poster_path,
              genres: genreNames,
              rating: movie.vote_average || "No disponible",
            };
            selectedMovies.push(selectedMovie);
            console.log("Película seleccionada:", selectedMovie);
            console.log("Películas seleccionadas:", selectedMovies);
            localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies));
          } catch (error) {
            console.log("Error al obtener géneros:", error);
          }
        });

        btnAddQueue.addEventListener("click", async () => {
          try {
            const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
            const genresData = await genresResponse.json();
            const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
            const selectedQueueMovie = {
              title: movie.title,
              poster_path: IMAGE_BASE_URL + movie.poster_path,
              genres: genreNames,
              rating: movie.vote_average,
            };
            const existingQueueMovies = JSON.parse(localStorage.getItem("selectedQueueMovies")) || [];
            existingQueueMovies.push(selectedQueueMovie);
            console.log("Película seleccionada:", selectedQueueMovie);
            console.log("Películas seleccionadas:", existingQueueMovies);
            localStorage.setItem("selectedQueueMovies", JSON.stringify(existingQueueMovies));
          } catch (error) {
            console.log("Error al obtener géneros:", error);
          }
        });
      });

      // Actualizar la paginación
      paginationNumbers.innerHTML = "";
      const maxPages = Math.min(totalPages, 5);

      for (let i = 1; i <= maxPages; i++) {
        const button = document.createElement("button");
        button.classList.add("pagination-number");
        button.textContent = i;
        if (i === currentPage) {
          button.classList.add("active");
        }
        button.addEventListener("click", () => {
          currentPage = i;
          fetchPopularMovies(currentPage);
        });
        paginationNumbers.appendChild(button);
      }

      if (totalPages > 20) {
        const dots = document.createElement("span");
        dots.textContent = "...";
        paginationNumbers.appendChild(dots);
      }

      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === totalPages;

    } catch (error) {
      console.error("Error al obtener películas populares:", error);
    }
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      fetchPopularMovies(currentPage);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      fetchPopularMovies(currentPage);
    }
  });

  fetchPopularMovies(currentPage);
});

const btnMyLibrary = document.querySelector('.my-library-btn');
const containerLibrarySearch = document.querySelector('.search-container');

btnMyLibrary.addEventListener('click', event => {
  event.preventDefault();
  containerLibrarySearch.innerHTML = '';
  const watchedBtn = document.createElement('button');
  const queueBtn = document.createElement('button');
  watchedBtn.textContent = 'WATCHED';
  queueBtn.textContent = 'QUEUE';
  watchedBtn.classList.add("library-container__button--active");
  queueBtn.classList.add('library-container__button--transparent');
  containerLibrarySearch.classList.add('library-container__button');
  containerLibrarySearch.append(watchedBtn, queueBtn);
});

// BUSQUEDA DE PELÍCULAS POR NOMBRE

const searchInputBusqueda = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const apiKey = "d62e671e72a3270f6005a951e144404c"
function showMovieModal(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });
}

searchButton.addEventListener("click", (e) => {
  if (searchInputBusqueda.value === "") {
    e.preventDefault();
  } else {
    const searchTerm = searchInputBusqueda.value;
    searchMoviesByTitle(searchTerm);
  }
});

async function searchMoviesByTitle(searchTerm) {
  const API_KEY = "d62e671e72a3270f6005a951e144404c";
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const movieListContainer = document.getElementById("movie-list");

  try {
    const response = await fetch(
      `${API_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}&include_adult=false&language=en-US`
    );
    const data = await response.json();
    movieListContainer.innerHTML = "";

    data.results.forEach(async (movie) => {
      await atributosMovies(movie, API_URL, API_KEY, IMAGE_BASE_URL, movieListContainer);
    });
  } catch (error) {
    console.error("Error al buscar películas por título:", error);
  }
};
