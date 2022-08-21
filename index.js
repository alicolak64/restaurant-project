const PORT = 8000;
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const fetch = require('node-fetch');
require('dotenv').config();

morgan('tiny');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// get all restaurant data 

app.get('/restaurants' , (req,res) => {
    const url = "https://df3e8da8-cf7f-4d4b-863f-affb56755c5d-europe-west1.apps.astra.datastax.com/api/rest/v2/namespaces/restaurants/collections/restaurants_info?page-size=20"

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-Cassandra-Token': 'AstraCS:aZydPBtpzixvBZFXCAcjDIxE:87be11e3bf030e08f1fdc876d90a96568ab00bfc1012cdfe83c9b2e0f2117fd3'

        }
    }
    fetch(url , options)
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))
} 
)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}
)


