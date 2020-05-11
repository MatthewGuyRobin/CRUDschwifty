const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb+srv://rick:morty@cluster0-t62qb.mongodb.net/test?retryWrites=true&w=majority',
    { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('rick-and-morty-quotes')
        let quotesLibrary = db.collection('quotes')

        app.set('view engine', 'ejs')

        // app.use(express.static('public'))
        app.use("/public", express.static('./public/'));  // This was causing major headaches.

        app.use(bodyParser.json())

        app.use(bodyParser.urlencoded({ extended: true }));

        app.put('/quotes', (req, res) => {
            quotesLibrary.findOneAndUpdate(
                { name: 'Rick' },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            ).then(result => {
                res.json('Success')
            })
                .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res) => {
            quotesLibrary.deleteOne(
                { name: req.body.name }
            ).then(result => {
                if (result.deletedCount === 0){
                    return res.json('No quote to delete')
                }
                res.json('Deleted Shleemypants')
            }).catch(error => console.error(error))
        })

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })

                })
        })

        app.post('/quotes', (req, res) => {
            quotesLibrary.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })

        app.listen(3000, function () {
            console.log('Port is running on 3000')
        })

    })