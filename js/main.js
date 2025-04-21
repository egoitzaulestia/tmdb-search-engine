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

const searchAndShowTheMovie = (e) => {
  e.preventDefault()

  containerMovies.innerHTML = '';
  const movieSearch = searchInput.value

  axios.get(`/search/movie`, { 
    params: { 
      query: movieSearch,
      language: 'en-US' 
      }
    })
    .then(response => { 
      const movies = response.data.results

      renderMovies(movies);
    })

  searchInput.value = '';
}

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


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${CONFIG.TMDB_AUTHORIZATION_TOKEN}`
  }
};

fetch(`https://api.themoviedb.org/3/genre/movie/list`, options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));


  html = "";
  obj = {
      "1" : "Name",
      "2": "Age",
      "3" : "Gender"
  }
  for(var key in obj) {
      html += "<option value=" + key  + ">" +obj[key] + "</option>"
  }
  document.getElementById("movieGenre").innerHTML = html;

//TODO: NEXT STEPS
// MODULARIZACIÓN: searchMovie() ——> showMovie()
// en vez de hacer todo en searchAndShowMovie(), 
// atomizar la función en searchMovie() y dentro showMovie(), o al revés.



// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${CONFIG.TMDB_AUTHORIZATION_TOKEN}`
//   }
// };

// fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
// .then(res => res.json())
// .then(data => {
//   data.results.forEach(movie => {
//     if (movie.poster_path) {
//       const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
//       // const posterUrl = `https://api.themoviedb.org/3/movie/${movie.id}/images`;
//       console.log(`${movie.title} poster:`, posterUrl);
      
//       // To display in HTML:
//       const img = document.createElement('img');
//       img.src = posterUrl;
//       img.alt = `${movie.title} poster`;
//       document.body.appendChild(img);
//     }
//   });
// })
// .catch(err => console.error(err));



// axios.get('/movie/popular', { params: { language: 'en-US' } })
//   .then(response => { 
//     response.data.results.forEach(movie => {
//       if (movie.poster_path) {
//         const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`

//         // To display in HTML
//         const img = document.createElement('img');
//         img.src = posterUrl;
//         img.alt = `${movie.title} poster`;
//         document.body.appendChild(img);
//         console.log(movie)
//       }
      
//     }) 
//   })
//   .catch(error => console.error('TMDB Error:', error.response?.data));


// let movieIdNum = 1197306;
// console.log(typeof(movieIdNum))

// const movieOriginalTitle = "Fight Club"


// axios.get(`/search/movie`, { 
//   params: { 
//     query: movieOriginalTitle,
//     language: 'en-US' 
//     }
//   })
//   .then(response => { 
//     // const exactMatches = response.data.results.filter(
//     //   movie => movie.original_title.toLowerCase() === "the car"
//     // )
//     // console.log(exactMatches)

//     const movies =response.data.results
//     console.log(movies)

//     movies.forEach(movie => {
//       const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
//     // const posterUrl = movie.poster_path;
//       // 3. Build the poster URL (check if poster_path exists)
//     // const posterUrl = movie.poster_path 
//     // ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
//     // : ''; // Fallback if no poster


//     // DOM content creation (HTML)
//     const moviePoster = document.createElement('img');
//     moviePoster.setAttribute('src', posterUrl);
//     moviePoster.setAttribute('alt', `${movie.title} poster`);

//     const movieTitle = document.createElement('h1');
//     movieTitle.textContent = `${movie.title}`;

//     document.body.appendChild(moviePoster);
//     document.body.appendChild(movieTitle);
      
//     });

//   })


// axios.get(`https://api.themoviedb.org/3/search/movie`, {
//   // ...options,
//   params: {
//     query: movieOriginalTitle,
//     language: 'en-US'
//   }
// })
// .then(response => {
//   // 2. Get the first result (assuming it's the correct match)
//   const movie = response.data.results[0]; 
//   if (!movie) throw new Error("Movie not found");

//   // 3. Build the poster URL (check if poster_path exists)
//   const posterUrl = movie.poster_path 
//     ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
//     : 'placeholder.jpg'; // Fallback if no poster

//   // 4. Create DOM elements
//   const moviePoster = document.createElement('img');
//   moviePoster.src = posterUrl;
//   moviePoster.alt = `${movie.title} poster`;

//   const movieTitle = document.createElement('h1');
//   movieTitle.textContent = movie.title;

//   // 5. Append to body
//   document.body.append(moviePoster, movieTitle);
// })
// .catch(error => {
//   console.error("Error fetching movie:", error);
//   document.body.textContent = "Failed to load movie. Check console.";
// });







formData.addEventListener('submit', searchAndShowTheMovie)
