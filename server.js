const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const db = require('knex')(config);

let cards = [{word: 'pomegranate', definition: 'shrub or small tree having large red many-seeded fruit'},
    {word: 'hefty', definition: 'of considerable weight and size'},
    {word: 'lubberly', definition: 'clumsy and unskilled'},
    {word: 'canoodle', definition: 'fondle or pet affectionately'},
    {word: 'jocular', definition: 'characterized by jokes and good humor'},
    {word: 'obbligato', definition: 'a part of the score that must be performed without change or omission'},];

app.get('/api/cards', (req, res) => {
    res.send(cards);
});

app.post('/api/cards', (req, res) => {
    cards.push(req.body.card);
    res.send(req.body.cards);
});

app.listen(3001, () => console.log('Server listening on port 3001!'));

app.delete('/api/cards/:id', (req, res) => {
    let id = parseInt(req.params.id);
    cards.splice(id, 1);
    res.send(req.body.cards);
});

app.put('/api/cards/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let card = req.body.card;

    cards[id] = card;
    res.sendStatus(200);
    // res.send(cards);
});