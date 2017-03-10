import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _movies = [];
let _loadingError = null;
let _isLoading = true;

function formatMovie(movie) {
    return {
        id: movie._id,
        title:movie.title,
        releaseYear:movie.releaseYear,
        format:movie.format,
        stars:movie.stars
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() {
        return _isLoading;
    },

    getMovies() {
        return _movies;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_MOVIES_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_MOVIES_SUCCESS: {
            _isLoading = false;
            _movies = action.movies.map( formatMovie );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_MOVIES_FAIL: {
            _loadingError = action.error;
            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler');
        }
    }
});

export default TasksStore;
