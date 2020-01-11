const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const queries = require('./queries');

process.env.PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/Sexo',queries.getSexos);
app.get('/Tamano',queries.getTamano);
app.get('/Cachupines',queries.getCachupines);
app.get('/Cachupines/:id',queries.getCachupinById);
app.get('/Caracter',queries.getCaracteres);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API',status: 'FUNCIONANDO'});
});


app.listen(process.env.PORT, () => {
    console.log(`Cachupines app is listening on port ${process.env.PORT}!`);
});
