import axios from 'axios';

//URL FILMES EM CARTAZ

//https://api.themoviedb.org/3/

//movie/now_playing?api_key=e91febd2d783d9822edd7fdd2fc5f36e&language=pt-BR&page=1

export const key = 'e91febd2d783d9822edd7fdd2fc5f36e'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;