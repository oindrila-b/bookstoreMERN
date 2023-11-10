import express, { json } from "express";
import { PORT, mongoDB_URL } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());
// default app route
app.get('/', (req, res) =>{

    console.log(req);
    return res.status(234).send('Doing Great!!')
})

app.post('/add-book', async (req, res) => {
    try{
    if(
        !req.body.title || 
        !req.body.author || 
        !req.body.isbn || 
        !req.body.yearOfPublication || 
        !req.body.publishers || 
        !req.body.images
    ){
        return res.status(400).send({message : 'Send all required fields : title, isbn, author, year of publication, publishers, images'});
    }
    const newBook = {
        title : req.body.title,
        author : req.body.author,
        yearOfPublication : req.body.yearOfPublication,
        publishers : req.body.publishers,
        images : req.body.images,
        isbn : req.body.isbn,
    };
    const book = Book.create(newBook);
    return res.status(201).send(book);
    }catch(err) {
        console.log(err);
        res.status(500).send({message : err.message})
    }
});

// get all books
app.get('/books', async (req, res) => {
try {
    const books = await Book.find({});
    return res.status(200).json({
        count : books.length,
        data: books
    });
}catch(err) {
    console.log(err);
        res.status(500).send({message : err.message})
}
});

// connect to mongo db atlas cluster
mongoose
.connect(mongoDB_URL)
.then(() => {
    console.log("App connected to Mongo DB successfully");
    app.listen(PORT, () =>{
        console.log(`App is listening on port : ${PORT}`);
    });
})
.catch((err) => {
    console.log(err) 
});
