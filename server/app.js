import  express from "express";
import  bodyParser from "body-parser";
import cors from 'cors';
import * as db from './utils/DataBaseUtils.js';
import { serverPort } from '../etc/config.json';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import pars from './parser.js';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, 'sample_movies.txt')
    }
});
var upload = multer({
    storage: storage
    ,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.txt') {
            return callback(console.log('Error! Upload only *.txt files!'))
        }
        callback(null, true)
    }
});

db.setUpConnection();

const app = express();


// Using bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());


// Allow requests from any origin
app.use(cors({ origin: '*' }));


app.get('/movies',(req,res) => {
	db.listFilms().then(data => res.send(data))

});

app.post('/movies',(req,res) => {
	db.createFilm(req.body).then(data => res.send(data))
});

app.post('/mov',(req,res) => {
	db.sortFilms(req.body).then(data => res.send(data))
});

app.delete('/movies/:id', (req, res) => {
    db.deleteMovie(req.params.id).then(data => res.send(data));
});

app.post('/upload',upload.single('file'),function (req, res){
    console.dir(req.file);
    var str = '';
    fs.readFile('uploads/sample_movies.txt', 'utf8', function(err, contents) {
        if (err) {
            return console.error(err)
        }
        str = contents;
        console.log(str);
        var arr = pars.pars(str);
         var item = {};
         for (var i = 0; i<arr.length; i++) {
         item = {
         title: arr[i].Title,
         releaseYear: arr[i].Year,
         format: arr[i].Format,
         stars: arr[i].Stars
         };
         db.createFilm(item);
         }
    });
    res.redirect('http://localhost:8090/');
});

const server = app.listen(serverPort, () =>{
	console.log(`Server running on port ${serverPort}`);
});

