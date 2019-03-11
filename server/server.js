const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const {Book} = require('./models/books');
const {Store} = require('./models/stores');


const app = express();

mongoose.Promise = global.Promise;

const mongoDbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/books_db"; 

mongoose.connect(mongoDbUrl);

app.use(express.static(__dirname+'/../public'));
app.use(bodyParser.json());


const port = process.env.PORT || 3000;



app.post('/api/add/store', (req, res)=>{ 
    console.log("Getting a post reques");  
    console.log(req.body);  

    const store = new Store({
        name : req.body.name,
        address : req.body.address,
        phone : req.body.phone
    });

    store.save( (err,doc)=>{
        if(err){
            console.log(`Problem saving the item : ${err}`);
            res.status(400).send(err);
        }
        console.log(doc);
        res.status(200).send()
    })
})


app.post('/api/add/books', (req, res)=>{ 
    console.log("Getting a post reques");  
    console.log(req.body);  

    const book = new Book({
        name : req.body.name,
        author : req.body.author,
        pages : req.body.pages,
        price : req.body.price,
        stores : req.body.stores
    });

    book.save( (err,doc)=>{
        if(err){
            console.log(`Problem saving the item : ${err}`);
            res.status(400).send(err);
        }
        console.log(doc);
        res.status(200).send()
    })
})






app.get('/api/stores' ,(req, res)=>{
    

        Store.find((err, data)=>{
            if(err){
                console.log(`Problem saving the item : ${err}`);
                res.status(400).send(err);
            }
            console.log(data);
            res.status(200).send(data);
        })
    
})


app.get('/api/books' ,(req, res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) :10;
    let order = req.query.ord ? req.query.ord : 'asc';
    Book.find().sort({_id :order}).limit(limit).exec((err, data)=>{
        if(err){
            console.log(`Problem saving the item : ${err}`);
            res.status(400).send(err);
        }

        console.log(data);
        res.status(200).send(data);
    })
   /* Book.find((err, data)=>{
        if(err){
            console.log(`Problem saving the item : ${err}`);
            res.status(400).send(err);
        }

        console.log(data);
        res.status(200).send(data);
    })*/

})

app.get('/api/books/:id',(req, res)=>{
    Book.findById(req.params.id, (err, data) =>{
        if(err){
            console.log(`Problem saving the item : ${err}`);
            res.status(400).send(err);
        }

        console.log(data);
        res.status(200).send(data);
    })
})


app.patch('/api/add/books/:id', (req, res)=>{
    Book.findByIdAndUpdate(req.params.id,{$set:req.body}, {new :true}, (err, data)=>{
        if(err){
            console.log(`Problem saving the item : ${err}`);
            res.status(400).send(err);
        }

        console.log(data);
        res.status(200).send();
    })

})

app.delete('/api/delete/books/:id', (req, res)=>{
    Book.findByIdAndRemove(req.params.id, (err, data)=>{
        if(err){
            console.log(`Problem Removing the item : ${err}`);
            res.status(400).send(err);
        }

        console.log(data);
        res.status(200).send();
    })
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})