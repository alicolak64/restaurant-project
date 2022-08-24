const PORT = 8000;
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const fetch = require('node-fetch');
require('dotenv').config();


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());



app.get('/restaurants', async (req, res) => { // get all restaurants data 

    const url = process.env.RESTAURANTLIST;

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-Cassandra-Token': process.env.X_Cassandra_Token

        }
    }

    await fetch(url, options)
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))
}
)

app.delete('/deleteRestaurant/:id', async (req, res) => { // delete restaurant data with document id

    const url = process.env.DELETERESTAURANT + req.params.id;

    const options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'X-Cassandra-Token': process.env.X_Cassandra_Token
        }
    }

    await fetch(url, options)
        .then(response => {
            if (response.status === 204) {
                res.status(204).send()
            } else {
                res.status(500).send()
            }
        }).catch(err => console.log(err))
}
)

app.post('/addRestaurant', async (req, res) => { // add restaurant to collection

    let newRestaurant = req.body;

    const url = process.env.ADDRESTAURANT

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'X-Cassandra-Token': process.env.X_Cassandra_Token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRestaurant)
    }

    

    await fetch(url, options)
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))

        
}
)

app.get('/restaurant/:id', async (req, res) => { // get a restaurant data with document id 

    const url = process.env.GETRESTAURANT + req.params.id;

    console.log(url)

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-Cassandra-Token': process.env.X_Cassandra_Token
        }
    }

    await fetch(url, options)
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))

    
}
)

app.put('/editRestaurant/:id', async (req, res) => { // edit restaurant data with document id   

    const url = process.env.PUTRESTAURANT + req.params.id;

    const updatedRestaurant = req.body;
    
    const options = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'X-Cassandra-Token': process.env.X_Cassandra_Token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRestaurant)
    }

    await fetch(url, options)
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log(err))
}
)


function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found - ');
    next(error);
}

function errorHandler(err, req, res) {
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
}
)


