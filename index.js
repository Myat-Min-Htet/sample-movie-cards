const API_URL="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1"

const IMG_PATH="https://image.tmdb.org/t/p/w1280"
const SEARCH_API='https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
getMovies(API_URL);
async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();

  showMovies(data.results);
}
function showMovies(movies){
    main.innerHTML="";

    movies.forEach((movie) => {
        const {original_title , poster_path, vote_average, overview } = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <div class="movie">
            <img src="${IMG_PATH + poster_path}" alt="${original_title}">
            <div class="movieInfo" >
          <h3>${original_title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        </div>
        `
        main.appendChild(movieEl);
    
   });
        
}
function getClassByRate(vote_average) {
    if(vote_average >= 8) {
        return 'green'
    } else if(vote_average >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchTerm = search.value
    if(searchTerm && searchTerm !==''){
        getMovies(SEARCH_API + searchTerm)
        search.value=''
    }else{
        window.location.reload()
    }
})