import mongoose, { Schema } from "mongoose";

const bookSchema =  mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    author : {
        type: String,
        required: true,
    },
    yearOfPublication : {
        type: String,
        required: true,
    },
    publishers : {
        type: String,
        required: true,
    },
    images : {
        type:Array,
        "default" : []
    },
    isbn : {
        type: String,
        required: true,
    },

},
{
    timestamps : true,
});


export const Book = mongoose.model('Book', bookSchema);