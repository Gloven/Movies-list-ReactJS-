import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const MovieActions = {
    loadMovies() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_MOVIES_REQUEST
        });

        api.listMovies()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_MOVIES_SUCCESS,
                movies: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_MOVIES_FAIL,
                error: err
            })
        );
    },

    createMovie(movie) {
        api.createMovie(movie)
        .then(() =>
            this.loadMovies()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteMovie(movieId) {
        api.deleteMovie(movieId)
        .then(() =>
            this.loadMovies()
        )
        .catch(err =>
            console.error(err)
        );
    },

    uploadMovie(list){
            api.uploadMovie(list)
            .then(() =>
                this.loadMovies()
            )
            .catch(err =>
                console.error(err)
            );
    },

    sortMovie(){
        api.sortMovie()
            .then(({ data }) =>
                AppDispatcher.dispatch({
                    type: Constants.LOAD_MOVIES_SUCCESS,
                    movies: data
                })
        )
        .catch(err => console.error(err));
    },

    
};

export default MovieActions;
