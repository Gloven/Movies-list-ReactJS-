import React from 'react';
import './Movie.less';

const Movie = React.createClass({
    render() {
        return (
            <div className='Movie' >
            
                <span className='Movie__del-icon' onClick={this.props.onDelete}> × </span>
                {
                    this.props.title
                    ?
                       <b> <h4 className='Movie__title'>{this.props.title}</h4></b>
                    :
                        <h4 className='Movie__title'>no data</h4>
                }
                <div className='Movie__text'><b>Year:</b> {this.props.releaseYear}</div>
                <div className='Movie__text'><b>Format:</b> {this.props.format}</div>
                <div className='Movie__text'><b>Stars:</b> {this.props.stars}</div>
                <div className='Movie__text'><b>Id:</b> {this.props.id}</div>
            </div>
        );
    }
});

export default Movie;
