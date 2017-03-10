import React from 'react';
import MoviesStore from '../stores/MoviesStore';
import MoviesActions from '../actions/MoviesActions';
import MoviesEditor from './MoviesEditor.jsx';

import './App.less';

import MoviesGrid from './MoviesGrid.jsx';

function getStateFromFlux() {
    return {
        isLoading: MoviesStore.isLoading(),
        movies: MoviesStore.getMovies()
    };
}

const App = React.createClass({
	getInitialState(){
		return getStateFromFlux();
	},
	componentWillMount() {
        MoviesActions.loadMovies();
    },

    componentDidMount() {
        MoviesStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        MoviesStore.removeChangeListener(this._onChange);
    },

    handleMovieDelete(movie) {
        MoviesActions.deleteMovie(movie.id);
        console.log('deleted');
    },

	handleMovieAdd(data){
		MoviesActions.createMovie(data);
	},

	handleMovieSort(){
		MoviesActions.sortMovie();
	},
	

	render(){
		return (
			<div>
				<h2 className='Title-text'>Fovorite movies App</h2>
				<MoviesEditor
					onMovieAdd = {this.handleMovieAdd} 
					onMovieSort = {this.handleMovieSort}
				/>
				<MoviesGrid movies={this.state.movies} onMovieDelete={this.handleMovieDelete} />
			</div>
		);
		},
		_onChange() {
        this.setState(getStateFromFlux());
    }
	});

export default App;
