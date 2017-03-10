import React from 'react';
import Movie from './Movie.jsx';

import Masonry from 'react-masonry-component';
import './MoviesGrid.less'

export default class MoviesGrid extends React.Component{
    constructor(){
        super();
        this.state = {
            search:''
        };
    }

    updateSearch (event){
        this.setState({search: event.target.value.substr(0,20)});
    }


    render(){


        let filteredMovies = this.props.movies.filter(
            (movie)=>{
                 if ((movie.stars.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1)||(movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==-1)){
                    return true;
                 } else {
                    return false;
                 };
            }
            );

        const masonryOptions = {
            itemSelector: '.Movie',
            columnWidth: 400,
            gutter: 10,
            isFitWidth: true
        };
        return (
            <Masonry
                className='MoviesGrid'
                options={masonryOptions}
            >
            <div>
                  {filteredMovies.map((movie) =>{
                    return <Movie
                            key={movie.id}
                            title={movie.title}
                            format = {movie.format}
                            releaseYear = {movie.releaseYear}
                            stars={movie.stars}
                            id={movie.id}
                            onDelete={this.props.onMovieDelete.bind(null, movie)}
                        >
                        </Movie>
                    })}
                  <input type='text'
                  className = 'Search' 
                  placeholder="Search..."
                  value = {this.state.search}
                  onChange={this.updateSearch.bind(this)} />
                  </div>
            </Masonry>
        )
    }
}

