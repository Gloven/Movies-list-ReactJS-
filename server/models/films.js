import mongoose from "mongoose";

const  Schema = mongoose.Schema;

const filmSchema = new Schema( {
    title: String,
    releaseYear: Number,
    format: String,
    stars: String
}); // создание конструктора
//filmSchema.index({ title: "text", stars: "text" });
const Film = mongoose.model('Film', filmSchema);
