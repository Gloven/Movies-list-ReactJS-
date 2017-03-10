import mongoose from "mongoose";

import '../models/films';

const Film = mongoose.model('Film');

export function setUpConnection(){
	mongoose.connect("localhost:27017/films");
	console.log(' data base connected!' );
};


export function createFilm(data){
	const film = new Film ({
    title: data.title,
    releaseYear: data.releaseYear,
    format: data.format,
    stars: data.stars
  });
  console.log(' New film added!' );
  	return film.save();
	
}


export function listFilms(){
		return Film.find();
  }
  
 export function sortFilms(){
    console.log('===============Sorted=============')
    return   Film.find().sort({title: 1});
  }
   
export function deleteMovie(id) {
   console.log('===============Film removed=============')
    return Film.findById(id).remove();
    
}