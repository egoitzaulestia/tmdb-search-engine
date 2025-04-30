// config.example.js //
//////////////////////

const CONFIG = {
    TMDB_API_KEY: 'paste_your_api_key_here',
    TMDB_AUTHORIZATION_TOKEN: 'paste_your_authorization_token_here'
}

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${CONFIG.TMDB_AUTHORIZATION_TOKEN}`;
