const { v4 } = require('uuid');
const express = require('express');
const {cafeteria} = require('./cafeteria');
const app = express();

app.use(express.json());

app.get('/cafeteria/search', (request, response) => {
    const {name} = request.query;
    const results = name
    ? cafeteria.filter(c => c.name.includes(name))
    :cafeteria;
    return response.status(200).json(results);
});

app.get('/cafeteria', (request, response) => {
    return response.status(200).json(cafeteria);
});

app.post('/cafeteria', (request, response) => {
    const {type, name} = request.body;
    const cafeter = { 
        id:v4(), 
        type: type, 
        name: name 
    }
    cafeteria.push(cafeter);
    return response.status(201).json(cafeter);
});

app.put('/cafeteria/:id', (request, response) => {
    const {id} = request.params;
    const {type, name} = request.body;
    const index = cafeteria.findIndex(c => c.id === id);
    if(index < 0) return response.status(404).json({error: 'Não encontrado'});
    const cafeter = { id, type, name};
    cafeteria[index] = cafeter;
        return response.status(200).json(cafeter);
});

app.delete('/cafeteria/:id', (request, response) => {
    const {id} = request.params;
    const index = cafeteria.findIndex(c => c.id === id);
    if(index < 0) 
    return response.status(404).json({error: 'Não encontrado'});
    cafeteria.splice(index, 1);
    return response.status(200).json({Message: 'Item removido'});
});


app.listen(3333);