const searchForm=document.getElementById("searchForm");
const searchInput=document.getElementById("searchInput");
const movieContainer=document.getElementById("movieContainer");
const message=document.getElementById("message");
const movieModal=document.getElementById("movieModal");
const closeModal=document.getElementById("closeModal");
const modalPoster=document.getElementById("modalPoster");
const modalTitle=document.getElementById("modalTitle");
const modalYear=document.getElementById("modalYear");
const modalGenre=document.getElementById("modalGenre");
const modalRating=document.getElementById("modalRating");
const modalDescription=document.getElementById("modalDescription");

const placeholder="https://via.placeholder.com/300x450?text=No+Poster";

async function searchMovies(movieName){
  const response=await fetch(`/.netlify/functions/movies?search=${encodeURIComponent(movieName)}`);
  const data=await response.json();
  if(!response.ok) throw new Error(data.error||"Unable to fetch movies.");
  return data;
}

function displayMovies(movies){
  movieContainer.innerHTML="";
  movies.forEach(movie=>{
    const card=document.createElement("div");
    card.className="movie-card";
    const poster=movie.Poster&&movie.Poster!=="N/A"?movie.Poster:placeholder;
    card.innerHTML=`
      <img src="${poster}" alt="${movie.Title}">
      <div class="movie-info">
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year||"N/A"}</p>
        <p>Genre: ${movie.Genre||"N/A"}</p>
        <p>Rating: ${movie.imdbRating||"N/A"}</p>
      </div>`;
    card.addEventListener("click",()=>showMovieDetails(movie));
    movieContainer.appendChild(card);
  });
}

function showMovieDetails(movie){
  modalPoster.src=movie.Poster&&movie.Poster!=="N/A"?movie.Poster:placeholder;
  modalPoster.alt=movie.Title;
  modalTitle.textContent=movie.Title;
  modalYear.textContent=movie.Year||"N/A";
  modalGenre.textContent=movie.Genre||"N/A";
  modalRating.textContent=movie.imdbRating||"N/A";
  modalDescription.textContent=movie.Plot||"No description available.";
  movieModal.style.display="flex";
}

async function performSearch(){
  const movieName=searchInput.value.trim();
  if(!movieName){message.textContent="Please enter a movie name.";return}
  movieContainer.innerHTML="";
  message.textContent="Searching...";
  try{
    const movies=await searchMovies(movieName);
    displayMovies(movies);
    message.textContent=`${movies.length} movie(s) found.`;
  }catch(error){message.textContent=error.message}
}

searchForm.addEventListener("submit",e=>{e.preventDefault();performSearch()});
closeModal.addEventListener("click",()=>movieModal.style.display="none");
movieModal.addEventListener("click",e=>{if(e.target===movieModal)movieModal.style.display="none"});
