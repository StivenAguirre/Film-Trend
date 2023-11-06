!function(){async function e(e,t,n,a,l){let o=document.createElement("div");o.id=`movie-${e.id}`,o.classList.add("movie"),o.style.width="430px",o.style.height="305px",o.style.marginBottom="425px",o.style.marginTop="20px",o.style.marginLeft="50px",o.style.transition="transform 0.3s ease-in-out",o.addEventListener("mouseenter",()=>{o.style.transform="scale(0.9)"}),o.addEventListener("mouseleave",()=>{o.style.transform="scale(1)"});let i=document.createElement("img");i.src=a+e.poster_path,i.alt=e.title,i.style.borderRadius="5px";let s=document.createElement("h2");s.textContent=e.title,s.style.color="black",s.style.fontFamily="Roboto",s.style.fontWeight="500",s.style.fontSize="15px";let r=document.createElement("div");r.style.display="flex";let c=document.createElement("p"),d=await fetch(`${t}/movie/${e.id}?api_key=${n}`),p=await d.json(),m=p.genres.map(e=>e.name).join(", ");c.textContent=`${m}     |`,c.style.color="rgba(255, 107, 1, 1)",c.style.fontFamily="Roboto",c.style.fontWeight="500",c.style.fontSize="15px";let u=document.createElement("p"),y=new Date(e.release_date);u.textContent=`${y.getFullYear()}`,u.style.color="rgba(255, 107, 1, 1)",u.style.fontFamily="Roboto",u.style.fontWeight="500",u.style.fontSize="15px",u.style.marginLeft="5px",u.style.marginRight="5px";let g=document.createElement("div");g.style.backgroundColor="rgba(255, 107, 1, 1)",g.style.width="36px",g.style.height="16px",g.style.borderRadius="5px";let h=document.createElement("p");h.textContent=`${e.vote_average}`,h.style.color="white",h.style.fontFamily="Roboto",h.style.fontWeight="500",h.style.fontSize="13px",h.style.textAlign="center",o.appendChild(i),o.appendChild(s),o.appendChild(r),r.appendChild(c),r.appendChild(u),r.appendChild(g),g.appendChild(h);let v=document.getElementById("btn-close-modal"),f=document.querySelector("#modal");o.addEventListener("click",()=>{f.showModal(),document.getElementById("add-movies-modal");let l=e.id,o=`${t}/movie/${l}?api_key=${n}`;fetch(o).then(e=>e.json()).then(e=>{let t=document.querySelector(".contenedor-add-modal-1");t.innerHTML="";let n=document.querySelector(".title-description-movies");n.textContent=e.title;let l=document.createElement("img");l.src=a+e.poster_path,l.alt=e.title,t.appendChild(l);let o=document.querySelector(".container-preInfo-valor");o.innerHTML=`
            <p class="preinfo-valor"> <span class="date-average">${e.vote_average}</span> / ${e.vote_count}</p>
            <p class="preinfo-valor">${e.popularity}</p>
            <p class="preinfo-valor">${e.original_title}</p>
            <p class="preinfo-valor">${e.genres.map(e=>e.name).join(", ")}</p>`;let i=document.querySelector(".description");i.textContent=e.overview})}),v.addEventListener("click",()=>{f.close()}),l.appendChild(o)}document.addEventListener("DOMContentLoaded",()=>{let t="d62e671e72a3270f6005a951e144404c",n="https://api.themoviedb.org/3",a="https://image.tmdb.org/t/p/w500",l=document.getElementById("movie-list"),o=document.getElementById("pagination-numbers"),i=document.getElementById("prev-button"),s=document.getElementById("next-button"),r=1,c=0,d=0,p=JSON.parse(localStorage.getItem("selectedMovies"))||[];async function m(u){try{let y=await fetch(`${n}/movie/popular?api_key=${t}&page=${u}`),g=await y.json();l.innerHTML="",1===u&&(c=g.total_results,d=Math.ceil(c/9));let h=(u-1)*9;g.results.slice(h,h+9).forEach(async o=>{await e(o,n,t,a,l);let i=document.getElementById("addToWatched"),s=document.getElementById("addToQueue");i.addEventListener("click",async()=>{try{let e=await fetch(`${n}/movie/${o.id}?api_key=${t}`),l=await e.json(),i=l.genres.map(e=>e.name).join(", "),s={title:o.title,poster_path:a+o.poster_path,genres:i,rating:o.vote_average||"No disponible"};p.push(s),console.log("Pel\xedcula seleccionada:",s),console.log("Pel\xedculas seleccionadas:",p),localStorage.setItem("selectedMovies",JSON.stringify(p))}catch(e){console.log("Error al obtener g\xe9neros:",e)}}),s.addEventListener("click",async()=>{try{let e=await fetch(`${n}/movie/${o.id}?api_key=${t}`),l=await e.json(),i=l.genres.map(e=>e.name).join(", "),s={title:o.title,poster_path:a+o.poster_path,genres:i,rating:o.vote_average},r=JSON.parse(localStorage.getItem("selectedQueueMovies"))||[];r.push(s),console.log("Pel\xedcula seleccionada:",s),console.log("Pel\xedculas seleccionadas:",r),localStorage.setItem("selectedQueueMovies",JSON.stringify(r))}catch(e){console.log("Error al obtener g\xe9neros:",e)}})}),// Actualizar la paginación
o.innerHTML="";let v=Math.min(d,5);for(let e=1;e<=v;e++){let t=document.createElement("button");t.classList.add("pagination-number"),t.textContent=e,e===r&&t.classList.add("active"),t.addEventListener("click",()=>{r=e,m(r)}),o.appendChild(t)}if(d>20){let e=document.createElement("span");e.textContent="...",o.appendChild(e)}i.disabled=1===r,s.disabled=r===d}catch(e){console.error("Error al obtener pel\xedculas populares:",e)}}JSON.parse(localStorage.getItem("selectedQueueMovies")),i.addEventListener("click",()=>{r>1&&m(--r)}),s.addEventListener("click",()=>{r<d&&m(++r)}),m(r)});let t=document.querySelector(".my-library-btn"),n=document.querySelector(".search-container");t.addEventListener("click",e=>{e.preventDefault(),n.innerHTML="";let t=document.createElement("button"),a=document.createElement("button");t.textContent="WATCHED",a.textContent="QUEUE",t.classList.add("library-container__button--active"),a.classList.add("library-container__button--transparent"),n.classList.add("library-container__button"),n.append(t,a)});// BUSQUEDA DE PELÍCULAS POR NOMBRE
let a=document.getElementById("search-input"),l=document.getElementById("search-button");async function o(t){let n="d62e671e72a3270f6005a951e144404c",a="https://api.themoviedb.org/3",l=document.getElementById("movie-list");try{let o=await fetch(`${a}/search/movie?api_key=${n}&query=${t}&include_adult=false&language=en-US`),i=await o.json();l.innerHTML="",i.results.forEach(async t=>{await e(t,a,n,"https://image.tmdb.org/t/p/w500",l)})}catch(e){console.error("Error al buscar pel\xedculas por t\xedtulo:",e)}}l.addEventListener("click",e=>{if(""===a.value)e.preventDefault();else{let e=a.value;o(e)}})}();//# sourceMappingURL=index.701a7607.js.map

//# sourceMappingURL=index.701a7607.js.map
