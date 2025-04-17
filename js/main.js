// main.js //
////////////


const formData = document.getElementById('formData');
const searchInput = document.getElementById('searchInput')


const showConsole = (e) => {
  e.preventDefault()
  console.log(searchInput.value)
}


axios.get('/movie/popular', { params: { language: 'en-US' } })
  .then(response => { 
    response.data.results.forEach(movie => {
      if (movie.poster_path) {
        const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`

        // To display in HTML
        const img = document.createElement('img');
        img.src = posterUrl;
        img.alt = `${movie.title} poster`;
        document.body.appendChild(img);
      }
      
    }) 
  })
  .catch(error => console.error('TMDB Error:', error.response?.data));


// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${CONFIG.TMDB_AUTHORIZATION_TOKEN}`
//     }
// };

// fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//   .then(res => res.json())
//   .then(data => {
//     data.results.forEach(movie => {
//       if (movie.poster_path) {
//         const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
//         // const posterUrl = `https://api.themoviedb.org/3/movie/${movie.id}/images`;
//         console.log(`${movie.title} poster:`, posterUrl);
        
//         // To display in HTML:
//         const img = document.createElement('img');
//         img.src = posterUrl;
//         img.alt = `${movie.title} poster`;
//         document.body.appendChild(img);
//       }
//     });
//   })
//   .catch(err => console.error(err));


formData.addEventListener('submit', showConsole)
