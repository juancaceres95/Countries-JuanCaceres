const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const fetch= require('node-fetch');
//Me traigo las routes de actvivity y country
const country = require('./countries');
const activity =  require('./activity');
const {Country} = require('../db');
const {Activity} = require('../db');

fetch('https://restcountries.eu/rest/v2/all')
 .then(response => response.json())
 .then(contenido =>contenido.map(e =>Country.create({
    id: e.alpha3Code,
    name: e.name,
    flagImg: e.flag,
    continent: e.region,
    capital: e.capital,
    subregion: e.subregion,
    population: e.population,
   })))
   .catch(err=> console.log(err));

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', country);
router.use('/activity', activity);


module.exports = router;

//---------Pruebas Routes-----//:
// __GET /countries/{idPais}__:
// http://localhost:3001/countries/COL

// __GET /countries?name="..."
// localhost:3001/countries?name=argentina

//__GET /countries__
// http://localhost:3001/countries/all

//__POST /activity__
//-------Postman------//:
// {
    // "name": "Mendiolaza",
    // "difficulty": "Medium",
    // "duration": "una hora",
    // "season": "winter"
// }