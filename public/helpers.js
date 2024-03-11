// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
  const select = document.getElementById("genres");

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

// 28- Create HTML for movie release date :
const createMovieReleaseDate = (releaseDate) => {
  const releaseDateParagraph = document.createElement("p");
  releaseDateParagraph.setAttribute("id", "movieReleaseDate");
  releaseDateParagraph.classList.add("movie-info");
  releaseDateParagraph.innerHTML = `Release Date: ${releaseDate}`;
  return releaseDateParagraph;
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
  const selectedGenre = document.getElementById("genres").value;
  return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
  const btnDiv = document.getElementById("likeOrDislikeBtns");
  btnDiv.removeAttribute("hidden");
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";
};

// After liking a movie, clears the current movie from the screen and gets another random movie :
// 31- Store a movie as liked :
const likeMovie = (movie) => {
  // Get the liked movies from local storage or initialize an empty array :
  let likedMovies = JSON.parse(localStorage.getItem("likedMovies")) || [];
  //  Add the movie to the liked movies array :
  likedMovies.push(movie);
  //  Store the updated liked movies array back to local storage :
  localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  // Display another random movie :

  clearCurrentMovie();
  showRandomMovie();
};

// After disliking a movie, clears the current movie from the screen and gets another random movie :
//  32- Store a movie as disliked :
const dislikeMovie = (movie) => {
  let dislikedMovies = JSON.parse(localStorage.getItem("dislikedMovies")) || [];
  dislikedMovies.push(movie);
  localStorage.setItem("dislikedMovies", JSON.stringify(dislikedMovies));

  clearCurrentMovie();
  showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "moviePoster");

  return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;

  return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "movieOverview");
  overviewParagraph.classList.add("movie-info"); // 30-Ajoutez une classe
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");

  // Create HTML content containing movie info
  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);

  // Append title, poster, and overview to page
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(overviewText);

  //29- Create HTML for movie release date :
  const releaseDateText = createMovieReleaseDate(movieInfo.release_date);
  movieTextDiv.appendChild(releaseDateText);

  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};
