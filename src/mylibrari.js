document.addEventListener("DOMContentLoaded", () => {
    const buttonWatched = document.querySelector(".library-container__button--active");

    buttonWatched.addEventListener("click", () => {
        window.location.href = "watched.html";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const watchedContainer = document.getElementById("watched-container");

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("watchedMovie-")) {
            const movieData = JSON.parse(localStorage.getItem(key));
            const movieContainer = document.createElement("div");
            movieContainer.classList.add("movie");
            // Aquí puedes agregar lógica adicional para mostrar las películas como lo deseas
            // Por ejemplo, puedes crear elementos HTML para mostrar la información de las películas.
            movieContainer.innerHTML = `
              <img src="${movieData.poster_path}" alt="${movieData.title}">
              <h2>${movieData.title}</h2>
              <p>Genres: ${movieData.genres}</p>
              <p>Rating: ${movieData.rating}</p>
            `;
            watchedContainer.appendChild(movieContainer);
        }
    }
});