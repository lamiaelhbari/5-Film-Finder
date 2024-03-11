/*The objective of this challenge is to create a movie discovery app that recommends
 random movies by genre. Users will be able to select from various genres, and indicate
  their preference by liking or disliking a movie to receive another suggestion */

// Populate Drop-down Menu with Genres :
/*Before getting started, you'll need to retrieve the API key from The Movie Database
 website, TMDB :  */
// 1 :
const tmdbKey = " Enter your key here ";
// 2 :
const tmdbBaseUrl = "https://api.themoviedb.org/3";
const playBtn = document.getElementById("playBtn");

//  getGenres :
// 6 :
const getGenres = async () => {
  // 3 :
  const genreRequestEndpoint = "/genre/movie/list";
  // 4 :
  const requestParams = `?api_key=${tmdbKey}`;
  // 5 :
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  // 7 fetch data :
  try {
    // 8 :
    const response = await fetch(urlToFetch);
    // 9 :
    if (response.ok) {
      // 10 :
      const jsonResponse = await response.json();

      /* 11- 1- Check the content of jsonResponse:
             2- Log genres to the console to verify its content:
             3- Return the genres for future use if needed:*/
      console.log(jsonResponse);
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    }
  } catch (error) {
    console.log(error);
  }
};
// 12 :
getGenres(genres);

// Get a Random Movie :

// 33- Adding pageNumber :
const getMovies = async (pageNumber) => {
  console.log(pageNumber); //To view the page number.
  const selectedGenre = getSelectedGenre();
  // 13 :
  const discoverMovieEndpoint = `/discover/movie`;
  // 14 :
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}?page=${pageNumber}`;
  // 15 :
  try {
    const response = await fetch(urlToFetch);
    // 16 :
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      // 17 :
      const movies = jsonResponse.results;
      console.log(movies);
      return movies;
    }
  } catch (error) {
    console.log(error);
  }
};

getMovies(2);

// Get Movie Info :

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  // 18 :
  const movieEndpoint = `/movie/${movieId}`;
  // 19 :
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  // 20 :
  try {
    const response = await fetch(urlToFetch);
    // 21 :
    if (response.ok) {
      const movieInfo = await response.json();
      console.log(movieInfo);
      // 22 :
      return movieInfo;
    }
  } catch (error) {
    console.log(error);
  }
};
// getMovieInfo();

// Display Movie :
// Gets a list of movies and ultimately displays the info of a random movie from the list

// 23 :
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  // 24- Call getMovies() and await its resolution :
  const movies = await getMovies();
  // 25 :
  const randomMovie = getRandomMovie(movies);
  // 26 :
  const info = await getMovieInfo(randomMovie);
  // 27 :

  displayMovie(info);
};
showRandomMovie();
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
