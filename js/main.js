// main.js //
////////////

// 1.Buscador de peliculas

//  Crear un buscador de peliculas atacando a la API que contenga:
//  - Input para escribir la película
//  - Muestre las películas con:
//     - Imagen
//     - Título
//     - Descripción

// Extras
// Muestra el género de las películas


// We capture elements from the DOM
const formData = document.getElementById('formData');
const searchInput = document.getElementById('searchInput');
const sectionMovies = document.getElementById('containerMovies');
const genreSelect = document.getElementById('movieGenre');


const searchAndShowTheMovie = async (e) => {
  e.preventDefault();

  containerMovies.innerHTML = '';
  const movieSearch = searchInput.value.trim();
  const selectedGenre = genreSelect.value;
  console.log('Selected genre:', selectedGenre);

  try {
    let response;

    if (movieSearch) {
      // Search by title
      response = await axios.get('/search/movie', {
        params: {
          query: movieSearch,
          language: 'en-US'
        }
      });
    } else if (selectedGenre !== "") {
      // Filter by genre
      response = await axios.get('/discover/movie', {
        params: {
          with_genres: selectedGenre,
          language: 'en-US'
        }
      });
    }

    const movies = response.data.results;
    renderMovies(movies);

  } catch (error) {
    console.error('Error fetching movies:', error);
  }

  searchInput.value = '';
};

// Function to render all the movies of the search
// 1. we pass the searched data array as an argument.
// 2. we iterate the array and we call to createMovieCard() function.
const renderMovies = (movies) => {
  movies.forEach(movie => {    
    createMovieCard(movie)    
  });
}

const createMovieCard = (movie) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : 'placeholder.jpg'; // Fallback if no poster

  // DOM content creation (HTML)
  const movieCard = document.createElement('div');
  
  const moviePoster = document.createElement('img');
  moviePoster.setAttribute('src', posterUrl);
  moviePoster.setAttribute('alt', `${movie.title} poster`);

  const movieTitle = document.createElement('h1');
  movieTitle.textContent = `${movie.title}`;

  movieCard.append(moviePoster, movieTitle);

  sectionMovies.appendChild(movieCard);
}

const loadGenres = async () => {
  try {
    // First get all genre IDs
    const response = await axios.get(`/genre/movie/list`, {
      params: {
        language: 'en-US'
      }
    })

    const genres = response.data.genres;
    console.log('Genres loaded:', genres);

    genres.forEach(genre => {
      const option = document.createElement('option');
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    })

    
  } catch (error) {
    console.error('Error loading genres',error)
  }
}

loadGenres()


formData.addEventListener('change', searchAndShowTheMovie)
