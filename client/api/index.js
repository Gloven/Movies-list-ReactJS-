import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';


export default {
    listMovies() {
        return axios.get(`${apiPrefix}/movies`);
    },

    createMovie(data) {
        return axios.post(`${apiPrefix}/movies`, data);
    },

    deleteMovie(movieId) {
        return axios.delete(`${apiPrefix}/movies/${movieId}`);
    },

    sortMovie() {
        return axios.post(`${apiPrefix}/mov`);
    },

    uploadMovie(File) {
        return axios.post(`${apiPrefix}/upload`,File);
    }


}
