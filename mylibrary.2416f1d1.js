document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".library-container__button--active");e.addEventListener("click",()=>{window.location.href="watched.html"})}),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("watched-container");for(let t=0;t<localStorage.length;t++){let n=localStorage.key(t);if(n.startsWith("watchedMovie-")){let t=JSON.parse(localStorage.getItem(n)),a=document.createElement("div");a.classList.add("movie"),// Aquí puedes agregar lógica adicional para mostrar las películas como lo deseas
// Por ejemplo, puedes crear elementos HTML para mostrar la información de las películas.
a.innerHTML=`
              <img src="${t.poster_path}" alt="${t.title}">
              <h2>${t.title}</h2>
              <p>Genres: ${t.genres}</p>
              <p>Rating: ${t.rating}</p>
            `,e.appendChild(a)}}});//# sourceMappingURL=mylibrary.2416f1d1.js.map

//# sourceMappingURL=mylibrary.2416f1d1.js.map
