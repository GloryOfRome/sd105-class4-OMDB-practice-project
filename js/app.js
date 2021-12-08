// https://omdbapi.com/?apikey=1fa05dfc&i=tt3896198

const titlesWrapperEle = document.querySelector('.titles-wrapper');
const searchFormEle = document.getElementById('search');
const searchInputEle = document.querySelector('input');

// 1.get data from omdb API using fetch method instead of promise & request mothod
const getMovies = (url => {
  return fetch(url)
    .then(response => {
      // console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        console.log(response.status);
        // return Proimise.reject(response.statusText);
      }
    });
});

const getMovieByOMDBId = (omdbId => {
  return fetch(`https://www.omdbapi.com/?apikey=1fa05dfc&i=${omdbId}`)
    .then(response => {
      // console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        console.log(response.status);
        // return Proimise.reject(response.statusText);
      }
    });
});

const renderMovies = (movies => {
  // console.log(movies.Response);
  if (movies.Response === 'True') {
    movies.Search.forEach(movie => {
      const omdbID = movie.imdbID;
      const movieDetail = getMovieByOMDBId(omdbID)
      .then(movieDetail => {
        const rating = movieDetail.Ratings[0].Value;
        const plot = movieDetail.Plot;
        titlesWrapperEle.insertAdjacentHTML(
          'beforeend',
          `<div class="movie">
            <img src="${movie.Poster}" />
            <div class="overlay">
              <div class="title">${movie.Title}</div>
              <div class="rating">${rating}</div>
              <div class="plot">${plot}</div>
            </div>
          </div>
           `);
      });
    });
  } else {
    titlesWrapperEle.innerHTML = `${movies.Error}`;
  }

});

searchFormEle.addEventListener('keypress', handleSearchMovies);
// titlesWrapperEle.addEventListener('mouseover', handleShowMovieText)

function handleSearchMovies(e) {
  const searchTitle = searchInputEle.value;
  console.log(searchTitle);
  titlesWrapperEle.innerHTML = '';
  if (e.code === 'Enter' && searchTitle !== '') {
    e.preventDefault();
    console.log(e.code);
    getMovies(`https://omdbapi.com/?i=tt3896198&apikey=1fa05dfc&s=${searchTitle}`)
      .then(data => {
        console.log(data);
        renderMovies(data);
      });
  }
}

// function handleShowMovieText(e) {
//   // console.log(e.target.nodeName);
//   // if (e.target.nodeName === 'IMG') {
    
//   // }
// }

getMovies('data/movies.json')
.then(data => {
  console.log(data);
  renderMovies(data);
});



