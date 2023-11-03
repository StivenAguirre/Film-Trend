document.addEventListener("DOMContentLoaded", () => {

    const API_KEY = "d62e671e72a3270f6005a951e144404c"; // Reemplaza con tu clave de API de TMDb
    const API_URL = "https://api.themoviedb.org/3";
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
    const movieListContainer = document.getElementById("movie-list");
    const movieLibraryListContainer = document.getElementById("library-list");
    const movieQueveListContainer = document.getElementById("queve-list");


  
    
    const moviesPerPage = 9; // Cantidad de películas por página
    let currentPage = 1; // Página actual
  
    let movieIdCounter = 0;
    
    const shownMovies = new Set();

//Array para watched
    let selectedMovies = JSON.parse(localStorage.getItem("selectedMovies")) || [];
    //Array para queve
    let selectedQueveMovies = JSON.parse(localStorage.getItem("selectedQueveMovies")) || [];
    async function fetchPopularMovies() {
      try {
        const response = await fetch(`${API_URL}/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
  
        // Mostrar las películas populares
        data.results.slice(0, moviesPerPage).forEach(async (movie) => {

          const movieContainer = document.createElement("div");
          movieContainer.id = "btn-open-modal"
          movieContainer.style.width = "274px"
          movieContainer.style.height = "480px"
          movieContainer.style.marginBottom = "-70px"
          movieContainer.style.marginTop = "100px"
          movieContainer.style.marginLeft = "40px"

          //Modal para cada div
          const modalDiv = document.createElement("div"); 
        modalDiv.style.display = "none";
        modalDiv.classList.add("movie-modal__movie-close");
        modalDiv.style.width = "800px"
        modalDiv.style.height = "480px"
        modalDiv.style.position = "fixed";
  modalDiv.style.top = "50%"; 
  modalDiv.style.left = "50%"; 
  modalDiv.style.transform = "translate(-50%, -50%)"; 
  modalDiv.style.backgroundColor = "white"

  modalDiv.classList.add("movie-modal");

  const movieImage = document.createElement("img");
movieImage.src = IMAGE_BASE_URL + movie.poster_path;
movieImage.alt = movie.title;
movieImage.style.borderRadius = "5px";
movieImage.style.maxWidth = "300px";
movieImage.style.height = "auto";


modalDiv.appendChild(movieImage);

const btnCerrarModal = document.createElement("button");
btnCerrarModal.textContent = "Cerrar Modal";
btnCerrarModal.addEventListener('click', () => {
  modalDiv.style.display = "none";

  modalDiv.classList.add("movie-close");
});

const btnAbrirModal = movieContainer;
btnAbrirModal.addEventListener('click', () => {

  modalDiv.style.display = "block";

  modalDiv.classList.remove("movie-close");
});

  // Crear botones "Add Watched" y "Add Queue" en el modal
  const btnAddWatched = document.createElement("button");
  btnAddWatched.textContent = "Add Watched";
  const btnAddQueue = document.createElement("button");
  btnAddQueue.textContent = "Add Queue";

  modalDiv.appendChild(btnAddWatched);
  modalDiv.appendChild(btnAddQueue);
  modalDiv.appendChild(btnCerrarModal)
  movieContainer.appendChild(modalDiv)


        const description = document.createElement("p");
        description.textContent = movie.overview;
        modalDiv.appendChild(description);

          const image = document.createElement("img");
          image.src = IMAGE_BASE_URL + movie.poster_path;
          image.alt = movie.title;
          image.style.borderRadius = "5px"

  
          const title = document.createElement("h2");
          title.textContent = movie.title;
          title.style.color = "black";
          title.style.fontFamily = "Roboto";
          title.style.fontWeight = "500px";
          title.style.fontSize = "15px"

          const divcontainerPreInfo = document.createElement("div")
          divcontainerPreInfo.style.display = "flex"
          divcontainerPreInfo.style.justifyContent = "space-betwen"

          const genre = document.createElement("p");
          const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
          const genresData = await genresResponse.json();
          const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
          genre.textContent = `${genreNames}     |`;
          genre.style.color = "rgba(255, 107, 1, 1)";
          genre.style.fontFamily = "Roboto";
          genre.style.fontWeight = "500px";
          genre.style.fontSize = "15px"

          const releaseYear = document.createElement("p");
          const releaseDate = new Date(movie.release_date);
          releaseYear.textContent = `${releaseDate.getFullYear()}`;
          releaseYear.style.color = "rgba(255, 107, 1, 1)";
          releaseYear.style.fontFamily = "Roboto";
          releaseYear.style.fontWeight = "500px";
          releaseYear.style.fontSize = "15px"
          releaseYear.style.marginLeft = "5px"
          releaseYear.style.marginRight = "5px"

          const containerRatingOrange = document.createElement("div");
          containerRatingOrange.style.backgroundColor = "rgba(255, 107, 1, 1)";
          containerRatingOrange.style.width = "36px";
          containerRatingOrange.style.height = "16px";
          containerRatingOrange.style.borderRadius = "5px";
          
          const rating = document.createElement("p");
          rating.textContent = `${movie.vote_average}`;
          rating.style.color = "white";
          rating.style.fontFamily = "Roboto";
          rating.style.fontWeight = "500px";
          rating.style.fontSize = "13px"
          rating.style.textAlign = "center"

          
          movieContainer.appendChild(image);
          movieContainer.appendChild(title);
          movieContainer.appendChild(divcontainerPreInfo)
          divcontainerPreInfo.appendChild(genre);
          divcontainerPreInfo.appendChild(releaseYear);
          divcontainerPreInfo.appendChild(containerRatingOrange)
          containerRatingOrange.appendChild(rating)
        
          



  btnAddWatched.addEventListener("click", async () => {
    try {
      const genresResponse = await fetch(`${API_URL}/movie/${movie.id}?api_key=${API_KEY}`);
      const genresData = await genresResponse.json();
      const genreNames = genresData.genres.map((genre) => genre.name).join(", ");
      const selectedMovie = {
        title: movie.title,
        poster_path: IMAGE_BASE_URL + movie.poster_path,
        genres: genreNames,
        rating: movie.vote_average || "No disponible" ,
        releaseYear: releaseDate.getFullYear(),
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
      const selectedQueveMovie = {
        title: movie.title,
        poster_path: IMAGE_BASE_URL + movie.poster_path,
        genres: genreNames,
        rating: movie.vote_average , 
        releaseYear: releaseDate.getFullYear(),

      };
      const existingQueveMovies = JSON.parse(localStorage.getItem("selectedQueveMovies")) || [];
      existingQueveMovies.push(selectedQueveMovie);
      console.log("Película seleccionada:", selectedQueveMovie);
      console.log("Películas seleccionadas:", existingQueveMovies);
      localStorage.setItem("selectedQueveMovies", JSON.stringify(existingQueveMovies));
    } catch (error) {
      console.log("Error al obtener géneros:", error);
    }
  });

  movieListContainer.appendChild(movieContainer);
});
} catch (error) {
console.log("Error al obtener películas populares:", error);
}
}

fetchPopularMovies(currentPage);

async function moveMoviesToLibrary() {
  try {
    for (const selectedMovie of selectedMovies) {
      const movieElement = createMovieElement(selectedMovie);
      movieLibraryListContainer.appendChild(movieElement);
    }
  } catch (error) {
    console.error("Error al obtener películas seleccionadas:", error);
  }
}

async function moveMoviesToQueue() {
  try {
    for (const selectedMovie of selectedQueveMovies) {
      const movieElement = createMovieElement(selectedMovie);
      movieQueveListContainer.appendChild(movieElement); 
    }
  } catch (error) {
    console.error("Error al obtener películas seleccionadas:", error);
  }
}

function createMovieElement(movie) {
  const movieContainer = document.createElement("div");
  movieContainer.classList.add("movie"); 

  // Crea una imagen de la película
  const image = document.createElement("img");
  image.src = movie.poster_path; 
  image.alt = movie.title;

  // Crea un título para la película
  const title = document.createElement("h2");
  title.textContent = movie.title;

  const genres = document.createElement("p");
  genres.textContent = `${movie.genres}`;
  
  const releaseYear = document.createElement("p");
  releaseYear.textContent = `${movie.releaseYear}`;

  const rating = document.createElement("p");
  rating.textContent = `${movie.rating}`;

  movieContainer.appendChild(image);
  movieContainer.appendChild(title);
  movieContainer.appendChild(genres);
  movieContainer.appendChild(rating);
  movieContainer.appendChild(releaseYear);

  const watchedBtn = document.querySelector(".library-container__button--active");
    const queueBtn = document.querySelector(".queve-container__button--transparent");
    queueBtn.style.backgroundColor = "transparent"
      queueBtn.style.color = "white";
      queueBtn.style.border = "none"; 
      queueBtn.style.cursor= "pointer"
      queueBtn.style.borderRadius= "5px"
    
    queueBtn.addEventListener("click", () => {
      watchedBtn.style.backgroundColor = "transparent";
      movieLibraryListContainer.style.display = "none"
      movieQueveListContainer.style.display= "block" 
      queueBtn.style.backgroundColor = "var(--main-button-background)"

    });

    watchedBtn.addEventListener("click", () => {
      watchedBtn.style.backgroundColor = "var(--main-button-background)";
      movieLibraryListContainer.style.display = "block"
      movieQueveListContainer.style.display= "none" 
      queueBtn.style.backgroundColor = "transparent"

    });

  return movieContainer; 
}
moveMoviesToLibrary();
moveMoviesToQueue()

    });
  
    
// Boton my library 
const btnMyLibrary = document.querySelector('.my-library-btn');
const conteinerLibrarySearch = document.querySelector(
  '.search-container'
);


// btnMyLibrary.addEventListener('click', event => {
 //   event.preventDefault();
 //   conteinerLibrarySearch.innerHTML = '';
 //   const wachedBtn = document.createElement('button');
 //   const queveBtn = document.createElement('button');
 //   wachedBtn.textContent = 'WATCHED';
 //   queveBtn.textContent = 'QUEVE';
//    wachedBtn.classList.add("library-container__button--active");
 //   queveBtn.classList.add('library-container__button--transparent');
 //   conteinerLibrarySearch.classList.add('library-container__button')
//    conteinerLibrarySearch.append(wachedBtn, queveBtn);
//

// });

const apiKey = "d62e671e72a3270f6005a951e144404c"
function showMovieModal(movieId) {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
    });

}


const config = {
  headers: {
    'accept': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjJlNjcxZTcyYTMyNzBmNjAwNWE5NTFlMTQ0NDA0YyIsInN1YiI6IjY1MzliYWFkMDkxZTYyMDBhY2JjZmIxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kl2esxdpMndC8Ncdl_j46puXA1C37-yIPMFWbeO-_d4' // Cambio aquí
  }
};

let page = 1;

function moviesPopularies(){
  fetch(`https://api.themoviedb.org/3/trending/all/day?page=${page}&language=en-US`, config)
  .then(response => response.json())
  .then(data => console.log(data));
  
}

let search = "batman";
page = 1;
fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, config) // Cambio aquí
  .then(response => response.json())
  .then(data => console.log(data.results.map(d => d.title + " " + d.release_date)));

let movieID = 2661;
fetch(`https://api.themoviedb.org/3/movie/${movieID}`, config)
  .then(response => response.json())
  .then(data => console.log(data));





//modal
